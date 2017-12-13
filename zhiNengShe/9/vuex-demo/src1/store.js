/**
 * Created by LiLiuzhu on 2017/9/28.
 */
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
var state={
  count:10
};
const mutations={
    increment(state){//处理状态(数据)变化
        state.count++;
    },
    decrement(state){
        state.count--;
    },
    clickOdd(state){

    }
};
const actions={
    increment:({commit})=>{//处理你要干什么，异步请求，判断，流程控制
        //alert(1);
        commit("increment");
        //console.log(commit);
    },
    decrement:({commit})=>{
        commit("decrement");
    },
    clickOdd:({commit,state})=>{
        //commit("clickOdd");
        if(state.count%2==0){
            commit("increment");
        }
    },
    clickAsync:({commit})=>{
        new Promise((resolve)=>{
            setTimeout(function(){
                commit("increment");
                resolve();
            },1000);
        })
    }
};
const getters={
    count(state){
        return state.count;
    },
    getOdd(state){
        return state.count%2==0?"偶数":"奇数";
    }
};
//需要到处store对象
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})