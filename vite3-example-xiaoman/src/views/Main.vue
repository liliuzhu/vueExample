<template>
  <Layout/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import Layout from "@/layout/index.vue";

console.log(import.meta.env)
</script>

<style lang="less">
html, body, #app {
  height: 100%;
  overflow: hidden;
}
</style>
