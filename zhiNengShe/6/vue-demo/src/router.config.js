/**
 * Created by LiLiuzhu on 2017/9/20.
 */
import Home from  './components/Home.vue'
import News from  './components/News.vue'

export default{
    routes:[
        {path:'/home',component:Home},
        {path:'/news',component:News},
        {path:'*',redirect:'/home'}
    ]
}