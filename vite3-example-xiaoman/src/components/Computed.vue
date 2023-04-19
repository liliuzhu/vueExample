<template>
  <div>
    <input v-model="firstName" type="text">
    <input v-model="lastName" type="text">
    <div>
      name: {{ firstName }} - {{lastName}}
      <br>
      {{name}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive, computed} from "vue";
// import type {Ref, ReactiveEffect} from "vue"
let firstName = ref('')
let lastName = ref('')
// const name = computed(()=>{
//   return firstName.value + lastName.value
// })
const name = computed({
  get(){
    return firstName.value + lastName.value
  },
  set(val){
    firstName.value = ''
    lastName.value = ''
  }
})
</script>

<style scoped>

</style>
