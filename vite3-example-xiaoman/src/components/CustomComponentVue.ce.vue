<template>
  <div>
    custom-component-vue
    <slot name="liu"><div>我是默认</div></slot>
    <div>{{ obj }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,onUnmounted } from 'vue'
const props = defineProps<{
  obj:any
}>()

//当自定义元素第一次被连接到文档 DOM 时被调用。
onMounted (()=> {
  console.log(' custom-component-vue 我已经插入了！！')
})

onUnmounted (()=> {
  console.log(' custom-component-vue onUnmounted')
})
</script>

<style scoped>

</style>
