import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'vite/index.js',
      format: 'cjs',
    },
    {
      file: 'vite/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    typescript({
      declarationDir: 'vite',
    }),
    nodeResolve()
  ],
})