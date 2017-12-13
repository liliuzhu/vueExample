<template>
   <div id="div">
       <button @click="show=!show">show/hide</button>
       <transition name="fade">
           <p v-if="show">hello vue</p>
       </transition>
   </div>
</template>
<script>
 export default{
     data(){
         return{
             show:true
         }
     }
 }
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
</style>