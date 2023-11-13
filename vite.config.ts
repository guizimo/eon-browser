import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import electron from 'vite-electron-plugin'
import { rmSync } from 'fs'

/** 清空 dist */
rmSync('dist', { recursive: true, force: true })

/** 配置项文档：https://cn.vitejs.dev/config */
export default (configEnv: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue']
          }
        }
      }
    },
    /** 混淆器 */
    esbuild: {
      /** 打包时移除 console.log */
      pure: ['console.log'],
      /** 打包时移除 debugger */
      drop: ['debugger'],
      /** 打包时移除所有注释 */
      legalComments: 'none'
    },
    /** Vite 插件 */
    plugins: [
      electron({
        outDir: 'dist-electron',
        include: ['electron'],
        transformOptions: { sourcemap: false },
        plugins: [
          {
            name: 'remove-comments',
            transform: ({ code }) => {
              let content = code
              // 匹配 块级注释、行级注释、Region注释
              // \s 是匹配所有空白符, 包括换行; \S 非空白符, 不包括换行
              const pattern1 = /\/\*[\s\S]*?\*\/|(\s)+\/\/[\s\S]*?[\n]+/g
              content = content.replaceAll(pattern1, '\n')
              // 匹配 所有空行
              const pattern2 = /^\s*[\r\n]/gm
              content = content.replaceAll(pattern2, '')
              return content
            }
          }
        ]
      }),
      vue()
    ]
  }
}
