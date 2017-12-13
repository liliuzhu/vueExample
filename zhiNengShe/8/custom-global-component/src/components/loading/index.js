/**
 * Created by LiLiuzhu on 2017/9/27.
 */
import LoadingComponent from "./Loading.vue"

const Loading={
    install:function(Vue){
        Vue.component("Loading",LoadingComponent)
    }
};
export default Loading;