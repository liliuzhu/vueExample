import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './route.config'
import store from './store/index.js'
import axios from 'axios'
import loading from './components/loading'
import filters from './filters/index'
//Vue.filter(名字，函数)；
Object.keys(filters).forEach((key)=>Vue.filter(key,filters[key]));
Vue.use(VueRouter);
Vue.use(loading);
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
//axios.defaults.baseURL = 'http://localhost:80/智能社/10/vue仿新闻网站/';
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  store.dispatch('showLoading');
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) { //配置请求回来的信息
  store.dispatch('hideLoading');
  return response;
}, function (error) {

  return Promise.reject(error);
});
Vue.prototype.$http=axios;//把axios挂载到Vue原型上
const router=new VueRouter({
  mode:"history",//切换路径模式，变成history模式
  base:"",
  scrollBehavior:()=>({y:0}),//滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  routes:routerConfig
});
require('./assets/css/base.css');//全局引用
new Vue({
  router:router,
  store:store,
  el: '#app',
  render: h => h(App)
});
