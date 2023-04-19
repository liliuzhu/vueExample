<template>
  <div class="content">
    <slot></slot>
    <button @click="random">random</button>
    <transition-group class="wraps" tag="div" move-class="mmm">
      <div v-for="item in list" :key="item.id" class="content-items">{{item.number}}</div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive, toRaw, nextTick} from "vue";
import type {Ref} from "vue"
import _ from "lodash"
let list = ref(Array.apply(null, { length: 100 } as number[]).map((item, index)=>{
  return {
    id: index,
    number: (index % 10) + 1
  }
}))
console.log(list)
const random = async () => {
  list.value=_.shuffle(list.value)
  console.log(list)
  const a = await nextTick(()=>{
    console.log(2, list.value)
  })
  console.log(3, a)
}

</script>

<style lang="less" scoped>
.content{
  flex: 1;
  margin: 20px;
  border: 1px solid #ccc;
  overflow: auto;

  .wraps{
    display: flex;
    width: 250px;
    flex-wrap: wrap;
  }

  &-items{
    box-sizing: border-box;
    border: 1px solid #ccc;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
   }
}

.mmm {
  transition: all 1s;
}
</style>
