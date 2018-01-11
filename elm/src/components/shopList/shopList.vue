<template>
    <section class="shop_list">
        <ul>
            <router-link tag="li" :to="{path:'/shop',query:{id:shop.id}}" v-for="(shop,index) in shopList" :key="index"
                         :sort_index="index" class="shop_container">
                <div class="shop_info">
                    <div class="logo_container">
                        <div class="logo_main">
                            <img :src="analysismageHash(shop.image_path,true)" :alt="shop.name">
                        </div>
                        <div v-if="shop.is_new" class="new_shop">
                            <span>新店</span>
                        </div>
                    </div>
                    <div class="shop_main">
                        <section class="shop_info_line">
                            <h3 class="shop_name">
                                <i v-if="shop.is_premium" content="品牌" class="premium">品牌</i>
                                <span class="name">{{shop.name}}</span>
                            </h3>
                            <ul class="support_wrapper">
                                <li v-for="support in shop.supports" :content="support.icon_name"></li>
                            </ul>
                        </section>
                        <section class="shop_info_line">
                            <div class="rate_wrap">
                                <div class="rating_wrapper">
                                    <star :rating="shop.rating"></star>
                                </div>
                                <span class="shop_rate">{{shop.rating}}</span>
                                <span>月售{{shop.recent_order_num}}单</span>
                            </div>
                            <div v-if="shop.delivery_mode&&shop.delivery_mode.text" class="delivery_mode">
                                <div :content="shop.delivery_mode.text" class="delivery_icon">
                                    {{shop.delivery_mode.text}}
                                </div>
                            </div>
                        </section>
                        <section class="shop_info_line">
                            <div class="moneylimit">
                                <span class="after_split">¥{{shop.float_minimum_order_amount}}起送</span>
                                <span>配送费¥{{shop.float_delivery_fee}}</span>
                            </div>
                            <div class="timedistanceWrap">
                                <span class="after_split">{{(shop.distance/1000).toFixed(2)}}km</span>
                                <span>{{shop.order_lead_time}}分钟</span>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="activity_wrap">
                    <section v-if="shop.recommend.image_hash&&shop.recommend.reason" class="tagLine">
                        <span :style="{color:shop.recommend.color}" class="sourceTag">
                            <img :src="analysismageHash(shop.recommend.image_hash)">
                            <span>{{shop.recommend.reason}}</span>
                        </span>
                    </section>
                    <span>
                        <svg class="dashedline"><use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                     xlink:href="#dashed-line.3732003"></use></svg>
                    </span>
                    <section class="activities">
                        <div class="activityList">
                            <div v-show="activitieIndex<(shop.showAllActivities?shop.activities.length:2)"
                                 v-for="(activitie,activitieIndex) in shop.activities"
                                 class="actRow">
                                <div class="iconWrap">
                                    <span :style="{backgroundColor: '#'+activitie.icon_color}" class="icon">{{activitie.icon_name}}</span>
                                </div>
                                <span class="desc">{{activitie.description}}</span>
                            </div>
                        </div>
                        <div @touchend.stop="toggleActivie(shop);" class="activityBtn">
                            <span>{{shop.activities.length}}个活动</span>
                            <svg :class="{open:shop.showAllActivities}">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                     xlink:href="#activity-more.c46fec1"></use>
                            </svg>
                        </div>
                    </section>
                </div>
            </router-link>
        </ul>
        <div v-for="fictitiou in fictitious_shop" style="height: 303px" class="fictitious_shop"></div>
    </section>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import {analysismageHash} from '../../common/js/util.js';
    import star from '@/components/star/star';

    export default {
        data() {
            return {};
        },
        computed: {
            fictitious_shop() {
                return 8 - this.shopList.length > 0 ? 8 - this.shopList.length : 0;
            }
        },
        props: {
            shopList: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            analysismageHash,
            toggleActivie(shop) {
                if ('showAllActivities' in shop) {
                    shop.showAllActivities = !shop.showAllActivities;
                } else {
                    Vue.set(shop, 'showAllActivities', true);
                }
            }
        },
        components: {
            star
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .shop_list {
        background: #fff url("./shopList.svg") repeat-y center center;
        background-size: 100% auto;
        .shop_container {
            position: relative;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            color: #666;
            padding: .4rem 0;
            padding: 4vw 0;
            list-style: none;
            font-size: .293333rem;
            line-height: normal;
            .shop_info {
                display: flex;
                justify-content: flex-start;
                align-items: stretch;
                padding: 0 .266667rem;
                padding: 0 2.666667vw;
                .logo_container {
                    position: relative;
                    flex: none;
                    .logo_main {
                        position: relative;
                        width: 1.733333rem;
                        width: 17.333333vw;
                        height: 1.733333rem;
                        height: 17.333333vw;
                        img {
                            box-sizing: border-box;
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: .053333rem;
                            border-radius: .533333vw;
                            border: 1px solid rgba(0, 0, 0, .08);
                        }
                    }
                    .new_shop {
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 50;
                        width: .853333rem;
                        width: 8.533333vw;
                        height: .853333rem;
                        height: 8.533333vw;
                        background-image: linear-gradient(135deg, #26ce61, #26ce61 50%, transparent 0);
                        font-size: .24rem;
                        span {
                            position: absolute;
                            top: .133333rem;
                            top: 1.333333vw;
                            left: .026667rem;
                            left: .266667vw;
                            display: block;
                            color: #fff;
                            font-weight: 700;
                            transform: rotate(-45deg);
                        }
                    }
                }
                .shop_main {
                    display: flex;
                    justify-content: space-between;
                    overflow: hidden;
                    flex-grow: 1;
                    flex-direction: column;
                    user-select: none;
                    padding-left: .266667rem;
                    padding-left: 2.666667vw;
                    .shop_info_line {
                        display: flex;
                        justify-content: space-between;
                        overflow: hidden;
                        align-items: center;
                        .shop_name {
                            display: flex;
                            margin: 0;
                            padding: 0;
                            color: #333;
                            font-size: .4rem;
                            overflow: hidden;
                            align-items: center;
                            .premium {
                                position: relative;
                                margin-right: .133333rem;
                                margin-right: 1.333333vw;
                                padding: .026667rem .066667rem;
                                padding: .266667vw .666667vw;
                                color: transparent;
                                text-align: center;
                                white-space: nowrap;
                                font-weight: 700;
                                font-size: .293333rem;
                                font-style: normal;
                                line-height: normal;
                                &:after {
                                    display: block;
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    z-index: 1;
                                    content: attr(content);
                                    padding: .053333rem .133333rem;
                                    padding: .533333vw 1.333333vw;
                                    color: #6f3f15;
                                    font-weight: 700;
                                    font-size: .586667rem;
                                    border-radius: .106667rem;
                                    border-radius: 1.066667vw;
                                    background-image: linear-gradient(-139deg, #fff100, #ffe339);
                                    white-space: nowrap;
                                    transform: scale(.5);
                                    transform-origin: 0 0;
                                }
                            }
                            .name {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: 700;
                            }
                        }
                        .support_wrapper {
                            display: flex;
                            margin-left: .266667rem;
                            margin-left: 2.666667vw;
                            li {
                                position: relative;
                                height: .346667rem;
                                height: 3.466667vw;
                                width: .346667rem;
                                width: 3.466667vw;
                                margin-left: .08rem;
                                margin-left: .8vw;
                                &:after {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    z-index: 1;
                                    font-size: .533333rem;
                                    color: #999;
                                    content: attr(content);
                                    border-radius: .026667rem;
                                    border-radius: .266667vw;
                                    width: .693333rem;
                                    width: 6.933333vw;
                                    height: .693333rem;
                                    height: 6.933333vw;
                                    line-height: normal;
                                    border: 1px solid #ddd;
                                    transform: scale(.5);
                                    transform-origin: 0 0;
                                }
                            }
                        }
                        .rate_wrap {
                            /*.rating_wrapper{*/
                            /*position: relative;*/
                            /*overflow: hidden;*/
                            /*display: inline-block;*/
                            /*vertical-align: middle;*/
                            /*}*/
                            display: flex;
                            align-items: center;
                            .shop_rate {
                                margin: 0 .106667rem;
                                margin: 0 1.066667vw;
                            }
                        }
                        .delivery_mode {
                            display: flex;
                            align-items: center;
                            .delivery_icon {
                                position: relative;
                                padding: 0 .04rem;
                                padding: 0 .4vw;
                                color: transparent;
                                white-space: nowrap;
                                font-size: .266667rem;
                                border: 1px solid transparent;
                                border-radius: .04rem;
                                border-radius: .4vw;
                                line-height: 1.2;
                                margin-left: .106667rem;
                                margin-left: 1.066667vw;
                                &:after {
                                    color: #fff;
                                    border: 1px solid #0097ff;
                                    background-image: linear-gradient(45deg, #0085ff, #0af);
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    z-index: 1;
                                    white-space: nowrap;
                                    content: attr(content);
                                    font-size: .533333rem;
                                    padding: 0 .053333rem;
                                    padding: 0 .533333vw;
                                    border-radius: .08rem;
                                    border-radius: .8vw;
                                    transform: scale(.5);
                                    transform-origin: 0 0;
                                }
                            }
                        }
                        .moneylimit {
                            display: flex;
                            align-content: center;
                        }
                        .timedistanceWrap {
                            display: flex;
                            align-items: center;
                            color: #999;
                        }
                    }
                }
            }
            .activity_wrap {
                padding-left: 2.266667rem;
                padding-left: 22.666667vw;
                .tagLine {
                    display: flex;
                    align-items: center;
                    margin: .266667rem .266667rem 0 0;
                    margin: 2.666667vw 2.666667vw 0 0;
                    .sourceTag {
                        display: -webkit-flex;
                        display: flex;
                        align-items: center;
                        font-size: .266667rem;
                        margin-right: .133333rem;
                        margin-right: 1.333333vw;
                        img {
                            height: .266667rem;
                            height: 2.666667vw;
                            width: .266667rem;
                            width: 2.666667vw;
                            margin-right: .08rem;
                            margin-right: .8vw;
                        }
                    }
                }
                .dashedline {
                    width: 100%;
                    height: .4rem;
                    height: 4vw;
                    padding-right: .266667rem;
                    padding-right: 2.666667vw
                }
                .activities {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-content: stretch;
                    overflow: hidden;
                    .activityList {
                        flex: 1;
                        padding-right: .266667rem;
                        padding-right: 2.666667vw;
                        overflow: hidden;
                        .actRow {
                            display: flex;
                            align-items: center;
                            font-size: .293333rem;
                            line-height: .48rem;
                            line-height: 4.8vw;
                            &:not(:first-child) {
                                margin-top: .066667rem;
                                margin-top: .666667vw;
                            }
                            .iconWrap {
                                position: relative;
                                margin-right: .16rem;
                                margin-right: 1.6vw;
                                height: .373333rem;
                                height: 3.733333vw;
                                width: .373333rem;
                                width: 3.733333vw;
                                .icon {
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    z-index: 1;
                                    line-height: .746667rem;
                                    line-height: 7.466667vw;
                                    height: .746667rem;
                                    height: 7.466667vw;
                                    width: .746667rem;
                                    width: 7.466667vw;
                                    font-size: .56rem;
                                    color: #fff;
                                    display: -webkit-flex;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: .106667rem;
                                    border-radius: 1.066667vw;
                                    transform: scale(.5);
                                    transform-origin: 0 0;
                                }
                            }
                            .desc {
                                flex: 1;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .activityBtn {
                        padding: .08rem .266667rem 0 0;
                        padding: .8vw 2.666667vw 0 0;
                        color: #999;
                        text-align: right;
                        font-size: .266667rem;
                        line-height: 1;
                        svg {
                            width: .173333rem;
                            width: 1.733333vw;
                            height: .173333rem;
                            height: 1.733333vw;
                            opacity: .9;
                            margin-left: .026667rem;
                            margin-left: .266667vw;
                            transition: all .3s ease-in-out;
                            transform: rotate(0);
                            fill: currentColor;
                            will-change: transform;
                            &.open {
                                transform: rotate3d(0, 0, 1, 180deg);
                                backface-visibility: hidden;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style rel="stylesheet/css" type="text/css" lang="less">
    .before_split:before, .after_split:after {
        margin: 0 .08rem;
        margin: 0 .8vw;
        color: #ddd;
        content: "|";
    }
</style>
