<template>
  <div>
    {{man}}
    <br>
    {{man.like}}
  </div>
  <div>
    <button @click="change">修改</button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive, toRef, toRefs , isRef,isReactive, toRaw} from "vue";
import type {Ref} from "vue"


const  toRefs2 = <T extends object>(obj: T) =>{
  let map:any = {}
  for (let key in obj) {
    map[key] = toRef(obj, key)
  }
  return map

}
function toRaw2 <T>(observed:T):T {
  // return observer['__v_raw']
  // @ts-ignore
  const raw = observed && observed['__v_raw']
  return raw ? toRaw(raw) : observed
}
const man = reactive({ name: '小马', age: 20, like: 'JK' })
const like2 = toRef(man, 'like')
const man2 = toRaw2(man)
// toRef 只修改响应式对象的值，非响应式视图毫无变化

let { name, age, like } = toRefs2(man)

const change = ():void => {
  like2.value = '洛丽塔'
  // console.log(isRef(like2), isReactive(man))
  name.value = '打满'
  // console.log(name, age, like)
  console.log(man, man2)
}
</script>

<style scoped>

</style>
