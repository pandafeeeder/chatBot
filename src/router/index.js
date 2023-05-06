import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../view/Home.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('../view/Chat.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/edit',
            name: 'edit',
            component: () => import('../view/Edit.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('../view/Privacy.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: () => import('../view/Feedback.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/ad',
            name: 'ad',
            component: () => import('../view/ad.vue'),
            meta: {
                index: 1
            }
        }
    ],

})

export default router