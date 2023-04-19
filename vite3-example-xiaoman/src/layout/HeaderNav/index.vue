<template>
  <div class="header">
    {{ name }}
    <br>
    {{title}}
    <button @click="emit">emit</button>
  </div>
</template>

<script lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import  type { SetupContext, Ref } from 'vue'


export default {
  name: 'HeaderNav',
  props: {
    title: String
  },
  expose: ['getName', 'name'], // expose 选项值应当是一个包含要暴露的属性名称字符串的数组。当使用 expose 时，只有显式列出的属性将在组件实例上暴露。
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
  setup(props:any, ctx:SetupContext){
    const name = ref('HeaderNav')
    console.log('HeaderNav', 'setup', ctx)
    onMounted(()=>{console.log('HeaderNav', 'onMounted')})
    onUnmounted(()=>{console.log('HeaderNav', 'onUnmounted')})
    const getName = ():Ref => {
        return name
      }
    const emit = ():void => {
      ctx.emit('update:title', props.title + '-1')
      ctx.emit('headerEmit', name.value)
      }
    return {
      name,
      getName,
      emit
    }
  },
}

</script>

<style lang="less" scoped>
.header{
  height: 60px;
  border-bottom: 1px solid #ccc;
}
</style>
