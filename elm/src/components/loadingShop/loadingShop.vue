<template>
    <div class="loading_shop">
        <svg class="LoadMore_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#loading.001898b"></use>
        </svg>
        <span>正在加载...</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {}
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .loading_shop {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 1.066667rem;
        min-height: 10.666667vw;
        background-color: #fff;
        color: #555;
        font-size: .346667rem;
        .LoadMore_icon {
            display: block;
            margin-right: .2rem;
            margin-right: 2vw;
            width: .4rem;
            width: 4vw;
            height: .4rem;
            height: 4vw;
            transform-origin: 50% 50%;
            animation: LoadMore_loading 1s linear infinite;
        }
        @keyframes  LoadMore_loading{
            to{transform: rotate(1turn)}
        }

    }
</style>
