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
            path: '/chats',
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
            path: '/help',
            name: 'Help',
            component: () => import('../view/Help.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/purchase',
            name: 'Purchase',
            component: () => import('../view/Purchase.vue'),
            meta: {
                index: 1
            }
        },
        { path: '/:pathMatch(.*)*', name: 'home', component: () => import('../view/Home.vue'), },

    ],

})

export default router