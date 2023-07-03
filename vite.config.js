

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import htmlPurge from 'vite-plugin-purgecss'
import visualizer from 'rollup-plugin-visualizer';
import ssr from 'vite-plugin-ssr/plugin'
import vitePrerender from 'vite-plugin-prerender'

import viteCompression from "vite-plugin-compression";
import legacy from '@vitejs/plugin-legacy'
import { splitVendorChunkPlugin } from 'vite'


export default defineConfig({
    plugins: [vue(), viteCompression(), vitePrerender({
        include: ["/", "/chat",'/Purchase'],
        staticDir: "dist",
        minify: true,
        fallback: "index.html"
    }), AutoImport({
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
    splitVendorChunkPlugin(),
    ],
    root: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            //   plugins: [visualizer()]
        },
        emptyOutDir: true
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