import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import msite from '@/components/msite/msite';
import order from '@/components/order/order';
import discover from '@/components/discover/discover';
import profile from '@/components/profile/profile';
import recommend from '@/components/recommend/recommend';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: __dirname,
    routes:
        [
            {path: '/msite', name: 'msite', component: msite},
            {path: '/order', name: 'order', component: order},
            {path: '/discover', name: 'discover', component: discover},
            {path: '/profile', name: 'profile', component: profile},
            {path: '/recommend', name: 'recommend', component: recommend},
            {path: '*', redirect: '/msite'}
        ]
})
;
