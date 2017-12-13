/**
 * Created by LiLiuzhu on 2017/12/1.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import transtion from './components/transition.vue'
Vue.use(VueRouter);

const Home={
    template:`
        <div>
            <h2>Home</h2>
            <p>this is Home-{{$route.query}}</p>
        </div>
    `
};
const Parent={
    template:`
        <div>
            <h2>Parent</h2>
            <p>this is Parent</p>
        </div>
    `,
    //beforeRouteEnter (to, from, next) {
    //    // 在渲染该组件的对应路由被 confirm 前调用
    //    // 不！能！获取组件实例 `this`
    //    // 因为当守卫执行前，组件实例还没被创建
    //    console.log("beforeRouteEnter");
    //    console.log(to);
    //    console.log(from);
    //    console.log("beforeRouteEnter");
    //    next();
    //},
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        console.log("beforeRouteUpdate");
        console.log(to);
        console.log(from);
        console.log("beforeRouteUpdate");
        next();
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        console.log("beforeRouteLeave");
        console.log(to);
        console.log(from);
        console.log("beforeRouteLeave");
        next();
    }
}
const router=new VueRouter({
    mode:'history',
    base:__dirname,
    routes:[
        {path:'/',component:Home},
        {path:'/Parent',component:Parent,
            beforeEnter (to, from, next) {//你可以在路由配置上直接定义 beforeEnter 守卫==》相当于组件中的beforeRouteEnter但在beforeRouteEnter之前执行
                console.log("beforeEnter");
                console.log(this);
                console.log(to);
                console.log(from);
                console.log("beforeEnter");
                next();//可以  next(false)不可以   next();next('/') 或者 next({ path: '/' })
            }
        },
        {path:'/transtion',component:transtion},
        {path:'*',redirect:'/'}
    ]
});
router.beforeEach((to, from, next) => {//你可以使用 router.beforeEach 注册一个全局前置守卫：
    // ...
    console.log("beforeEach");
    console.log(to);
    console.log(from);
    console.log(next);
    console.log("beforeEach");
    next();
})
const Demo=`
        <div id="demo">
            <button @click="houtui">后退</button>
            <button @click="qianjin">前进</button>
            <button @click="home">首页</button>
            <button @click="query">query</button>
            <h1>this transition</h1>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/Parent">Parent</router-link></li>
                <li><router-link to="/transtion">transtion</router-link></li>
                <li><router-link to="/fdfds">redirect</router-link></li>
            </ul>
            <transition :name="name" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    `;


new Vue({
    router,
    template:Demo,
    data:{
        name:"fade1"
    },
    methods:{
        houtui(){
            router.go(-1);
            //history.back()
        },
        qianjin(){
            router.go(1);
        },
        home(){
            router.push("/");
            console.log(router);
        },
        query(){
            router.push({path:"/",query:{a:1,b:2}});
        }
    },
    watch:{
        $route:function(to,from){
            //console.log(to,from);
            this.name="fade"+(from.path=="/"?1:2);
        }
    }
}).$mount("#demo");
