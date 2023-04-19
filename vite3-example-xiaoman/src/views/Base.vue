<template>
  <custom-element></custom-element>
  <custom-element-template>
    <h5 slot="li">
      <a>我是slot</a>
    </h5>
  </custom-element-template>
  <custom-component-vue :obj="JSON.stringify(obj2)">
    <div slot="liu">我是slot</div>
  </custom-component-vue>
  <life/>
  <watch/>
  <computed/>
  <to/>
  <reactive2/>
  <div @click="zhangsan">{{ message }}</div>
  <input type="text" v-model="message">
  <div ref="err">122</div>
  <div>{{ obj.name }}</div>
  <div>{{ obj2.name }}</div>
  <div>{{ customRefTest }}</div>
  <!--  <HelloWorld msg="Vite + Vue" />-->
  <div>reactive</div>
  <div>point {{ point }}</div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from '@/components/HelloWorld.vue'
import Life from "@/components/Life.vue";
import Watch from "@/components/Watch.vue";
import Computed from "@/components/Computed.vue";
import To from "@/components/To.vue";
import Reactive2 from "@/components/Reactive.vue";
import CustomComponentCe from "@/components/CustomComponentVue.ce.vue"
import usePoint from '@/hooks/usePoint'
import {onMounted, ref, reactive, shallowRef, triggerRef, customRef, getCurrentInstance,defineCustomElement} from "vue";
import type { Ref, ComponentInternalInstance } from "vue"
import {useRouter} from "vue-router";
// export default {
//   setup(){
//     let message = ref('1')
//     onMounted(()=>{
//       setTimeout(()=>{
//         console.log(message)
//         message.value = '我是'
//         console.log(message)
//       }, 1000)
//     })
//
//     const lisi = ()=>{
//       message.value = '我是2'
//     }
//
//     const zhangsan = ()=>{
//       message.value = '我是2'
//     }
//     return {
//       message,
//       lisi
//     }
//   }
// }
if(!window.customElements.get('custom-component-vue')){ // customElements 只能注册一次
  const Btn = defineCustomElement(CustomComponentCe)
  console.log(112, Btn)

  window.customElements.define('custom-component-vue', Btn)
}

function MyRef<T>(value:T){
  return customRef((track, trigger)=>{
    return {
      get(){
        track()
        return value
      },
      set(newVal){
        value = newVal
        trigger()
      }
    }
  })
}
let message:Ref = ref('1')
let obj = reactive({ name: '张三' })
let obj2 = shallowRef({ name: '王五' })
let err:Ref = ref<HTMLDivElement>()
let ins2 = getCurrentInstance() as ComponentInternalInstance | any
let customRefTest=MyRef('customRef小满')
let point  = usePoint()
const router = useRouter()
onMounted(()=>{
  console.log('onMounted')
  console.log(router.getRoutes())
  console.log('组件onMounted')
  setTimeout(()=>{
    console.log(message)
    // message.value = '我是'
    console.log(message)
    // obj.name = '李四'
    obj2.value.name="马六";
    ins2?.proxy?.$forceUpdate?.()
    customRefTest.value='customRef大满'
    console.log(customRefTest)
  }, 1000)
  console.log(err.value)
})

const zhangsan = ()=>{
  message.value = '我是2'
}
</script>

<style scoped>

</style>
