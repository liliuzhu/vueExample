import { createApp } from 'vue'
import Loading from './components/Loading'
import App from './App.vue'
import '@/assets/css/reset.less'
import store from './store'
import router from "./router";
createApp(App)
  .use(store)
  .use(router)
  .use(Loading)
  .mount('#app')


type Lod = {
   show: ()=>{},
   hide: ()=>{}
}

//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
   export interface ComponentCustomProperties {
      $loading: Lod
   }
}
