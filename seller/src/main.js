// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router.config';
import axios from 'axios';
import App from './App';
import filters from './filters/index';
import 'common/style/index.less';

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
/*
* 自定义全局属性---是否有服务器
* */
Vue.prototype.custom = {
    hasServe: false
};
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
var vm = new Vue({
    router,
    el: '#app',
    /* template: '<App/>',
     components: { App },
     */
    render: h => h(App)
});
// console.log(vm);
