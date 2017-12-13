<template>
    <transition name="move">
        <div v-show="showFlag" ref="food" class="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="logo">
                    <div class="back" @click.stop.prevent="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <p class="desc">{{food.description}}</p>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率:{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">¥{{food.price}}</span><span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <article class="info" v-show="food.info">
                    <h2 class="title">商品介绍</h2>
                    <p class="text">{{food.info}}</p>
                </article>
                <split v-show="food.info"></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @changeFilter="changeFilter" :select-type="selectType" :only-content="onlyContent"
                                  :desc="desc"
                                  :ratings="food.ratings"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-bottom"
                                v-for="rating in food.ratings">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" :src="rating.avatar" alt="">
                                </div>
                                <div class="time">{{rating.rateTime | getTimeStr('YYYY-MM-DD hh:mm')}}</div>
                                <p class="text">
                                    <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import Bus from 'components/eventBus/eventBus';
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';

    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;

    export default {
        data() {
            return {
                showFlag: false,
                selectType: {
                    value: ALL
                },
                onlyContent: {
                    value: false
                },
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        props: {
            food: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        methods: {
            needShow(type, text) {
                if (this.onlyContent.value && !text) {
                    return false;
                }
                if (this.selectType.value === ALL) {
                    return true;
                } else {
                    return type === this.selectType.value;
                }
            },
            hide() {
                this.showFlag = false;
            },
            show() {
                this.showFlag = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.count && this.food.count !== 0) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                Bus.$emit('cart_add', event.target);
            },
            changeFilter() {
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        components: {
            cartcontrol,
            split,
            ratingselect
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    @import "../../common/style/mixin";

    .food {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 48px;
        background-color: #fff;
        overflow: hidden;
    }

    &.move-enter-active, &.move-leave-active {
        transition: all 0.2s;
        transform: translate3d(0, 0, 0);
    }

    &.move-enter, &.move-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 0;
            padding: 5px;
            .icon-arrow_lift {
                display: block;
                padding: 8px;
                background-color: rgba(0, 0, 0, .5);
                border-radius: 50%;
                font-size: 20px;
                color: #fff;
            }
        }
    }

    .content {
        padding: 18px;
        position: relative;
        .title {
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .desc {
            line-height: 1.2;
            font-size: 10px;
            margin-bottom: 8px;
        }
        .detail {
            margin-bottom: 18px;
            line-height: 10px;
            font-size: 0;
            .sell-count, .rating {
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
            .sell-count {
                margin-right: 12px;
            }
        }
        .price {
            line-height: 24px;
            font-weight: 700;
            margin-top: 6px;
            .now {
                font-size: 14px;
                margin-right: 8px;
                color: rgb(240, 20, 20);
            }
            .old {
                color: rgb(147, 153, 159);
                font-size: 10px;
                text-decoration: line-through;
            }
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 12px;
            bottom: 12px;
        }

        .buy {
            position: absolute;
            right: 14px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            font-size: 10px;
            color: #fff;
            border-radius: 12px;
            background-color: rgb(0, 160, 220);
        }

        .fade-enter-active, .fade-leave-active {
            opacity: 1;
            transition: all 0.3s;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }

    .info {
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .text {
            line-height: 24px;
            padding: 0 8px;
            font-size: 12px;
            color: rgb(77, 85, 93);
        }
    }

    .rating {
        padding-top: 18px;
        .title {
            line-height: 14px;
            margin-left: 18px;
            margin-right: 18px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                padding: 16px 0;
                .border-bottom ();
                .user {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    font-size: 0;
                    line-height: 12px;
                    .name {
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: top;
                        color: rgb(147, 153, 150);
                        font-size: 10px;
                    }
                    .avatar {
                        height: 12px;
                        width: 12px;
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .icon-thumb_down, .icon-thumb_up {
                    margin-right: 4px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
                .icon-thumb_up {
                    color: rgb(0, 160, 220);
                }
            }
            .no-rating{
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }

</style>
