<template>
    <transition name="fade" v-if="state">
        <section class="brief_shop_info mask" @click="hide">
            <div class="info_body" @click.stop.prevent>
                <h2 class="shop_name">{{shopInfo.name}}</h2>
                <ul class="brief_list">
                    <li class="brief_item"><h3 class="item_value">{{shopInfo.rating}}</h3>
                        <p class="item_name">评分</p></li>
                    <li class="brief_item"><h3 class="item_value">{{shopInfo.recent_order_num}}单</h3>
                        <p class="item_name">月售</p></li>
                    <li class="brief_item"><h3 class="item_value">
                        {{shopInfo.delivery_mode&&shopInfo.delivery_mode.text}}</h3>
                        <p class="item_name">约{{shopInfo.order_lead_time}}分钟</p></li>
                    <li class="brief_item"><h3 class="item_value">{{shopInfo.float_delivery_fee}}</h3>
                        <p class="item_name">配送费</p></li>
                    <li class="brief_item"><h3 class="item_value">{{(shopInfo.distance/1000).toFixed(1)}}km</h3>
                        <p class="item_name">距离</p></li>
                </ul>
                <h3 class="notice_title"><span>公告</span></h3>
                <div class="notice_content">{{shopInfo.promotion_info||noticeTemplate}}</div>
            </div>
            <div class="close_brief"></div>
        </section>
    </transition>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                state: false,
                noticeTemplate: '欢迎光临，用餐高峰期请提前下单，谢谢。'
            };
        },
        props: {
            shopInfo: {
                type: Object,
                required: true,
                default: function () {
                    return {};
                }
            }
        },
        methods: {
            show() {
                this.state = true;
            },
            hide() {
                this.state = false;
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .brief_shop_info {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 52;
        flex-direction: column;
        .info_body {
            position: relative;
            width: 80%;
            max-height: 8.533333rem;
            max-height: 85.333333vw;
            padding: .706667rem .666667rem .746667rem;
            padding: 7.066667vw 6.666667vw 7.466667vw;
            border-radius: .106667rem;
            border-radius: 1.066667vw;
            overflow: hidden;
            background: #fff;
            z-index: 99;
            display: flex;
            flex-direction: column;
            will-change: transform;
            .shop_name {
                font-size: .6rem;
                line-height: .666667rem;
                line-height: 6.666667vw;
                color: #333;
                text-align: center;
                font-weight: bolder;
            }
            .brief_list {
                display: flex;
                margin: .506667rem -.666667rem 0;
                margin: 5.066667vw -6.666667vw 0;
                .brief_item {
                    flex: 1;
                    text-align: center;
                }
                .item_value {
                    font-size: .4rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: .16rem;
                    margin-bottom: 1.6vw;
                }
                .item_name {
                    font-size: .293333rem;
                    color: #999;
                }
            }
            .notice_title {
                position: relative;
                text-align: center;
                margin: .48rem auto .266667rem;
                margin: 4.8vw auto 2.666667vw;
                width: 2.026667rem;
                width: 20.266667vw;
                background-image: -webkit-gradient(linear, left top, right top, from(#fff), color-stop(50%, #333), to(#fff));
                background-image: -webkit-linear-gradient(left, #fff, #333 50%, #fff);
                background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
                background-size: 100% 1px;

                background-position: 50%;
                background-repeat: no-repeat;
                span {
                    font-size: .32rem;
                    padding: 0 .106667rem;
                    padding: 0 1.066667vw;
                    color: #999;
                    background-color: #fff;
                }
            }
            .notice_content {
                font-size: .346667rem;
                line-height: 1.54;
                color: #333;
                max-height: 2.666667rem;
                max-height: 26.666667vw;
                overflow-y: auto;
            }
        }
        .close_brief {
            margin-top: .8rem;
            margin-top: 8vw;
            width: .8rem;
            width: 8vw;
            height: .8rem;
            height: 8vw;
            z-index: 2;
            background: transparent url("./brief_close.png") no-repeat;
            background-size: 100%;
        }
    }

    .fade-enter-active, .fade-leave-active {
        .info_body {
            transition: all 0.3s;
        }
    }

    .fade-enter, .fade-leave-to {
        .info_body {
            transform: scale(0.1);
            opacity: 0;
        }
    }
</style>
