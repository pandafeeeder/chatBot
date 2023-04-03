import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';
import './index.scss'


const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }

app.use(Markdown)
app.use(router)
app.use(store)
app.mount('#app')