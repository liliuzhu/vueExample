/**
 *路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.use(VueRouter);
/**
 * 设置history不能刷新
 * */
const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes: [
        {path: '/goods', name: 'goods', component: goods},
        {path: '/seller', name: 'seller', component: seller},
        {path: '/ratings', name: 'ratings', component: ratings},

        {path: '*', redirect: '/goods'}
    ]

});

export default router;
