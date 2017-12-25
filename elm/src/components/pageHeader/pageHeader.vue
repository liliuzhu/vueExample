<template>
    <div class="elemeHeader_root">
        <mt-header :fixed="fixed" :title="title">
            <router-link v-if="router" :to="router" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button v-if="callback" @click="callback" icon="back" slot="left"></mt-button>
        </mt-header>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {
            title: {
                type: String,
                default: '标题'
            },
            router: {
                type: String,
                default: ''
            },
            callback: {
                type: Function,
                default: null
            },
            fixed: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .elemeHeader_root {
        height: 1.173333rem;
        height: 11.733333vw;
        .mint-header {
            position: relative;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            width: 100%;
            height: 1.173333rem;
            height: 11.733333vw;
            color: #fff;
            font-size: .48rem;
            background: #2395ff linear-gradient(90deg, #0af, #0085ff);
        }
        .mint-header-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.173333rem;
            width: 11.733333vw;
            height: 1.173333rem;
            height: 11.733333vw;
            flex: none;
            .mint-button {
                height: auto;
            }
            i {
                display: block;
                width: .586667rem;
                width: 5.866667vw;
                height: .586667rem;
                height: 5.866667vw;
                font-size: .48rem;
            }
        }
        .mint-header-title {
            position: absolute;
            top: 0;
            left: 50%;
            height: 1.173333rem;
            height: 11.733333vw;
            max-width: 50%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 700;
            font-size: 1em;
            line-height: 1.173333rem;
            line-height: 11.733333vw;
            transform: translateX(-50%);
        }
    }
</style>
