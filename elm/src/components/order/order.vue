<template>
    <div class="order">
        <pageHeader title="订单" :callback="back"></pageHeader>
        <section class="NoDataTip-wrapper">
            <img src="//fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif">
            <h3>登录后查看外卖订单</h3>
            <button>
                立即登录
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
    .NoDataTip-wrapper {
        margin-top: 2.666667rem;
        margin-top: 26.666667vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
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
