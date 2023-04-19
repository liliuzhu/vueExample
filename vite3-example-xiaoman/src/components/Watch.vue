<template>
  <button @click="click">点击</button>
  <br>
  <input v-model="name" type="text">
  <input v-model="obj.foo.bar.name" type="text">
  <button @click="stopWatch">停止监听</button>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive,watch, watchEffect} from "vue";
import type {Ref} from "vue"
let name:Ref = ref('2')
let obj = reactive({ foo: { bar:{ name:'脏三' } }})

watch(name, (nVal, oVal)=>{
  console.log(nVal, oVal)
})

watch(obj, (nVal, oVal)=>{
  console.log(nVal, oVal)
})

watch(() => obj.foo.bar.name, (nVal, oVal)=>{
  console.log(nVal, oVal)
})

watch([name,obj,() => obj.foo.bar.name], (nVal, oVal)=>{
  console.log(nVal, oVal)
})

const click = () =>{
  name.value = '小满'
  obj.foo.bar.name = '小满2'
}

const stop = watchEffect((oninvalidate)=>{
  console.log('name===>', name.value)
  console.log('name===>', obj.foo.bar.name)

  oninvalidate(()=>{
    console.log('before')
  })
}, {
  flush: 'post',
  onTrigger(e){
    debugger
  }
})
const stopWatch = () => {
  stop()
}

</script>

<style scoped>

</style>
