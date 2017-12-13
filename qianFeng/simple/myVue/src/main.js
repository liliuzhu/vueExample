import Vue from 'vue'
import App from './App.vue'
import Head from "./Head.vue"
import List from "./List.vue"
Vue.component(Head.name,Head);
Vue.component(List.name,List);
new Vue({
  el: '#app',
  render: h => h(App)
})
