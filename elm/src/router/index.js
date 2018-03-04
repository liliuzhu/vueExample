import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import msite from '@/components/msite/msite';
import order from '@/components/order/order';
import discover from '@/components/discover/discover';
import koubei from '@/components/discover/koubei';
import profile from '@/components/profile/profile';
import recommend from '@/components/recommend/recommend';
import exchange from '@/components/exchange/exchange';
import shop from '@/components/shop/shop';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: __dirname,
    routes:
        [
            {path: '/msite', name: 'msite', component: msite},
            {path: '/order', name: 'order', component: order},
            {path: '/discover', name: 'discover', component: discover},
            {path: '/discover/koubei', name: 'koubei', component: koubei},
            {path: '/profile', name: 'profile', component: profile},
            {path: '/recommend', name: 'recommend', component: recommend},
            {path: '/exchange', name: 'exchange', component: exchange},
            {path: '/shop', name: 'shop', component: shop},
            {path: '*', redirect: '/msite'}
        ]
})
;
