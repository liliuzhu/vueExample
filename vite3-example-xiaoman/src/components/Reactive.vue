<template>
  <div>{{ obj }}</div>
  <div v-for="item of list" :key="item">{{item}}</div>
  <div>{{ obj3 }}</div>
  <button @click="edit">点击</button>
</template>

<script setup lang="ts">
import {onMounted, reactive, readonly, shallowReactive} from "vue";
let obj = reactive({
  name: '张三'
})
// reactive prroxy 不能直接赋值，否则破坏响应式对象
let list = reactive<string[]>(['1','2','3'])
console.log(list)
let read = readonly(obj)

let obj3 = shallowReactive({
  foo: {
    bar: {
      num:1
    }
  }
})

const edit = ()=>{
  obj.name = '李四'
  obj3.foo.bar.num = 23
}


onMounted(()=>{
  setTimeout(()=>{
    // read.name = '李四'
    let res = ['5','6']
    // list.length =0
    list = res
  }, 2000)
})
</script>

<style scoped>

</style>
