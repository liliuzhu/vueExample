<template>
    <div class="module_title">{{title}}</div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {
            title: {
                type: String,
                default: '模块标题'
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .module_title {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: .96rem;
        height: 9.6vw;
        font-size: .4rem;
        color: #000;
        background-color: #fff;
        &:after, &:before {
            display: block;
            content: "";
            width: .533333rem;
            width: 5.333333vw;
            height: .026667rem;
            height: .266667vw;
            background-color: #999;
        }
        &:before {
            margin-right: .346667rem;
            margin-right: 3.466667vw;
        }
        &:after {
            margin-left: .346667rem;
            margin-left: 3.466667vw;
        }
    }
</style>
