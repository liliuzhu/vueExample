<template>
    <div class="shop_header">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 10 8" id="svip-crown">
                    <path fill="#F2DD7D" fill-rule="evenodd"
                          d="M7.11 2.688L5.143.072a.177.177 0 0 0-.286 0L2.89 2.69a.709.709 0 0 1-.991.152L.286 1.662a.177.177 0 0 0-.253.044.193.193 0 0 0-.03.14L.97 7.505a.37.37 0 0 0 .287.302c1.261.259 6.238.259 7.48 0a.37.37 0 0 0 .285-.301l.975-5.67a.187.187 0 0 0-.147-.218.177.177 0 0 0-.137.032L8.104 2.838a.709.709 0 0 1-.994-.15z"></path>
                </symbol>
                <symbol viewBox="0 0 13 10" id="svip-icon">
                    <defs>
                        <linearGradient id="svip-icon_a" x1="100%" x2="0%" y1="50%" y2="50%">
                            <stop offset="0%" stop-color="#FDBD05"></stop>
                            <stop offset="100%" stop-color="#FFDB72"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#svip-icon_a)" fill-rule="evenodd"
                          d="M9.354 3.36L6.894.09a.222.222 0 0 0-.357 0l-2.46 3.273a.886.886 0 0 1-1.24.19L.823 2.076a.222.222 0 0 0-.316.055.24.24 0 0 0-.038.177l1.21 7.07c.032.19.174.34.358.378 1.576.324 7.797.324 9.35.001a.462.462 0 0 0 .356-.377l1.219-7.088a.234.234 0 0 0-.183-.272.22.22 0 0 0-.172.04l-2.012 1.486a.886.886 0 0 1-1.241-.187z"></path>
                </symbol>
            </defs>
        </svg>
        <nav class="shop_lintel" :style="{backgroundImage:'url('+analysismageHash2(shopInfo.image_path)+')'}">
            <i class="back ele-icon-arrow_lift" @touchend="back"></i>
        </nav>
        <div class="shop_info">
            <img class="logo_icon"
                 :src="analysismageHash(shopInfo.image_path,true,130)"
                 :alt="shopInfo.name">
            <div class="shop_desc" @click="()=>{$refs.briefShopInfo.show()}">
                <h2 class="shop_name">
                    <i class="brand" v-if="shopInfo.is_premium">品牌</i>
                    <span class="name zhu_ellipsis">{{shopInfo.name}}</span>
                    <i class="triangle"></i>
                </h2>
                <div class="other_info">
                    <span>{{shopInfo.rating}}</span>
                    <span>月售{{shopInfo.recent_order_num}}单</span>
                    <span>{{shopInfo.delivery_mode&&shopInfo.delivery_mode.text}} 约{{shopInfo.order_lead_time}}分钟</span>
                    <span>距离{{(shopInfo.distance/1000).toFixed(1)}}km</span>
                </div>
                <p class="shop_desc">{{shopInfo.promotion_info||noticeTemplate}}</p>
            </div>
        </div>
        <div class="shop_activities" v-if="shopInfo.activities&&shopInfo.activities.length"
             @click="()=>{$refs.activitySheet.show()}">
            <div class="activity_item">
                <span class="activity_icon" :style="{backgroundColor:'#'+shopInfo.activities[0].icon_color}">{{shopInfo.activities[0].icon_name}}</span>
                <span class="activity_desc zhu_ellipsis">{{shopInfo.activities[0].description}}</span>
            </div>
            <div class="activities_count">{{shopInfo.activities.length}}个优惠</div>
        </div>
        <div class="hongbao">
            <a class="packet" :class="{vip:packet.type===1}" v-for="packet in hongBao" @click="()=>{$refs.hongBaoSheet.show()}">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svip-icon"></use>
                </svg>
                <p class="red_packets_type" v-html="packet.description.replace(packet.value,`<span class='number'>${packet.value}</span>`)"></p>
                <button>领取</button>
            </a>
        </div>
        <briefShopInfo ref="briefShopInfo" :shopInfo="shopInfo"></briefShopInfo>
        <activitySheet ref="activitySheet" :activities="shopInfo.activities"></activitySheet>
        <hongBaoSheet ref="hongBaoSheet" :location="location"></hongBaoSheet>
    </div>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';
    import briefShopInfo from './briefShopInfo';
    import activitySheet from './activitySheet';
    import hongBaoSheet from './hongBaoSheet';

    export default {
        data() {
            return {
                noticeTemplate: '欢迎光临，用餐高峰期请提前下单，谢谢。'
            };
        },
        props: {
            shopInfo: {
                type: Object,
                required: true
            },
            hongBao: {
                type: Array,
                required: true
            },
            location: {
                type: Object,
                required: true
            }

        },
        methods: {
            analysismageHash,
            analysismageHash2(imageHash = "") {
                let hash = imageHash;
                let extension = imageHash.slice(-4) === 'jpeg' ? imageHash.slice(-4) : imageHash.slice(-3);
                return `https://fuss10.elemecdn.com/${hash.substr(0, 1)}/${hash.substr(1, 2)}/${hash.slice(3)}.${extension}?imageMogr/format/webp/thumbnail/!40p/blur/50x40/`;
            },
            back() {
                this.$router.back();
            }
        },
        components: {
            briefShopInfo,
            activitySheet,
            hongBaoSheet
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .shop_header {
        position: relative;
        padding-bottom: .213333rem;
        padding-bottom: 2.133333vw;
        color: #333;
        font-size: .293333rem;
        background-color: #fff;
        width: 100%;
        .shop_lintel {
            background-size: cover;
            background-repeat: no-repeat;
            padding: .106667rem .266667rem;
            padding: 1.066667vw 2.666667vw;
            height: 1.6rem;
            height: 16vw;
            display: flex;
            align-items: justify;
            position: relative;
            &:before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(119, 103, 137, .43);
            }
            .back {
                color: #fff;
                position: absolute;
                width: .666667rem;
                width: 6.666667vw;
                height: .666667rem;
                height: 6.666667vw;
                line-height: 6.666667vw;
                font-size: .5rem;
            }
        }
        .shop_info {
            padding: .8rem .4rem 0;
            padding: 8vw 4vw 0;
            position: relative;
            display: flex;
            background-color: #fff;
            text-align: center;
            .logo_icon {
                width: 1.733333rem;
                width: 17.333333vw;
                height: 1.733333rem;
                height: 17.333333vw;
                border-radius: .053333rem;
                border-radius: .533333vw;
                box-shadow: 0 0 .04rem 0 rgba(0, 0, 0, .2);
                box-shadow: 0 0 .4vw 0 rgba(0, 0, 0, .2);
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -1rem;
                margin-left: -10vw;
                margin-top: -1.2rem;
                margin-top: -12vw;
            }
            .shop_desc {
                flex: 1;
                width: 7.2rem;
                width: 72vw;
                .shop_name {
                    margin: 0;
                    font-size: .546667rem;
                    line-height: 1.2em;
                    font-weight: 700;
                    white-space: nowrap;
                    position: relative;
                    padding-right: .266667rem;
                    padding-right: 2.666667vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .brand {
                        margin-right: .16rem;
                        margin-right: 1.6vw;
                        border-radius: .026667rem;
                        border-radius: .266667vw;
                        background-image: -webkit-gradient(linear, left top, right top, from(#fff100), to(#ffe339));
                        background-image: -webkit-linear-gradient(left, #fff100, #ffe339);
                        background-image: linear-gradient(90deg, #fff100, #ffe339);
                        color: #6a3709;
                        font-style: normal;
                        padding: .08rem;
                        padding: .8vw;
                        font-weight: 700;
                        font-size: .32rem;
                        line-height: .32rem;
                        line-height: 3.2vw;
                        display: inline-block;
                    }
                    .name {
                        font-weight: 700;
                    }
                    .triangle {
                        width: .4rem;
                        width: 4vw;
                        position: relative;
                        height: .653333rem;
                        height: 6.533333vw;
                        &:after {
                            content: "";
                            border-style: solid;
                            border-width: .146667rem 0 .146667rem .173333rem;
                            border-width: 1.466667vw 0 1.466667vw 1.733333vw;
                            border-color: transparent transparent transparent rgba(0, 0, 0, .67);
                            position: absolute;
                            left: .16rem;
                            left: 1.6vw;
                            top: .213333rem;
                            top: 2.133333vw;
                        }
                    }
                }
                .other_info {
                    white-space: nowrap;
                    height: .32rem;
                    height: 3.2vw;
                    margin-top: .173333rem;
                    margin-top: 1.733333vw;
                    font-size: .293333rem;
                    color: #333;
                    > span:not(:last-child):after {
                        content: " \B7 ";
                        opacity: .2;
                    }
                }
                .shop_desc {
                    width: 5.813333rem;
                    width: 58.133333vw;
                    font-size: .293333rem;
                    font-weight: 300;
                    color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin: .226667rem auto .266667rem;
                    margin: 2.266667vw auto 2.666667vw;
                    padding: 0;
                    white-space: nowrap;
                }
            }
        }
        .shop_activities {
            display: flex;
            border-radius: 1px;
            border: 1px solid #eee;
            padding: .133333rem .213333rem;
            padding: 1.333333vw 2.133333vw;
            font-size: .293333rem;
            color: #666;
            margin: 0 .64rem;
            margin: 0 6.4vw;
            align-items: center;
            .activities_count {
                width: 1.626667rem;
                width: 16.266667vw;
                -webkit-flex-shrink: 0;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                position: relative;
                padding-right: .293333rem;
                padding-right: 2.933333vw;
                text-align: right;
                &:after {
                    content: "";
                    display: block;
                    border-style: solid;
                    border-width: .106667rem .093333rem 0;
                    border-width: 1.066667vw .933333vw 0;
                    border-color: rgba(0, 0, 0, .57) transparent transparent;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0;
                }
            }
        }
        .hongbao {
            display: flex;
            justify-content: center;
            margin-top: .213333rem;
            margin-top: 2.133333vw;
            .packet {
                display: inline-block;
                padding: 0 .16rem 0 .2rem;
                padding: 0 1.6vw 0 2vw;
                height: .64rem;
                height: 6.4vw;
                line-height: .64rem;
                line-height: 6.4vw;
                background: #fff4f4;
                color: #5c1603;
                font-size: .293333rem;
                font-weight: 700;
                border: .013333rem solid #fde6e3;
                border: .133333vw solid #fde6e3;
                &.vip{
                    background: #fff8d7;
                    border: .013333rem solid #e6d992;
                    border: .133333vw solid #e6d992;
                    > svg {
                        display: inline-block;
                    }
                }
                &:not(:first-child){
                    margin-left: .16rem;
                    margin-left: 1.6vw;
                }
                > svg {
                    display: none;
                    margin-right: .066667rem;
                    margin-right: .666667vw;
                    width: .333333rem;
                    width: 3.333333vw;
                    height: .266667rem;
                    height: 2.666667vw;
                }
                .red_packets_type {
                    position: relative;
                    display: inline-block;
                    padding-right: .186667rem;
                    padding-right: 1.866667vw;
                    font-weight: 700;
                    &:after, &:before {
                        content: "";
                        position: absolute;
                        right: 0;
                        width: .133333rem;
                        width: 1.333333vw;
                        height: .066667rem;
                        height: .666667vw;
                        background: #f5f5f5;
                        transform: translateX(50%);
                        z-index: 10;
                        border-top: .013333rem solid #f5f5f5;
                        border-top: .133333vw solid #f5f5f5;
                    }
                    &:before {
                        bottom: -.013333rem;
                        bottom: -.133333vw;
                        border-radius: .133333rem .133333rem 0 0;
                        border-radius: 1.333333vw 1.333333vw 0 0;
                    }
                    &:after {
                        top: -.013333rem;
                        top: -.133333vw;
                        border-radius: 0 0 .133333rem .133333rem;
                        border-radius: 0 0 1.333333vw 1.333333vw;
                    }
                }
                button {
                    padding-left: .16rem;
                    padding-left: 1.6vw;
                    color: #5c1704;
                    font-weight: 700;
                    background: transparent;
                    outline: 0;
                    border: none;
                    font-size: inherit;
                    font-family: inherit;
                }
            }
        }
    }
</style>
<style rel="stylesheet/css" type="text/css" lang="less">
    .activity_item {
        flex: 1;
        overflow: hidden;
        display: flex;
        font-size: .346667rem;
        align-items: center;
        .activity_desc {
            flex: 1;
            font-size: .293333rem;
        }
        .activity_icon {
            margin-right: .16rem;
            margin-right: 1.6vw;
            font-size: .24rem;
            font-style: normal;
            padding: .053333rem .12rem;
            padding: .533333vw 1.2vw;
            line-height: .346667rem;
            line-height: 3.466667vw;
            height: .346667rem;
            height: 3.466667vw;
            box-sizing: border-box;
            text-align: center;
            border-radius: .026667rem;
            border-radius: .266667vw;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
    }
    .packet{
        .red_packets_type{
            > .number {
                font-size: .346667rem;
                color: #ff5339;
                font-weight: 700;
                &:after {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0;
                    content: "";
                    height: .466667rem;
                    height: 4.666667vw;
                    opacity: .2;
                    border: 1px dashed #594519;
                }
            }
        }
        &.vip .red_packets_type{
            > .number {
                color: #594519;
            }
        }
    }
</style>
