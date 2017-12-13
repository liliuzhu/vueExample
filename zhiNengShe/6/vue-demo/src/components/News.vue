<template>
    <div>
        <h3>我是新闻页</h3>
        <ul>
            <li v-for="(val,index) in news">{{val}}</li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'names',
        data(){
            return {
                news:["1111","2222","3333","4444"]
            }
        }
    }
</script>
<style scoped>
    li{
        border-bottom: 1px solid #000;
    }
</style>