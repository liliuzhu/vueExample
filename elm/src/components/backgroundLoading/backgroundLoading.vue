<template>
    <div class="background_loading">
        <div class="loading_wrap">
            <div class="loading_box"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .background_loading {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 8888;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity .3s;
        .loading_box, .loading_wrap {
            width: 1.333333rem;
            width: 13.333333vw;
            height: 1.333333rem;
            height: 13.333333vw;
        }
        .loading_wrap{
            position: relative;
            margin-top: .666667rem;
            margin-top: 6.666667vw;
        }
        .loading_box {
            position: absolute;
            z-index: 5;
            background: transparent url("./background_loading.png") no-repeat;
            background-size: auto 100%;
            transform-origin: 0 0;
            background-position-x: 0;
            user-select: none;
            cursor: pointer;
            animation: background_loading 1.5s normal infinite steps(43);
        }
        @keyframes background_loading {
            0% {
                background-position-x: 0
            }
            to {
                background-position-x: 100%
            }
        }
    }
</style>
