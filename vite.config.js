

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import htmlPurge from 'vite-plugin-purgecss'

import viteCompression from "vite-plugin-compression";
import legacy from '@vitejs/plugin-legacy'
import { splitVendorChunkPlugin } from 'vite'


export default defineConfig({
    plugins: [vue(), viteCompression(), AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    legacy({
        targets: 'Chrome >= 70, Safari >= 13'
    }),

    Components({
        resolvers: [ElementPlusResolver()],
    }), chunkSplitPlugin(),
    htmlPurge({
        safelist: [/^el-/, /^is-/]
    }),
    splitVendorChunkPlugin()
    ],
    root: './',
    build: {
        manifest: true,
        // 自定义 manifest 文件的内容
        manifestOptions: {
            background_color: "#005a6f",
            icons: [
            {
                src: "/pandafeeder.png",
                sizes: "192x192",
                type: "image/png"
            }
            ]
        },
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
          }
        },
        emptyOutDir:true
      },
    server: {
        host: '0.0.0.0',
        proxy: {

            // below is OK
            '/api': {
                target: 'https://dev.pandafeeder.xyz',
                changeOrigin: true,
                rewrite: path => path.replace('/api', ''),
                secure: true
            }
        },
    }
})