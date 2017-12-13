/**
 * Created by LiLiuzhu on 2017/11/2.
 */
import Vue from "vue"
import Alert from "./Alert.vue"
var merge = function(target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};
var myAlert=(function(){
    var defaults={
        title:"弹窗",
        body:"",
        confirm:null,
        cancel:null
    };
    var myComponent=Vue.extend(Alert);
    return function (opts){
        var options=merge({},defaults,opts);
        //for(var attr in opts){
        //    defaults[attr]=opts[attr];
        //}

        var vm=new myComponent({
            el:document.createElement("div"),
            data:{
                customTitle:options.title,
                customBody:options.body,
                confirm:options.confirm,
                cancel:options.cancel
            }
        });

//                var vm=new Vue({//结果同上
//                    el:document.createElement("div"),
//                    template:alertCom.template,
//                    data:{
//                        customTitle:defaults.title,
//                        customBody:defaults.body,
//                        confirm:defaults.confirm,
//                        cancel:defaults.cancel
//                    }
//                });
        document.body.appendChild(vm.$el);
    }
})();
export default myAlert;
