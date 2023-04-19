<template>
  <div class="menu">
    menu
    <div>
      {{title}}
      <br>
      {{arr}}
      <br>
      <button @click="send">给父组件传值</button>
    </div>
  </div>
</template>
<!--<script lang="ts">-->
<!--export default {-->
<!--  name: "Menu"-->
<!--}-->
<!--</script>-->

<script setup lang="ts" name="Menu">
import {onMounted, ref, reactive} from "vue";
import type {Ref} from "vue"
// import {defineOptions} from "unplugin-vue-define-options/macros";
// defineOptions({
//   name: 'Menu',
// });


// 接受父组件的传值 defineProps
// js模式
// const props = defineProps({
//   title:{
//     type: String,
//     default: '默认值'
//   },
//   arr:{
//     type: Array,
//     default: ()=>[]
//   }
// })
// console.log(props.title)
// const emit = defineEmits(['on-click'])
// const emit = defineEmits({ // 校验
//   'on-click'(agr) {
//     return true
//   }
// })
// const send= () => {
//   emit('on-click', '小满', 11313)
// }

// ts模式
// ts 特有定义默认值withDefaults
// 给父组件传值 defineEmits
const props2 = withDefaults(defineProps<{
  title: string,
  arr: number[]
}>(), {
  title: '默认值',
  arr: () => []
})

console.log(props2)

const emit = defineEmits<{
  (e:'on-click', name:string, age:number ):void
  // (e:'on-click', name:string, age:number ):void 其他
}>()

const send= () => {
  emit('on-click', props2.title, 11313)
}

defineExpose({
  name2: '小满',
  send
})

</script>

<style lang="less" scoped>
.menu {
  width: 200px;
  height: 100%;
  border-right: 1px solid #ccc;
  background: v-bind('props2.title');
}
</style>
