/**
 * Created by LiLiuzhu on 2017/12/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
  count:0
};
const mutations={
  jia(state,n){
    state.count+=n.a||1;
  },
  jian(state,n){
    state.count-=n.a||1;
  }
};
const getters={
  count(state){
    return state.count+100;
  }
};
const actions={
  jiaPlus(context,n){
    setTimeout(()=>{
      context.commit('jia',n);
    },3000);
  },
  jianPlus({commit},n){
    commit('jian',n);
  }
};
const store=new Vuex.Store({
  state,mutations,getters,actions
});
export default store;

