<template>
    <section class="shop_detail scroller" @scroll="_listenCallback">
        <div class="section">
            <h3 class="section-title">配送信息</h3>
            <div class="delivery body">
                <div>
                    <span class="delivery_type"
                          v-if="shopInfo.delivery_mode.id===1">{{shopInfo.delivery_mode.text}}</span>
                    <span v-else-if="shopInfo.delivery_mode.id===2">由{{shopInfo.delivery_mode.text}}提供配送,</span>
                    <span>约{{shopInfo.order_lead_time}}分钟送达，距离{{(shopInfo.distance/1000).toFixed(1)}}km</span>
                </div>
                <div>配送费￥{{shopInfo.float_delivery_fee}}</div>
            </div>
        </div>
        <div class="section" v-if="shopInfo.activities.length">
            <h3 class="section-title">活动与服务</h3>
            <ul class="activity body">
                <li class="activity_item" v-for="activity in shopInfo.activities">
                    <span class="activity_icon" :style="{backgroundColor:'#'+activity.icon_color}">{{activity.icon_name}}</span>
                    <span class="activity_desc">{{activity.description}}</span>
                </li>
                <li class="support_item activity_item" v-for="support in shopInfo.supports">
                    <span class="activity_icon"
                          :style="{color:'#'+support.icon_color, borderColor:'#'+support.icon_color}">{{support.icon_name}}</span>
                    <span class="activity_desc">{{support.description}}</span>
                </li>
            </ul>
        </div>
        <div class="section" v-if="shopInfo.albums&&shopInfo.albums.length">
            <h3 class="section-title">商家实景</h3>
            <ul class="album body">
                <li class="album_item" v-for="album in shopInfo.albums">
                    <img :src="analysismageHash(album.cover_image_hash,true,200)"/>
                    <span class="album_title">{{album.name}}({{album.count}}张)</span>
                </li>
            </ul>
        </div>
        <div class="section">
            <h3 class="section-title">商家信息</h3>
            <ul class="detail">
                <li class="detail_item">{{shopInfo.description||'暂无简介'}}</li>
                <li class="detail_item" v-if="shopInfo.phone">
                    <span>商家电话</span>
                    <span>
                        <a :href="'tel:'+shopInfo.phone.split(' ')[0]">{{shopInfo.phone.split(' ')[0]}}</a><svg class="arrow-right">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </li>
                <li v-if="shopInfo.address" class="detail_item"><span>地址</span><span>{{shopInfo.address}}</span></li>
                <li class="detail_item">
                    <span>营业时间</span>
                    <span>
                        &nbsp;<span v-if="shopInfo.opening_hours.length" v-for="hour in shopInfo.opening_hours">{{hour.replace('/','-')}}</span>
                    </span>
                </li>
            </ul>
        </div>
        <div class="section">
            <a :href="`https://h5.ele.me/shop/certification/#/?restaurant_id=${shopInfo.authentic_id}&realId=${shopInfo.id}`" class="section-title certification">
                营业资质
                <svg class="arrow-right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </a>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';

    export default {
        name: "",
        data() {
            return {};
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
            analysismageHash,
            _listenCallback(event) {
                window.throttle2(() => {
                    this._scrollCallback(event);
                });
            },
            _scrollCallback(event) {
                let scrollTop = event.target.scrollTop;
                this.$emit("containerScroll", scrollTop, 'detail');
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .shop_detail {
        /*height: 100%;*/
        box-sizing: border-box;
        .section {
            margin-bottom: .266667rem;
            margin-bottom: 2.666667vw;
            padding: .426667rem .4rem .4rem;
            padding: 4.266667vw 4vw 4vw;
            font-size: .346667rem;
            background-color: #fff;
            color: #666;
            border-bottom: 1px solid #eee;
            .section-title {
                color: #000;
                font-weight: 700;
                font-size: .4rem;
                line-height: .56rem;
                line-height: 5.6vw;
            }
            .certification {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .body {
                margin-top: .426667rem;
                margin-top: 4.266667vw;
            }
            .delivery {
                > div {
                    margin-bottom: .186667rem;
                    margin-bottom: 1.866667vw;
                }
                .delivery_type {
                    width: 1.386667rem;
                    width: 13.866667vw;
                    font-size: .293333rem;
                    margin-right: .266667rem;
                    margin-right: 2.666667vw;
                    display: inline-block;
                    text-align: center;

                    color: #fff;
                    background-color: #0097ff;
                    padding: .08rem 0;
                    padding: .8vw 0;
                    border-radius: .08rem;
                    border-radius: .8vw;
                }
            }
            .activity {
                .activity_item {
                    display: flex;
                    font-size: .346667rem;
                    margin-bottom: .306667rem;
                    margin-bottom: 3.066667vw;
                    align-items: flex-start;
                    .activity_icon {
                        margin-right: .16rem;
                        margin-right: 1.6vw;
                        font-size: .24rem;
                        font-style: normal;
                        padding: .053333rem .12rem;
                        padding: .533333vw 1.2vw;
                        /*line-height: .346667rem;*/
                        /*line-height: 3.466667vw;*/
                        /*height: .346667rem;*/
                        /*height: 3.466667vw;*/
                        display: inline-block;
                        box-sizing: border-box;
                        text-align: center;
                        border-radius: .026667rem;
                        border-radius: .266667vw;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;

                        height: .426667rem;
                        height: 4.266667vw;
                        line-height: .426667rem;
                        line-height: 4.266667vw;
                        margin-top: .04rem;
                        margin-top: .4vw;
                        font-size: .32rem;
                        padding: .053333rem .16rem;
                        padding: .533333vw 1.6vw;
                    }
                    .activity_desc {
                        flex: 1;
                        /*font-size: .293333rem;*/
                        font-size: .346667rem;
                        line-height: 1.38;
                    }
                }
                .support_item {
                    .activity_icon {
                        border: 1px solid rgb(153, 153, 153);
                    }
                }
            }
            .album {
                overflow-x: auto;
                font-size: 0;
                white-space: nowrap;
                .album_item {
                    display: inline-block;
                    position: relative;
                    /*float: left;*/
                    overflow: hidden;
                    margin-right: .186667rem;
                    margin-right: 1.866667vw;
                    width: 2.08rem;
                    width: 20.8vw;
                    height: 2.08rem;
                    height: 20.8vw;
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    .album_title {
                        display: block;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        text-align: center;
                        height: .48rem;
                        height: 4.8vw;
                        line-height: .48rem;
                        line-height: 4.8vw;
                        font-size: .346667rem;
                        color: #eee;
                        background-color: rgba(0, 0, 0, .6);
                    }
                }
            }
            .detail {
                .detail_item {
                    display: flex;
                    padding: .4rem 0;
                    padding: 4vw 0;
                    justify-content: space-between;
                    align-items: center;

                    font-size: .346667rem;
                    /*margin-right: -.4rem;*/
                    /*margin-right: -4vw;*/
                    &:not(:first-child) {
                        border-top: 1px solid #ddd;
                    }
                    &:last-child {
                        padding-bottom: 0;
                    }
                    > span:first-child {
                        flex: 1;
                        font-weight: 700;
                        color: #333;
                        min-width: 4em;
                        display: inline-block;
                    }
                    > span:last-child {
                        flex: 3;
                        max-width: 6.666667rem;
                        max-width: 66.666667vw;
                        text-align: right;
                    }
                }
            }
        }
        .arrow-right {
            width: .4rem;
            width: 4vw;
            height: .4rem;
            height: 4vw;
            fill: #ccc;
            vertical-align: middle;
        }
    }
</style>
