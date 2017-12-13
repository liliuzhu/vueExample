<template>
    <div id="alert">
        <div class="alert_content">
            <div class="alert_title"><h3>{{customTitle}}</h3></div>
            <div class="alert_body">{{customBody}}</div>
            <div class="alert_btn">
                <button v-if="confirm" @touchstart="confirm">确认</button>
                <button v-if="cancel" @touchstart="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
 export default{

 }
</script>
<style>
    #alert{
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0,0,0,.5);
        display: flex;
    }
    #alert .alert_content{
        width: 200px;
        height: 150px;
        background-color: #fff;
        border-radius: 5px;
        margin: auto;
        position: relative;
    }
    #alert .alert_title{
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }
    #alert .alert_body{
        /*height: 50px;*/
        line-height: 50px;
        text-align: center;
    }
    #alert .alert_btn{
        position: absolute;
        right: 0;
        bottom: 0;
    }
    #alert .alert_btn button{
        margin: 10px ;
        padding: 5px;
    }
</style>