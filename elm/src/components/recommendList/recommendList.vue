<template>
    <div class="recommendList">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 18 18" id="shop">
                    <path fill-rule="evenodd"
                          d="M15 6.15a1.745 1.745 0 0 1-1.737 1.6h-.074a1.75 1.75 0 0 1-1.63-1.33.5.5 0 0 0-.487-.407h-.39a.495.495 0 0 0-.49.417 1.748 1.748 0 0 1-1.65 1.32H8.47c-.04 0-.052 0-.064-.002a.528.528 0 0 1-.058-.004l-.09-.01A1.748 1.748 0 0 1 6.802 6.41a.5.5 0 0 0-.487-.397h-.39c-.24 0-.44.17-.487.397a1.75 1.75 0 0 1-1.363 1.308L4 7.732a3.84 3.84 0 0 1-.08.01l-.065.005-.06.003H3.74A1.744 1.744 0 0 1 2 6.083V2h13v4.15zm-14.998.1H0a3.314 3.314 0 0 0 3.31 3.32c1.05 0 2.01-.23 2.615-.995.606.765 1.518.994 2.568.994s1.812-.367 2.418-1.132c.607.765 1.717 1.13 2.767 1.13a3.314 3.314 0 0 0 3.31-3.25.49.49 0 0 0 .013-.11V1.435A1.462 1.462 0 0 0 15.57 0H1.418A1.442 1.442 0 0 0 0 1.435v4.773c0 .015 0 .03.002.043zm14 10.75H3c-1.103 0-2-.9-2-2.006v-2.98a1 1 0 1 1 2 0v2.98L14.002 15 14 12a1 1 0 1 1 2 0v2.99c0 1.11-.896 2.01-1.998 2.01z"></path>
                </symbol>
            </defs>
        </svg>
        <section v-if="recommend.food" v-for="(recommend,index) in recommends" :sort_index="index" class="recommend_item">
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
    .recommendList {
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
