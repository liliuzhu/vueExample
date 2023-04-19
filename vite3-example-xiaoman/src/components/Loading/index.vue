<template>
  <div v-if="isShow" class="loading">
    loading...
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive} from "vue";
import type {Ref} from "vue"
const isShow = ref<boolean>(false)
const show = ()=>isShow.value = true
const hide = ()=>isShow.value = false

defineExpose({isShow,show,hide})

</script>

<style scoped>
.loading{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: .8;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
