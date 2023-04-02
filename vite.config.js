

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

export default defineConfig({
    plugins: [vue()],
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