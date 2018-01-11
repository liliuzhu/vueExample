<template>
    <transition name="fade">
        <section class="food_detail mask" v-if="state" @click="hide">
            <!--<div class="mask" @click="hide"></div>-->
            <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :autoFill="false"
                         ref="loadmore">
            </mt-loadmore>-->
            <div class="foodpanel" @click.stop.prevent @touchstart="touchStart">
                <div class="panelClose">下拉关闭</div>
                <div class="foodimg" :class="{foodimg_shadow:food.description}">
                    <img :src="analysismageHash(food.image_path,true,750)">
                    <p class="desc">
                        {{food.description}}
                    </p>
                </div>
                <div class="food_info">
                    <div class="food_name">
                        <foodAttributes class="attrTag" :foodAttributes="food.attributes"></foodAttributes>
                        <p :content="food.name" class="name_content">{{food.name}}</p>
                        <foodAttributes class="attrTag1" :mode="1"
                                        :foodAttributes="food.attributes"></foodAttributes>
                    </div>
                    <div class="food_sales">
                        <span v-if="food.month_sales">月售{{food.month_sales}}份</span>
                        <span v-if="food.satisfy_rate">好评率{{food.satisfy_rate}}%</span>
                    </div>
                    <foodActivity :mode="1" :food="food"></foodActivity>
                    <foodPrice class="foodPrice" :food="food"></foodPrice>
                    <div class="cartButton">
                        <foodCountControl :food="food"></foodCountControl>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';
    import foodCountControl from '@/components/foodCountControl/foodCountControl';
    import foodAttributes from './foodAttributes';
    import foodPrice from './foodPrice';
    import foodActivity from './foodActivity';
    import Bus from '@/components/eventBus/eventBus';

    export default {
        data() {
            return {
                food: {},
                state: false
            };
        },
        mounted() {
            Bus.$on('select_food_spec', this.hide);
        },
        beforeDestroy() {
            Bus.$off('select_food_spec', this.show);
        },
        methods: {
            analysismageHash,
            hide() {
                this.state = false;
            },
            show(food) {
                if (!food) {
                    return;
                }
                this.food = food;
                this.state = true;
            },
            touchStart(event) {
                let startY = event.touches[0].pageY;
                let nowY = startY;
                let el = event.currentTarget;
                let titleEl = el.firstElementChild;
                let touchmove = (e) => {
                    nowY = e.touches[0].pageY;
                    let diff = (nowY - startY) / 4;
                    el.style.transform = `translate3d(0,${diff}px,0)`;
                    if (diff > 30) {
                        titleEl.style.opacity = '1';
                        titleEl.innerHTML = '释放关闭';
                    } else {
                        titleEl.style.opacity = '0.706207';
                        titleEl.innerHTML = '下拉关闭';
                    }
                };
                let touchend = (e) => {
                    let diff = (nowY - startY) / 4;
                    if (diff > 30) {
                        this.hide();
                    }
                    el.removeEventListener('touchmove', touchmove);
                    el.removeEventListener('touchend', touchend);
                    el.style.cssText = '';
                    titleEl.style.cssText = '';
                };
                el.addEventListener('touchmove', touchmove);
                el.addEventListener('touchend', touchend);
            }
        },
        components: {
            foodAttributes,
            foodPrice,
            foodActivity,
            foodCountControl
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
        opacity: 1;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .food_detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        backdrop-filter: blur(.133333rem);
        backdrop-filter: blur(1.333333vw);
        justify-content: center;
        align-items: center;
        .foodpanel {
            position: relative;
            background-color: #fff;
            box-shadow: 0 .013333rem .08rem 0 rgba(0, 0, 0, .1);
            box-shadow: 0 .133333vw .8vw 0 rgba(0, 0, 0, .1);
            width: 8.533333rem;
            width: 85.333333vw;
            height: 11.413333rem;
            height: 114.133333vw;
            border-radius: .106667rem;
            border-radius: 1.066667vw;
            z-index: 13;
            flex-direction: column;
            .panelClose {
                position: absolute;
                top: -.794667rem;
                top: -7.946667vw;
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                opacity: 0;
                font-size: 0.333334rem;
            }
            .foodimg {
                width: 100%;
                height: 8.533333rem;
                height: 85.333333vw;
                display: block;
                overflow: hidden;
                position: relative;
                border-radius: .106667rem .106667rem 0 0;
                border-radius: 1.066667vw 1.066667vw 0 0;
                background: #fff url('./food_detail.jpeg') no-repeat center center;
                background-size: cover;
                &.foodimg_shadow {
                    &:before {
                        content: "";
                        display: block;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 3.2rem;
                        height: 32vw;
                        background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, .3)));
                        background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, .3));
                        background: linear-gradient(transparent, rgba(0, 0, 0, .3));
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    -o-object-fit: contain;
                    object-fit: contain;
                }
                .desc {
                    font-size: .293333rem;
                    color: #ddd;
                    letter-spacing: 0;
                    line-height: .373333rem;
                    line-height: 3.733333vw;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 0 .333333rem .266667rem;
                    padding: 0 3.333333vw 2.666667vw;
                }
            }
            .food_info {
                position: relative;
                padding: .4rem .4rem 0;
                padding: 4vw 4vw 0;
                width: 100%;
                height: 2.933333rem;
                height: 29.333333vw;
                .food_name {
                    position: relative;
                    display: flex;
                    align-items: center;
                    margin-bottom: .133333rem;
                    margin-bottom: 1.333333vw;
                    .name_content {
                        position: relative;
                        width: 4.8rem;
                        width: 48vw;
                        height: .426667rem;
                        height: 4.266667vw;
                        font-size: 0;
                        &:after {
                            position: absolute;
                            left: 0;
                            top: 0;
                            content: attr(content);
                            display: block;
                            width: 9.6rem;
                            width: 96vw;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-size: .746667rem;
                            color: #333;
                            line-height: .853333rem;
                            line-height: 8.533333vw;
                            font-weight: 700;
                            transform: scale(.5);
                            transform-origin: 0 0;
                        }
                    }
                }
                .food_sales {
                    font-size: .293333rem;
                    color: #666;
                    line-height: .293333rem;
                    line-height: 2.933333vw;
                    margin-bottom: .16rem;
                    margin-bottom: 1.6vw;
                }
                .attrTag {
                    margin-right: .133333rem;
                    margin-right: 1.333333vw;
                }
                .attrTag1 {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                .foodPrice {
                    position: absolute;
                    bottom: .453333rem;
                    bottom: 4.533333vw;
                }
                .cartButton {
                    position: absolute;
                    bottom: .453333rem;
                    bottom: 4.533333vw;
                    right: 1em;
                }
            }
        }
    }
</style>
