<template>
    <div class="koubei">
        <pageHeader title="周边优惠" :callback="back"></pageHeader>
        <section class="NoDataTip-wrapper">
            <img src="./not_logo.gif">
            <h3>你还没有登录哦</h3>
            <p>登录后邀请好友可得奖励</p>
            <button>
                去登录
            </button>
        </section>
        <section class="orderbody"></section>
    </div>
</template>
<script type="text/ecmascript-6">
    import pageHeader from '@/components/pageHeader/pageHeader';

    export default {
        data() {
            return {};
        },
        mounted() {
            document.title = '周边优惠';
        },
        methods: {
            back() {
                this.$router.back();
            }
        },
        components: {
            pageHeader
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .koubei{
        /*width: 10rem;*/
        /*width: 100vw;*/
        height: 100vh;
        background-color: #fff;
    }
    .NoDataTip-wrapper {
        margin-top: 2.666667rem;
        margin-top: 26.666667vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            display: block;
            width: 5.333333rem;
            width: 53.333333vw;
        }
        h3 {
            margin: .333333rem 0 .266667rem;
            margin: 3.333333vw 0 2.666667vw;
            color: #6a6a6a;
            font-weight: 400;
            font-size: .453333rem;
        }
        p{
            margin: 0 0 .333333rem;
            margin: 0 0 3.333333vw;
            color: #999;
            font-size: .306667rem;
        }
        button {
            padding: .266667rem;
            padding: 2.666667vw;
            min-width: 3.2rem;
            min-width: 32vw;
            border: none;
            border-radius: .053333rem;
            border-radius: .533333vw;
            background-color: #56d176;
            color: #fff;
            text-align: center;
            font-size: 1.2em;
            font-family: inherit;
        }
    }
</style>
