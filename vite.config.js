

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


import viteCompression from "vite-plugin-compression";
import legacy from '@vitejs/plugin-legacy'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";


export default defineConfig({
    plugins: [vue(), viteCompression(), wasm(), topLevelAwait(),AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    legacy({
        targets: 'Chrome >= 70, Safari >= 13'
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }), chunkSplitPlugin()],
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