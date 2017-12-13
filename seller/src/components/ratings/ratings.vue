<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.serviceScore"></star>
                        </div>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.foodScore"></star>
                        </div>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @changeFilter="changeFilter" :select-type="selectType" :only-content="onlyContent"
                          :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" class="rating-item border-bottom" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" alt="头像">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | getTimeStr('YYYY-MM-DD hh:mm')}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from 'components/star/star';
    import ratingselect from 'components/ratingselect/ratingselect';
    import split from 'components/split/split';
    import BScroll from 'better-scroll';

    const ALL = 2;
    export default {
        data() {
            return {
                ratings: [],
                selectType: {
                    value: ALL
                },
                onlyContent: {
                    value: false
                }
            };
        },
        props: {
            seller: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },

        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$ajax.get('/api/shop/ratings').then((res) => {
                    if (res.data.status) {
                        this.ratings = res.data.body;
                        this.$nextTick(() => {
                            this.scroll = new BScroll(this.$refs.ratings, {
                                click: true
                            });
                        });
                    }
                }).catch((err) => {
                    console.log('ratings 错误' + err);
                });
            },
            changeFilter() {
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(type, text) {
                if (this.onlyContent.value && !text) {
                    return false;
                }
                if (this.selectType.value === ALL) {
                    return true;
                } else {
                    return type === this.selectType.value;
                }
            }
        },
        components: {
            star,
            ratingselect,
            split
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    @import "../../common/style/mixin";

    .ratings {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                width: 137px;
                padding: 6px 0;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank {
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left: 6px;
                }
                .score-wrapper {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        vertical-align: top;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .star-wrapper {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                        @media only screen and (max-width: 320px) {
                            margin: 0 8px;
                        }
                    }
                    .score {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    line-height: 18px;
                    .title {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .delivery {
                        font-size: 12px;
                        margin-left: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item{
                display: flex;
                margin: 18px 0;
                .border-bottom();
            }
            .avatar{
                flex: 0 0 28px;
                width: 28px;
                img{
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                }
            }
            .content{
                position: relative;
                padding-left: 12px;
                flex: 1;
                .name{
                    line-height: 12px;
                    margin-bottom: 4px;
                    font-size: 10px;
                    color: rgb(7,17,27);
                }
                .star-wrapper{
                    margin-bottom: 6px;
                    font-size: 0;
                    .star,.delivery{
                        margin-right: 6px;
                        display: inline-block;
                        vertical-align: top;
                    }
                    .delivery{
                        color: rgb(147,153,159);
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
                .text{
                    line-height: 18px;
                    font-size: 12px;
                    margin-bottom: 8px;
                    color: rgb(7,17,27);


                }
                .recommend{
                    line-height: 16px;
                    font-size: 0;
                    .icon-thumb_up,.item{
                        margin: 0 8px 4px 0;
                        display: inline-block;
                        font-size: 9px;
                    }
                    .icon-thumb_up{
                        color: rgb(0,160,220);
                    }
                    .item{
                        padding: 0 6px;
                        border: 1px solid rgba(7,17,27,.1);
                        border-radius:1px;
                        color: rgb(147,153,159);
                        background: #fff;
                    }
                }
                .time{
                    position: absolute;
                    top: 0;
                    right: 0;
                    line-height: 12px;
                    color: rgb(147,153,159);
                    font-size: 10px;
                }
            }
        }
    }
</style>
