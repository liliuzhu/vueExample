<template>
  <div class="layout">
    <Menu ref="menu" :arr="arr" :title="name" @on-click="getName"/>
    <div class="layout-right">
      <Header ref="header" v-model:title="name" @header-emit="headerEmit"/>
      <header-nav ref="headerNav" v-model:title="name" @header-emit="headerEmit"/>
      <Content/>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import HeaderNav from './HeaderNav/index.vue'
import Content from './Content/index.vue'
import {onMounted, ref, reactive, getCurrentInstance} from "vue";
import type {Ref} from "vue"
// defineOptions({
//   name: 'Layout',
// });

let name = ref<string>('小满')
let arr = [1,2,3]

const getName = (...args:any[]) => {
  console.log(args)
}

const headerEmit = (...args:any[]) =>{
  console.log('headerEmit', args)
}

const menu = ref()
const header = ref()
const headerNav = ref()
// const that = getCurrentInstance()
// console.log(menu.value.name)
onMounted(()=>{
  console.log(menu.value.name2)
  menu.value.send()

  console.log('Layout', menu.value, header.value, headerNav.value)
})

</script>

<style lang="less" scoped>
.layout{
  display: flex;
  height: 100%;
  overflow: hidden;

  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
