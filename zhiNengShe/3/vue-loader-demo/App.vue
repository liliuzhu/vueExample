<template>
    <h1>welcome Vue</h1>
    <h2 @click="change">{{msg}}</h2>
    <my-menu></my-menu>
    <h3>vue-loader +vue-router</h3>
</template>
<script>
    import Menu from './components/Menu.vue';
    export default{
        data(){
            return {
                msg:"welcome Vue ^_^"
            }
        },
        methods:{
            change(){
                this.msg="wahaha";
            }
        },
        components:{
            'my-menu':Menu
        }
    }
</script>
<style>
body{
    background-color:#ccc;
}
</style>