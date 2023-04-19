import {onMounted,onUnmounted, reactive} from "vue";

export default () =>{
   let point = reactive({
      x: 0,
      y:0
   })

   const callback = (e: MouseEvent )=>{
      point.x = e.offsetX
      point.y = e.offsetY
   }
   onMounted(()=>{
      console.log('hook onMounted')
      window.addEventListener('click', callback, false)
   })
   onUnmounted(()=>{
      console.log('hook onUnmounted')
      window.removeEventListener('click',callback,false)
   })
   return point
}
