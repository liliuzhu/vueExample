<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <transition type="animation" name="shake" @after-leave="afterLeave">
                    <div v-show="animationClass" class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="icon-shopping_cart"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                </transition>
                <div class="price" :class="{'highlight':totalPrice>0}">¥ {{totalPrice}}</div>
                <div class="desc">另需配送费¥ {{deliveryPrice}}</div>
            </div>
            <div class="content-right">
                <div class="pay" @click.stop.preven="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition-group name="drap" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" tag="div"
                          class="ball-container">
            <div :key="index" v-for="(ball,index) in balls" class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
            </div>
        </transition-group>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>¥ {{food.price*food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="mask">
            <div class="list-mask" @click="fold=false" v-show="listShow"></div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import Bus from 'components/eventBus/eventBus';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import BScroll from 'better-scroll';

    export default {
        data() {
            return {
                balls: [
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],
                dropBalls: [],
                fold: true,
                animationClass: true
            };
        },
        mounted() {
            Bus.$on('cart_add', this.drap);
        },
        // 最好在组件销毁前
        // 清除事件监听
        beforeDestroy() {
            Bus.$off('cart_add', this.drap);
        },
        components: {
            cartcontrol
        },
        computed: {
            listShow() {
                if (!this.totalCount) {
                    this.fold = false;
                    return false;
                }
                let show = this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            },
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.count;
                });
                return total;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差¥${diff}起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                return this.totalPrice < this.minPrice ? 'not-enough' : 'enough';
            }
        },
        methods: {
            pay() {
                if (this.totalPrice >= this.minPrice) {
                    alert(`支付${this.totalPrice}元`);
                }
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            toggleList() {
                if (this.totalCount > 0) {
                    this.fold = !this.fold;
                }
            },
            drap(el) {
                /*
                体验优化，异步执行下落动画
                */
                this.$nextTick(() => {
                    for (let i = 0; i < this.balls.length; i++) {
                        let ball = this.balls[i];
                        if (!ball.show) {
                            ball.show = true;
                            ball.el = el;
                            this.dropBalls.push(ball);
                            return 0;
                        }
                    }
                });
            },
            beforeEnter(el) {
                // console.log(el);
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 25 + 5;
                        let y = -(window.innerHeight - rect.top - 25 - 6 - 10);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el, down) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = `translate3d(0,0,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', down);
                });
            },
            afterEnter(el) {
                let ball = this.dropBalls.shift();
                if (ball.show) {
                    ball.show = false;
                    el.style.display = 'none';
                }
                this.animationClass = false;
            },
            afterLeave(el) {
                this.animationClass = true;
            }
        },
        props: {
            selectFoods: {
                type: Array,
                default: function () {
                    return [
                        {
                            price: 10,
                            count: 1
                        }
                    ];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    @import "../../common/style/mixin";

    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        .content {
            display: flex;
            font-size: 0;
            color: rgba(255, 255, 255, .4);
            background-color: #141d27;
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    top: -10px;
                    margin: 0 8px;
                    padding: 6px;
                    width: 50px;
                    height: 50px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    background-color: #141d27;
                    .logo {
                        height: 100%;
                        width: 100%;
                        border-radius: 50%;
                        background-color: #2b343c;
                        text-align: center;
                        &.highlight {
                            background-color: rgb(0, 160, 220);
                            .icon-shopping_cart {
                                color: #fff;
                            }
                        }
                        .icon-shopping_cart {
                            font-size: 24px;
                            color: #80858a;
                            line-height: 44px;
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: 16px;
                        line-height: 16px;
                        min-width: 16px;
                        padding: 0 2px;
                        text-align: center;
                        border-radius: 12px;
                        font-size: 9px;
                        color: #fff;
                        background-color: rgb(240, 20, 20);
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                        font-weight: 700;

                    }
                    &.shake-enter-active {
                        animation: shake 0.5s ease-in-out 0s 1;
                    }
                    @keyframes shake {
                        0% {
                            -webkit-transform: scale(1);
                            transform: scale(1)
                        }
                        25% {
                            -webkit-transform: scale(.8);
                            transform: scale(.8)
                        }
                        50% {
                            -webkit-transform: scale(1.1);
                            transform: scale(1.1)
                        }
                        75% {
                            -webkit-transform: scale(.9);
                            transform: scale(.9)
                        }
                        100% {
                            -webkit-transform: scale(1);
                            transform: scale(1)
                        }
                    }
                }
                .price, .desc {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                }
                .price {
                    font-size: 16px;
                    padding-right: 8px;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    &.highlight {
                        color: #fff;
                    }
                }
                .desc {
                    font-size: 8px;
                    font-weight: normal;
                    padding-left: 8px;
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    font-size: 12px;
                    line-height: 48px;
                    text-align: center;
                    font-weight: 700;
                    &.not-enough {
                        background-color: #2b333b;
                    }
                    &.enough {
                        color: #fff;
                        background-color: #00b43c;
                    }
                }
            }
        }
        .ball-container {
            .ball {
                position: fixed;
                left: 25px;
                bottom: 22px;
                z-index: 200;
                &.drap-enter-active, &.drap-leave-active {
                    transition: all 0.4s cubic-bezier(.34, -0.29, .79, .08) 0s;
                    .inner {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: rgb(1, 160, 220);
                        transition: all 0.4s linear 0s;
                    }
                }
            }
        }
        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            transform: translate3d(0, -100%, 0);
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                .border-bottom();
                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background-color: #fff;
                .food {
                    padding: 12px 0;
                    box-sizing: border-box;
                    .border-bottom();
                    .name {
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
        .fold-enter-active, .fold-leave-active {
            transition: all 0.5s;
        }
        .fold-enter, .fold-leave-to {
            transform: translate3d(0, 0, 0,);
        }
    }

    .list-mask {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: -2;
        background-color: rgba(0, 0, 0, .6);
        &.mask-enter-active, &.mask-leave-active {
            opacity: 1;
            transition: all 0.5s;
        }
        &.mask-enter, .mask-leave {
            opacity: 0;
        }
    }
</style>
