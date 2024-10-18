import { parse } from '@vue/compiler-sfc'
import Big from 'big.js'

interface Options {
  /** 转换模式 */
  convertMode?: 'vw' | 'rem'
  /** 需要转换的单位 */
  unitToConvert?: string
  /** 设计稿的视口宽度 */
  viewportWidth?: number
  /** 根元素字体大小 */
  rootFontSize?: number
  /** 单位转换后保留的精度 */
  unitPrecision?: number
  /** 设置最小的转换数值，只有大于它的值才会被转换 */
  minPixelValue?: number
  /** 忽略某些文件夹下的文件或特定文件 */
  exclude?: RegExp[]
  /** 只有匹配到的文件才会被转换 */
  include?: RegExp[]
}

export default function (
  {
    convertMode = 'vw',
    unitToConvert = 'px',
    viewportWidth = 375,
    rootFontSize = 37.5,
    unitPrecision = 5,
    minPixelValue = 1,
    exclude = [],
    include
  } = {} as Options
) {
  // 格式化数字
  const formatNumber = {
    vw(num: string) {
      return `${Big(num).div(viewportWidth).times(100).toFixed(unitPrecision)}${convertMode}`
    },
    rem(num: string) {
      return `${Big(num).div(rootFontSize).toFixed(unitPrecision)}${convertMode}`
    }
  }[convertMode]
  // 转换
  function conversion(value: string) {
    const boundary = '^|$|:|;|,|\'|"|`|\\(|\\)|\\{|\\}|\\s|\\n|\\r|\\/'
    const conversion_reg = new RegExp(
      `(?<=${boundary})(\\-?\\d?\\.?\\d+)${unitToConvert}(?=${boundary})`,
      'g'
    )
    return value.replace(conversion_reg, (e, p1: string) => Math.abs(+p1) <= minPixelValue ? e : formatNumber(p1))
  }
  return {
    nama: 'attr-px-to-rem-viewport',
    transform(code: string, id: string) {
      if (!id.endsWith('.vue')) return
      const url = getFileRootPath(id)
      if (include && !include.some((reg) => reg.test(url))) return
      if (exclude.some((reg) => reg.test(url))) return
      const templateNodes = parse(code).descriptor.template?.ast?.children
      if (!templateNodes) return
      const attrList = attrs(flatMap(templateNodes))
      let newCode = code
      attrList.forEach((attr: any) => {
        const newAttr = conversion(attr.source)
        newCode = newCode.replace(
          new RegExp(`(.{${attr.start.offset}})(.{${attr.source.length}})`, 's'),
          (_, p1, p2) => p1 + p2.replace(attr.source, newAttr)
        )
      })
      return newCode
    }
  }
}

// 获取文件根路径
function getFileRootPath(id: string) {
  return formatPath(id).replace(formatPath(process.cwd()), '')
}

// 格式化路径
function formatPath(id: string) {
  return id
    .replaceAll('\\', '/')
    .replace(/^\/|\/$/g, '')
    .replace(/^\d+:\//, (e) => e.toLocaleUpperCase())
}

// 拉平ast树
function flatMap(value: any[]): any[] {
  return value.flatMap((item) =>
    item.children?.length ? [item, ...flatMap(item.children)] : [item]
  )
}

// 获取节点attr属性，按下标倒排序
function attrs(value: any[]): string[] {
  return value
    .flatMap((item) => item.props?.filter((attr: any) => attr.loc) || [])
    .map((item) => item.loc)
    .sort((a, b) => b.start.offset - a.start.offset)
}
