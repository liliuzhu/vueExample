<template>
  <nav class="nav">
    <router-link to="/">Base</router-link>
    <router-link to="/main">main</router-link>
    <router-link to="/pinia">pinia</router-link>
  </nav>
  <div>
    <button @click="loading">loading</button>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {getCurrentInstance, ComponentInternalInstance, onMounted} from 'vue'
const router = useRouter()
console.log(router.getRoutes())
const ins = getCurrentInstance() as ComponentInternalInstance
const loading = ()=>{
  ins?.proxy?.$loading.show()
  setTimeout(()=>{
    ins?.proxy?.$loading.hide()
  }, 2000)
}
</script>

<style scoped lang="less">
.nav {
  display: flex;
  * {
    flex: 1;
    background: pink;
    text-decoration: none;
    border: 1px solid #fff;
    text-align: center;
  }
}
</style>
