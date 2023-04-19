import { createRouter, createWebHistory, RouteRecordRaw,RouterLink } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
    {
        path:'/',
        component: ()=> import('@/views/Base.vue')
    },
    {
        path:'/main',
        component: ()=> import('@/views/Main.vue')
    },

    // { // 动态添加
    //     path:'/pinia',
    //     component: ()=> import('@/views/Pinia.vue')
    // },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach( (to, form,next)=>{
    console.log('beforeEach', to.path, form.path, window.location.pathname)
    const isLogin = window.sessionStorage.getItem('isLogin')
    if(!!isLogin){
        next()
    } else {
        setTimeout(()=>{
            console.log(112122)
            window.sessionStorage.setItem('isLogin', 'true')
            router.addRoute({
                path: '/pinia',
                component: () => import('@/views/Pinia.vue')
            })
            next(window.location.pathname === '/pinia'? window.location.pathname : to.path)
        }, 2000)
    }
})

export default router
