import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from "path"
// import DefineOptions from 'unplugin-vue-define-options/vite';  // 支持组件命名
import vueSetupExtend from 'vite-plugin-vue-setup-extend'; // 支持组件命名
import legacy from '@vitejs/plugin-legacy' // 为打包后的文件提供传统浏览器兼容性支持。
import { visualizer } from 'rollup-plugin-visualizer' // 打包分析

// import vitePluginQiniu from './vite-plugins/index'
import vitePluginQiniu from './vite-plugins/index.es'
// const vitePluginQiniu = require('./vite-plugins/index.es')

console.log(1212, vitePluginQiniu)

import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    // visualizer({ open: true }),
    VitePWA({
    workbox:{
      cacheId:"XIaoman",//缓存名称
      runtimeCaching:[
        {
          urlPattern:/.*\.js.*/, //缓存文件
          handler:"StaleWhileRevalidate", //重新验证时失效
          options:{
            cacheName:"XiaoMan-js", //缓存js，名称
            expiration:{
              maxEntries:30, //缓存文件数量 LRU算法
              maxAgeSeconds:30 * 24 * 60 * 60 //缓存有效期
            }
          }
        }
      ]
    },
  }),
    // legacy(),
    vue({
    template:{
      compilerOptions:{
        isCustomElement:(tag)=> tag.includes('custom-') // 用于指定一个检查方法来识别原生自定义元素。
      }
    }
  }), vueSetupExtend(), vitePluginQiniu({
      enable: true,
      accessKey: '7XpXEW2l-DUawPpfykszsTFNOr6rwW7peloKUDnT',
      secretKey: '1sMLgliCmIakJUoCVZc1gL6MNyK7w6r9IhBW1XwG',
      exclude: /index\.html$|manifest\.[0-9a-zA-Z]+\.js$/,
      bucket: 'busi-rrccdn', // //busi.rrcimg.com/rrccrm/online/
      path: 'vite-plugin-qiniu/online/',

    })],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, './src')
    }
  },
  build:{
    chunkSizeWarningLimit: 80, // 包大小警告下限
    cssCodeSplit: true, // css拆分
    sourcemap: false,
    minify: 'esbuild', // false 是否禁用最小化混淆，esbuild 打包速度最快，terser 打包体积最小
    assetsInlineLimit: 4000 // 转为base64的文件上限
  }
})
