<template>
    <div class="no_shop_data_wrap">
        <section v-if="noShop" class="no_shop_data">
            <img src="//fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif">
            <h3>餐厅不存在</h3>
            <p>请重试</p>
            <button @click="$router.go(0);">重试</button>
        </section>
        <section v-else class="no_shop_data">
            <img src="//fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif">
            <h3>没有商品</h3>
            <p>该商家还没有上传商品</p>
            <router-link to="/" tag="button">返回首页</router-link>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {
            noShop: {
                type: Boolean,
                default: false
            }
        },
        methods: {
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .no_shop_data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
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
        p {
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
