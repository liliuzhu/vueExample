// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import '@/common/style/index.less';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);
Vue.config.productionTip = false;
/*
* 自定义全局属性---是否有服务器
* */
Vue.prototype.$ajax = axios;
Vue.prototype.custom = {
    hasServer: true,
    availHeight: window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight
};

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
let vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
