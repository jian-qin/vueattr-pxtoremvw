# vueattr-pxtoremvw

[English](./README.md) | 简体中文

> 将vue的属性中的px转换为rem或vw

## 安装

```bash
npm install vueattr-pxtoremvw
```

## 使用

```typescript
// vite.config.ts
import vueattrPxtoremvw from 'vueattr-pxtoremvw/vite'

export default defineConfig({
  plugins: [
    vueattrPxtoremvw({ // 必须在vue()之前使用
      convertMode: 'rem',
      rootFontSize: 37.5,
    }),
    vue(),
    // ...
  ]
})
```

## 配置

```typescript
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
```

## 默认配置

```typescript
defineConfig({
  convertMode: 'vw',
  unitToConvert: 'px',
  viewportWidth: 375,
  rootFontSize: 37.5,
  unitPrecision: 5,
  minPixelValue: 1,
  exclude: [],
})
```
