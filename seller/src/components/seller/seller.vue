<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <div class="desc border-bottom">
                    <div class="title">{{seller.name}}</div>
                    <div class="star-wrapper">
                        <star :size="36" :score="seller.score"></star>
                    </div>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favorite?"已":""}}收藏</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-bottom">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-bottom" v-for="item in seller.supports">
                        <span class="icon" :class="'type_'+item.type"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="实景">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item border-top" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from 'components/star/star';
    import split from 'components/split/split';
    import BScroll from 'better-scroll';
    import {setLocalSeller, getLocalSeller} from '../../common/js/localStorage';

    export default {
        data() {
            return {
                favorite: getLocalSeller(this.seller.id, 'favorite', false)
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
        // computed: {
        //     favoriteText() {
        //         return this.favorite ? '已收藏' : '收藏商家';
        //     }
        // },
        updated() {
            this._initScroll();
            this._initPics();
        },
        mounted() {
            this._initScroll();
            this._initPics();
        },
        methods: {
            toggleFavorite(event) {
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                setLocalSeller(this.seller.id, 'favorite', this.favorite);
            },
            _initScroll() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.seller, {click: true});
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            _initPics() {
                if (this.seller.pics) {
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - margin;
                    this.$refs.picList.style.width = width + 'px';
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'verticcal'
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    });
                }
            }
        },
        components: {
            star,
            split
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    @import "../../common/style/mixin";

    .seller {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            padding: 18px;
            .title {
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .desc {
                .border-bottom();
                padding-bottom: 18px;
                font-size: 0;
                .star-wrapper {
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 8px;
                }
                .text {
                    display: inline-block;
                    margin-right: 12px;
                    vertical-align: top;
                    font-size: 10px;
                    color: rgb(77, 85, 93);
                    line-height: 18px;
                }
            }
            .remark {
                display: flex;
                padding-top: 18px;
                .block {
                    flex: 1;
                    text-align: center;
                    &:nth-child(2) {
                        border-left: 1px solid rgba(7, 17, 27, .1);
                        border-right: 1px solid rgba(7, 17, 27, .1);
                    }
                    h2 {
                        margin-bottom: 4px;
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(147, 153, 159);
                    }
                    .content {
                        line-height: 24px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                        .stress {
                            font-size: 24px;
                            font-weight: normal;
                        }
                    }
                }
            }
            .favorite {
                position: absolute;
                top: 18px;
                right: 18px;
                text-align: center;
                min-width: 40px;
                .icon-favorite {
                    display: block;
                    margin-bottom: 4px;
                    color: #d4d6d9;
                    line-height: 24px;
                    font-size: 24px;
                    &.active {
                        color: rgb(240, 20, 20);
                    }
                }
                .text {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(77, 85, 93);
                }
            }
        }
        .bulletin {
            padding: 18px 18px 0 18px;
            .title {
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .content-wrapper {
                padding: 0 12px 16px 12px;
                .border-bottom();
                .content {
                    line-height: 24px;
                    font-size: 12px;
                    color: rgb(240, 20, 20);
                }
            }
            .supports {
                margin: 0 auto;
                .support-item {
                    padding: 16px 12px;
                    font-size: 0;
                    .border-bottom();
                    &:last-child {
                        margin-bottom: 0;
                        .border-none();
                    }
                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 16px;
                        height: 16px;
                        margin-right: 6px;
                        background-size: cover;
                        background-repeat: no-repeat;
                        &.type_0, &.decrease {
                            .bg-image('./decrease_4@2x.png', './decrease_4@3x.png')
                        }
                        &.type_1, &.discount {
                            .bg-image('./discount_4@2x.png', './discount_4@3x.png')
                        }
                        &.type_2, &.special {
                            .bg-image('./special_4@2x.png', './special_4@3x.png')
                        }
                        &.type_3, &.invoice {
                            .bg-image('./invoice_4@2x.png', './invoice_4@3x.png')
                        }
                        &.type_4, &.guarantee {
                            .bg-image('./guarantee_4@2x.png', './guarantee_4@3x.png')
                        }
                    }
                    .text {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        line-height: 16px;
                    }
                }
            }
        }
        .pics {
            padding: 18px;
            color: rgb(7, 17, 27);
            .title {
                margin-bottom: 12px;
                line-height: 14px;
                color: #07111b;
                font-size: 14px;
            }
            .pic-wrapper {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                .pic-list {
                    font-size: 0;
                    .pic-item {
                        display: inline-block;
                        margin-right: 6px;
                        width: 120px;
                        height: 90px;
                        &:last-child {
                            margin: 0;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .info {
            padding: 18px;
            color: rgb(7, 17, 27);
            .title {
                padding-bottom: 12px;
                line-height: 14px;
                color: #07111b;
                font-size: 14px;
            }
            .info-item {
                line-height: 16px;
                padding: 16px 12px;
                font-size: 12px;
                font-weight: 200;
                .border-top();
            }
        }
    }
</style>
