import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../view/Home.vue'
import Feedback from '../view/Feedback.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                index: 1
            }
        },
    ],

})

export default router