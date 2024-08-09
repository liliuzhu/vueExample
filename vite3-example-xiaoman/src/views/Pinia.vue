<template>
  <div>
    origin value: {{Test.current}}--{{Test.name}}
  </div>
  <div>
    pinia: {{current}}--{{name}}
  </div>
  <div>actions User: {{Test.user}}</div>
  <div>getters: {{Test.newName}}-{{Test.getUserAge}}</div>
  <div>
    change：
    <button @click="change">change</button>
    <button @click="reset">reset</button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive} from "vue";
import type {Ref} from "vue"
import { useTestStore } from '@/store/useTestStore'
import { storeToRefs } from 'pinia'
const Test = useTestStore()
// pinia 直接解构不具有响应式
const { current, name} = storeToRefs(Test)

Test.$subscribe((args:any,state:any)=>{
  console.log('$subscribe', args, state)
},{
  detached: true,
  deep: true,
  flush: 'post'
})

Test.$onAction((args:any)=>{
  args.after(()=>{
    console.log('after')
  })
  console.log('$onAction', args)
}, true)

const change = ()=>{
  //1 Test.current++
  //2 Test.$patch({current: 888, name: '23'})
  //3 Test.$patch((state)=>{state.current = 999state.name = '34'})
  //4 Test.$state = {current: 888, name: '23'}
  //5 Test.setCurrent(567)

  current.value++
  Test.setUser()
}
const reset = ()=>{
  // Test.$reset()
  Test.$state = {current: 1, name: '2223', user: { name:'', age:1 }}
}

</script>

<style scoped>

</style>
