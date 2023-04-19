<template>
  <div class="header">
    {{ name }}
    <br>
    {{title}}
    <button @click="emit">emit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Header',
  props: {
    title: String
  },
  emits: {
    headerEmit:null,
    'update:title':(payload:string ):boolean => {
      if(payload.length < 10){
        return true
      } else {
        console.warn('内容过长')
        return false
      }
    }
  },
  data() {
    return {
      name: 'header'
    }
  },
  created() {
    console.log(this.name,  'created')
  },
  methods: {
    getName() {
      return this.name
    },
    emit(){
      this.$emit('update:title', this.title + '-1')
      this.$emit('headerEmit', this.name)
    }
  }
})

</script>

<style lang="less" scoped>
.header{
  height: 60px;
  border-bottom: 1px solid #ccc;
}
</style>
