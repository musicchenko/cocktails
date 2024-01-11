import { createRouter, createWebHistory } from 'vue-router'
import { cocktailsEnum } from '@/types/cocktails'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: () => {
                return {
                    path: `/${Object.values(cocktailsEnum.enum)[0]}`
                }
            }
        },
        {
            path: '/:cocktail',
            name: 'cocktail',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/NotFound.vue')
        }
    ]
})

export default router
