

// // vite.config.js
// export default {
//     server: {
//         https:true,
//         proxy: {
//             '^/chat': {
//                 target: 'https://chat.redpeanuts.workers.dev/chat',// target server address
//                 changeOrigin: true, // enable CORS
//                 // rewrite: path => path.replace(/^\/api/, ''), // remove /api from path
//                 secure: true
//             }
//         }
//     }
// }

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


import viteCompression from "vite-plugin-compression";


export default defineConfig({
    plugins: [vue(), viteCompression(), AutoImport({
        resolvers: [ElementPlusResolver()],
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