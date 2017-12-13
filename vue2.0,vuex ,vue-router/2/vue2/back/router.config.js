/**
 * Created by LiLiuzhu on 2017/10/19.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const first={template:'<div>first内容</div>'};
const second={template:'<div>second内容</div>'};
const Home={template:'<div>Home内容</div>'};
const firstFirst={template:'<div>firstFirst内容{{$route.params}}</div>'};
const firstSecond={template:'<div>firstSecond内容{{$route.params}}</div>'};
const firstUser={template:'<div>firstUser:{{$route.params.userName}}-{{$route.query.aaa}}</div>'};
const firstAbout={template:'<div>firstAbout内容{{$route.params}}</div>'};
const redirect={template:'<div>redirect{{$route.params}}</div>'};
const asdf={
    template:`
        <div class="asdf">
            <h2>组件</h2>
            <router-view clacc="asdf"></router-view>
        </div>
    `
};
const router=new VueRouter({
    mode:'history',
    base:__dirname,
    routes:[
        {path:'/',name:"Home",component:Home,
            components:{
                default:Home,
                left:firstFirst,
                right:firstSecond
            }
        },
        {path:'/about',component:firstAbout,alias:['/goo','/papa']},
        {path:'/first',component:asdf,
            children:[
                {path:'/',name:"Home-First",component:first},
                {path:'first',name:"Home-First-First",component:firstFirst},
                {path:'second/:id',name:"Home-First-Second",component:firstSecond},
                {path:'user/:userName',name:"Home-First-User",component:firstUser},
                {path:'about',name:"Home-First-About",component:firstAbout},
                {path:'redirect',redirect:'first'}
            ]
        },
        {path:'/second/:id',name:"Home-Second",alias:'/gogo/:id',
            components:{
                default:second,
                left:firstSecond,
                right:firstFirst
            }
        },
        {path:'/params/:aaa/:bbb'},
        {path:'/params-regex/:id(\\d+)'},
        {path:'/redirect/:id',component:redirect},
        {path:'/redirect2/:ids',redirect:'/redirect/:ids'},
        {path:'/redir/:idss',redirect:xxx=>{
            console.log(xxx);
            const {hash,params,query}=xxx;
            if(params.idss=='001'){
                return '/';
            }
            }
        }
    ]
});
new Vue({
    router:router,
    //el: '#app',
    template:`
        <div id="r">
            <h1>导航</h1>
            <p>{{$route.name}}</p>
            <ol>
            <li><router-link to="/">/</router-link></li>
            <li>
                <router-link to="/first">first</router-link>
                <ol>
                   <li><router-link to="/first/">///</router-link></li>
                   <li><router-link :to="{name:'Home-First-First',params:{id:123}}">first</router-link></li>
                   <li><router-link to="/first/second/456">second</router-link></li>
                   <li><router-link :to="{path:'/first/user/wossss',query:{aaa:'bbb'}}">user</router-link></li>
                   <li><router-link to="about">about</router-link></li>
                   <li><router-link to="about" append>about</router-link></li>
                   <li><router-link to="/first/redirect">redirect</router-link></li>
                </ol>
            </li>
            <li><router-link to="/gogo/123">gogo</router-link></li>
            <li><router-link to="/second/987">second</router-link></li>
            <li><router-link to="/params/123/456">/params/123/456</router-link></li>
            <li><router-link to="/params-regex/1233">/params-regex/1233</router-link></li>
            <li><router-link to="/params-regex/a123">/params-regex/a123</router-link></li>
            <li><router-link to="/goo">goo</router-link></li>
            <li><router-link to="/papa">papa</router-link></li>
            <li><router-link to="/about">about</router-link></li>
            <li><router-link to="/about" append>about</router-link></li>
            <li><router-link to="/about" exact>exact</router-link></li>
            <li><router-link to="/redirect/12345">/redirect/12345</router-link></li>
            <li><router-link to="/redirect2/123456">/redirect2/12345</router-link></li>
            <li><router-link to="/redir/001">/redir/001</router-link></li>
            <li><router-link to="/redir/002">/redir/002</router-link></li>
            </ol>
            <h1>show</h1>
            <pre>
                <code>{{JSON.stringify($route.fullPath,null,2)}}</code>
            </pre>
            <router-view class="asdf"></router-view>
            <router-view class="asdf" name="left" style="float:left;height:200px;width:50%;background-color:#ff0"></router-view>
            <router-view class="asdf" name="right" style="float:left;height:200px;width:50%;background-color:#f0f"></router-view>
        </div>
    `
}).$mount("#app");
