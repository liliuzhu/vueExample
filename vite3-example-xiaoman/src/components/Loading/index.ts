import type {App, VNode} from 'vue'
import { createVNode, render } from 'vue'
import Loading from './index.vue'
export default {
   install(app:App){
      const VNode:VNode = createVNode(Loading)
      render(VNode,document.body)
      app.config.globalProperties.$loading = {
         show:VNode?.component?.exposed?.show,
         hide:VNode?.component?.exposed?.hide,
      }
      // app.config.globalProperties.$loading.show()
      // console.log(app, 123, VNode, VNode?.component?.exposed)
   }
}
