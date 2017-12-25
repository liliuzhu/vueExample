<template>
    <div class="recommendList">
        <div class="recommend_wrap">
            <section v-for="recommend in recommends" class="recommend_item">
                <img class="recommend_img" :src="analysismageHash(recommend.food.image_path,true,345)">
                <div class="recommend_food">
                    <h4 class="food_name">{{recommend.food.name}}</h4>
                    <div class="food_sell">月售{{recommend.food.month_sales}}份　好评率{{recommend.food.satisfy_rate}}%
                    </div>
                </div>
                <div class="food_detail">
                    <div class="food_price">
                            <span class="price_now">
                                <i>¥</i><span>{{recommend.food.price}}</span>
                            </span>
                        <del v-if="recommend.food.original_price" class="price_old">
                            <i>¥</i><span>{{recommend.food.original_price}}</span>
                        </del>
                    </div>
                    <div v-if="recommend.food.discount_activity" class="support">
                        <span>{{recommend.food.discount_activity}}</span>
                    </div>
                </div>
                <div class="recommend_shop">
                    <div class="shop_name">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                        </svg>
                        <span>{{recommend.food.restaurant_name}}</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';

    export default {
        data() {
            return {};
        },
        props: {
            recommends: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            analysismageHash
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .recommendList .recommend_wrap {
        padding-bottom: .4rem;
        padding-bottom: 4vw;
        padding-left: .133333rem;
        padding-left: 1.333333vw;
        .recommend_item {
            display: inline-block;
            position: relative;
            width: 4.6rem;
            width: 46vw;
            background: #fff;
            border: 1px solid #eee;
            text-align: left;
            margin: .12rem;
            margin: 1.2vw;
            .recommend_img {
                display: block;
                width: 4.6rem;
                width: 46vw;
                height: 4.6rem;
                height: 46vw;
            }
            .recommend_food, .food_detail, .recommend_shop {
                margin: 0 .213333rem 0 .266667rem;
                margin: 0 2.133333vw 0 2.666667vw;
            }
            .recommend_food {
                padding-top: .106667rem;
                padding-top: 1.066667vw;
                .food_name {
                    overflow: hidden;
                    color: #333;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                    font-size: .4rem;
                }
                .food_sell {
                    margin-top: .08rem;
                    margin-top: .8vw;
                    color: #666;
                    font-size: .266667rem;
                }
            }
            .food_detail {
                display: flex;
                align-items: center;
                padding-bottom: .08rem;
                padding-bottom: .8vw;
                .food_price {
                    display: flex;
                    align-items: baseline;
                    font-size: .426667rem;
                    .price_now {
                        color: #ff6000;
                        font-size: 1em;
                        i {
                            font-size: .65em;
                            margin-right: .04rem;
                            margin-right: .4vw;
                            font-style: normal;
                        }
                        span {
                            font-weight: 700;
                        }
                    }
                    .price_old {
                        margin-left: .106667rem;
                        margin-left: 1.066667vw;
                        color: #999;
                        font-size: .65em;
                        i {
                            margin-right: .04rem;
                            margin-right: .4vw;
                            font-style: normal;
                        }
                    }
                }
                .support {
                    margin-left: .133333rem;
                    margin-left: 1.333333vw;
                    padding: 0 .053333rem;
                    padding: 0 .533333vw;
                    border: 1px solid #f66d6b;
                    border-radius: .053333rem;
                    border-radius: .533333vw;
                    color: #f66d6b;
                    font-size: .266667rem;
                }
            }
            .support, .recommend_shop {
                display: flex;
                align-items: center;
            }
            .recommend_shop {
                height: .88rem;
                height: 8.8vw;
                border-top: 1px dashed #ccc;
                .shop_name {
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    overflow: hidden;
                    svg {
                        display: block;
                        -webkit-box-flex: 0;
                        flex: 0 0 0.266667rem;
                        flex: 0 0 2.666667vw;
                        width: .266667rem;
                        width: 2.666667vw;
                        height: .266667rem;
                        height: 2.666667vw;
                        fill: #bbb;
                    }
                    span {
                        flex: 1 1 auto;
                        overflow: hidden;
                        margin-left: .16rem;
                        margin-left: 1.6vw;
                        color: #999;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: .293333rem;
                    }
                }
            }
        }
    }
</style>
