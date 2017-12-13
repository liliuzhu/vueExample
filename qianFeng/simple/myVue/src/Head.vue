<template>
    <div id="header" :style="{'position' : costomFixed ?'fixed':'absolute'}">
        <slot name="left"></slot>
        {{customTitle}}
        <slot name="right"></slot>
    </div>
</template>
<script>
 export default{
     name:"my-header",
     props: {
         "customTitle": {
             type: String,
             default: "标题"
         },
         "costomFixed": {
             type: Boolean,
             default: false
         }
 }
 }
</script>
<style>
    #header{
        width: 100%;
        height: 40px;
        background-color: #666;
        color: #fff;
        text-align: center;
        line-height: 40px;
        position: absolute;
        top: 0;
        z-index: 100;
    }
    #header button{height: 100%;padding: 0 5px;position: absolute;top:0;}
    #header button:nth-of-type(1){left: 0;}
    #header button:nth-of-type(2){right: 0;}
</style>