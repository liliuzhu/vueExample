// 挂载，激活app
import createApp from './app'

const { app, router } = createApp()
router.onReady(()=>{
  app.$mount('#app')
})