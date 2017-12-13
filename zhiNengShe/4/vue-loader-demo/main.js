/**
 * Created by Administrator on 2017/9/7.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routerConfig from './router.config'

Vue.use(VueRouter);

//配置路由
const router=new VueRouter();


router.map(routerConfig);
router.start(App,"#app");

router.redirect({
    '/':'/home/login'
});

