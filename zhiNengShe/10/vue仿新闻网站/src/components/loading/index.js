import LoadingComponent from './Loading.vue';
//const LoadingComponent1 = require('./Loading.vue');
const loading = {
  install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
};
export default loading
//module.exports = loading;

