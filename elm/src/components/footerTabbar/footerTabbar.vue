<template>
    <footer class="footer-tabbar">
        <mt-tabbar :fixed="true" v-model="selected">
            <mt-tab-item id="/msite">
                <span slot="icon" class="tabbar-icon msite"></span>
                外卖
            </mt-tab-item>
            <mt-tab-item id="/discover">
                <span slot="icon" class="tabbar-icon discover"></span>
                发现
            </mt-tab-item>
            <mt-tab-item id="/order">
                <span slot="icon" class="tabbar-icon order"></span>
                订单
            </mt-tab-item>
            <mt-tab-item id="/profile">
                <span slot="icon" class="tabbar-icon profile"></span>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </footer>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'footerTabbar',
        data() {
            return {
                selected: this.$route.path || '/msite'
            };
        },
        methods: {},
        watch: {
            $route(to, from) {
                this.selected = to.path;
            },
            selected(newVal, oldVal) {
                if (newVal === this.$route.path) {
                    return false;
                }
                this.$router.push(newVal);
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .wrapper {
        .footer-tabbar {
            height: 1.6rem;
            height: 16vw;
            .tabbar-icon {
                width: .533333rem;
                width: 5.333333vw;
                height: .533333rem;
                height: 5.333333vw;
                margin: 0 auto;
                background: transparent no-repeat center center;
                background-size: cover;
                &.msite {
                    background-image: url("./msite.svg");
                }
                &.order {
                    background-image: url("./order.svg");
                }
                &.discover {
                    background-image: url("./discover.svg");
                }
                &.profile {
                    background-image: url("./profile.svg");
                }
            }
            .is-selected .tabbar-icon {
                &.msite {
                    background-image: url("./msite_active.svg");
                }
                &.order {
                    background-image: url("./order_active.svg");
                }
                &.discover {
                    background-image: url("./discover_active.svg");
                }
                &.profile {
                    background-image: url("./msite_active.svg");
                }
            }
        }
    }
</style>
<style rel="stylesheet/css" type="text/css" lang="less">
    .wrapper .footer-tabbar {
        .mint-tabbar {
            z-index: 9999;
            padding-top: .12rem;
            padding-top: 1.2vw;
            background-color: #fff;
            height: 1.333333rem;
            height: 13.333333vw;
            box-shadow: 0 -.026667rem .053333rem rgba(0, 0, 0, .1);
            box-shadow: 0 -.266667vw .533333vw rgba(0, 0, 0, .1);
            > .mint-tab-item.is-selected {
                background-color: #fff;
            }
        }
        .mint-tab-item-icon {
            margin: 0 auto 0.1rem;
            height: auto;
            width: auto;
        }
        .mint-tab-item-label {
            font-size: .266667rem;
            line-height: 1.2;
        }
    }
</style>
