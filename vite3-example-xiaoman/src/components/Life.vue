<template>
  <div ref="div">{{str}}</div>
  <button @click="update">修改</button>
  <br>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted, onRenderTracked, onRenderTriggered ,ref } from "vue";
import type {Ref} from "vue"

// Vue3 组合式API 是没有 beforeCreate 和 created 这两个生命周期的
console.log('setup')
const str = ref<string>('小满')
const div = ref<HTMLElement>()
const update = ()=>{
  str.value = '我被修改了'
}

onBeforeMount(()=>{
  console.log('挂载之前', div.value)
})

// 在组件DOM实际渲染安装之前调用。在这一步中，根元素还不存在。

onMounted(()=>{
  console.log('挂载完成', div.value)
})

// 在组件的第一次渲染后调用，该元素现在可用，允许直接DOM访问

onBeforeUpdate(()=>{
  console.log('跟新组件之前', div.value?.innerText)
})

// 数据更新时调用，发生在虚拟 DOM 打补丁之前。

onUpdated(()=>{
  console.log('跟新组件完成', div.value?.innerText)
})

// DOM更新后，updated的方法即会调用。

onBeforeUnmount(()=>{
  console.log('组件卸载之前')
})

// 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。

onUnmounted(()=>{
  console.log('组件卸载完成')
})
// 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。


onRenderTracked((event) => {
  console.log(1,event)
})

onRenderTriggered((event) => {
  console.log(2, event)
})
</script>

<style scoped>

</style>
