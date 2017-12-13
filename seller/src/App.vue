<template>
    <div id="app">
        <el-header :seller="seller"></el-header>
        <ul class="tap border-bottom">
            <router-link class="tap-item" tag="li" to='/goods'><span>商品</span></router-link>
            <router-link class="tap-item" tag="li" to='/ratings'><span>评论</span></router-link>
            <router-link class="tap-item" tag="li" to='/seller'><span>商家</span></router-link>
        </ul>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
        <!--<div id="footer">-->
        <!--我是footer-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {urlParse} from './common/js/util';
    import Header from './components/Header/Header.vue';

    export default {
        name: 'app',
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        return queryParam.id;
                    })()
                }
            };
        },
        components: {
            'el-header': Header
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$ajax.get('/api/shop/seller?id=' + this.seller.id).then((res) => {
                    if (res.data.status) {
                        this.seller = {...res.data.body, ...this.seller};
                        // console.log(res.data.body);
                    }
                }).catch((err) => {
                    console.log('seller错误' + err);
                });
                // this.$ajax.get('./data.json?id=' + this.seller.id).then((res) => {
                //     console.log(res);
                //     if (res.data.seller) {
                //         this.seller = {...res.data.seller, ...this.seller};
                //         // console.log(res.data.body);
                //     }
                // }).catch((err) => {
                //     console.log('seller错误' + err);
                // });
            }
        },
        watch: {
            $route() {
                console.log(this.$route.query);
            }
        }
    };
</script>

<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    @import "./common/style/mixin";

    .tap {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        /*background-color: #fff;*/
        @border-color: rgba(7, 17, 27, .1);
        .border-bottom(1px, solid, @border-color);
        .tap-item {
            flex: 1;
            text-align: center;
            color: rgb(77, 85, 93);
            & > span {
                font-size: 14px;
                line-height: 14px;
            }
            &.router-link-exact-active {
                color: rgb(240, 20, 20);
            }
        }
    }
</style>
