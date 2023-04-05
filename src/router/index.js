import { createRouter, createWebHashHistory } from 'vue-router'

import Chat from '../view/Chat.vue'
import Home from '../view/Home.vue'
import Privacy from '../view/Privacy.vue'
import Edit from '../view/Edit.vue'
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
        {
            path: '/chat',
            name: 'chat',
            component: Chat,
            meta: {
                index: 1
            }
        },
        {
            path: '/edit',
            name: 'edit',
            component: Edit,
            meta: {
                index: 1
            }
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: Privacy,
            meta: {
                index: 1
            }
        }
    ],

})

export default router