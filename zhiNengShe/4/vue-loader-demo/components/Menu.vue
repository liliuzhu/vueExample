<template>
   <ul>
       <li v-for="val in list">{{val}}</li>
   </ul>
</template>
<script>
    export default{
        data(){
            return {
                list:["apply","banana","orange"]
            }
        }
    }
</script>
<style>

</style>