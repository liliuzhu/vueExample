// 渲染首屏
import createApp from './app'

export default context => {
  return new Promise((resolve, reject)=> {
    const { app, router } = createApp()
    // 进入首屏
    router.push(context.url)
    router.onReady(()=>{
      resolve(app)
    },reject)
  })
}