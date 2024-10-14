# vueattr-pxtoremvw

English | [简体中文](./README.zh-CN.md)

> Converting px to rem or vw in vue's Attribute

## Install

```bash
npm install vueattr-pxtoremvw
```

## Usage

```typescript
// vite.config.ts
import vueattrPxtoremvw from 'vueattr-pxtoremvw/vite'

export default defineConfig({
  plugins: [
    vueattrPxtoremvw({ // Must be used before vue()
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
  /** Conversion mode */
  convertMode?: 'vw' | 'rem'
  /** Unit to convert */
  unitToConvert?: string
  /** Viewport width of the design draft */
  viewportWidth?: number
  /** Root font size */
  rootFontSize?: number
  /** Precision of the unit after conversion */
  unitPrecision?: number
  /** Set the minimum conversion value, only values greater than it will be converted */
  minPixelValue?: number
  /** Ignore files or specific files in certain folders */
  exclude?: RegExp[]
  /** Only files that match will be converted */
  include?: RegExp[]
}
```

## Default configuration

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
