<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <transition type="animation" name="shake" @after-leave="_afterLeave">
                <div ref="logo" v-show="animationClass" class="logo" :attr-quantity="totalCount"
                     :class="{'empty':totalCount===0}">
                </div>
            </transition>
            <div class="content-left">
                <p class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</p>
                <p class="desc">配送费¥{{delivery_fee}}</p>
            </div>
            <a class="content-right"
               :class="{disabled:(totalPrice===0||totalPrice < minimum_order_amount)||shopStatus!==1}"
               @click.stop.preven="goPay" v-html="payDesc"></a>
        </div>
        <foodDetail ref="foodDetail"></foodDetail>
        <transition-group name="drap" @before-enter="_beforeEnter" @enter="_enter" @after-enter="_afterEnter" tag="div"
                          class="ball-container">
            <div :key="index" v-for="(ball,index) in balls" class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
            </div>
        </transition-group>
        <transition name="fold">
            <div class="shopcart-list" v-if="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="spec in selectFoods">
                            <span class="entity_name">
                                <em class="specs_name zhu_ellipsis">{{spec.name}}</em>
                                <p title="属性" class="entity_specs">{{spec.value}}</p>
                            </span>
                            <div class="price">
                                <del class="original_price">¥{{spec.price*spec.count}}</del>
                                <span class="now_price">{{spec.price*spec.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <foodCountControl :spec="spec"></foodCountControl>
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
    import Bus from '@/components/eventBus/eventBus';
    import foodCountControl from '@/components/foodCountControl/foodCountControl';
    import {mapGetters} from 'vuex';
    import foodDetail from './foodDetail';

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
        props: {
            selectFoods: {
                type: Array,
                default: function () {
                    return [
                        {
                            price: 10,
                            count: 0
                        }
                    ];
                }
            },
            delivery_fee: {
                type: Number,
                default: 20
            },
            minimum_order_amount: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            Bus.$on('cart_add_food', this._drap);
            this.$nextTick(() => {
                let logo = this.$refs.logo;
                let rect = logo.getBoundingClientRect();
                this.logoPosition = {
                    x: rect.left + logo.offsetWidth / 2,
                    y: rect.top + logo.offsetWidth / 2
                };
                // console.log(this.logoPosition);
            });
        },
        // 最好在组件销毁前
        // 清除事件监听
        beforeDestroy() {
            Bus.$off('cart_add_food', this._drap);
        },
        computed: {
            listShow() {
                if (!this.totalCount) {
                    this.fold = false;
                    return false;
                }
                let show = this.fold;
                // if (show) {
                //     this.$nextTick(() => {
                //     });
                // }
                return show;
            },
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((spec) => {
                    total += spec.price * spec.count;
                });
                return total % 1 === 0 ? total : total.toFixed(1);
            },
            totalCount() {
                let total = 0;
                this.selectFoods.forEach((spec) => {
                    total += spec.count;
                });
                return total;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `<span>¥${this.minimum_order_amount}起送</span>`;
                } else if (this.totalPrice < this.minimum_order_amount) {
                    let diff = this.minimum_order_amount - this.totalPrice;
                    if (String(diff).search(/\./) === -1) {
                        return `<span>还差¥${diff}起送</span>`;
                    } else {
                        return `<small>还差¥${diff.toFixed(1)}起送</small>`;
                    }
                } else {
                    return '<span>去结算</span>';
                }
            },
            ...mapGetters(['shopStatus'])
        },
        methods: {
            goPay() {
                if (this.shopStatus !== 1) {
                    return false;
                }
                if (this.totalPrice >= this.minimum_order_amount) {
                    alert(`支付${this.totalPrice}元`);
                }
            },
            empty() {
                this.selectFoods.forEach((spec) => {
                    spec.count = 0;
                });
            },
            toggleList() {
                if (this.totalCount > 0) {
                    this.fold = !this.fold;
                }
            },
            showFoodDetail(food) {
                this.$refs.foodDetail.show(food);
            },
            _drap(el) {
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
            _beforeEnter(el) {
                // console.log(el);
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let radius = ball.el.offsetWidth / 2;
                        let x = rect.left + radius - this.logoPosition.x;
                        let y = rect.top + radius - this.logoPosition.y;
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            _enter(el, down) {
                /* eslint-disable no-unused-vars */
                // let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = `translate3d(0,0,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', down);
                });
            },
            _afterEnter(el) {
                let ball = this.dropBalls.shift();
                if (ball.show) {
                    el.style.display = 'none';
                    ball.show = false;
                }
                this.animationClass = false;
            },
            _afterLeave(el) {
                this.animationClass = true;
            }
        },
        components: {
            foodCountControl,
            foodDetail
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    @import "../../common/style/mixin";

    .shopcart {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 50;
        .content {
            background-color: rgba(61, 61, 63, .9);
            -webkit-backdrop-filter: blur(.266667rem);
            -webkit-backdrop-filter: blur(2.666667vw);
            height: 1.28rem;
            height: 12.8vw;
            padding-left: 2.106667rem;
            padding-left: 21.066667vw;
            display: flex;
            align-items: center;
            .logo {
                position: absolute;
                left: .32rem;
                left: 3.2vw;
                bottom: .2rem;
                bottom: 2vw;
                width: 1.333333rem;
                width: 13.333333vw;
                height: 1.333333rem;
                height: 13.333333vw;
                box-sizing: border-box;
                border-radius: 100%;
                background-color: #3190e8;
                border: .133333rem solid #444;
                border: 1.333333vw solid #444;
                box-shadow: 0 -.08rem .053333rem 0 rgba(0, 0, 0, .1);
                box-shadow: 0 -.8vw .533333vw 0 rgba(0, 0, 0, .1);
                will-change: transform;
                &.empty {
                    background-image: -webkit-radial-gradient(circle, #363636 .626667rem, #444 0);
                    background-image: -webkit-radial-gradient(circle, #363636 6.266667vw, #444 0);
                    background-image: radial-gradient(circle, #363636 .626667rem, #444 0);
                    background-image: radial-gradient(circle, #363636 6.266667vw, #444 0);
                    &:before {
                        background-image: url(./shop_cart.svg);
                    }
                    &:after {
                        visibility: hidden;
                    }
                }
                &:before {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: url(./shop_cart_highlight.svg) 50% no-repeat;
                    background-size: .6rem;
                    background-size: 6vw;
                    content: "";
                }
                &:after {
                    position: absolute;
                    right: -.12rem;
                    right: -1.2vw;
                    top: -.133333rem;
                    top: -1.333333vw;
                    line-height: 1;
                    background-image: -webkit-gradient(linear, right top, left top, from(#ff7416), color-stop(98%, #ff3c15));
                    background-image: -webkit-linear-gradient(right, #ff7416, #ff3c15 98%);
                    background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
                    color: #fff;
                    border-radius: .32rem;
                    border-radius: 3.2vw;
                    padding: .053333rem .133333rem;
                    padding: .533333vw 1.333333vw;
                    content: attr(attr-quantity);
                    font-size: .266667rem;
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
            .content-left {
                flex: 1;
                /*.price, .desc {*/
                /*display: inline-block;*/
                /*vertical-align: top;*/
                /*margin-top: 12px;*/
                /*line-height: 24px;*/
                /*}*/
                .price {
                    font-size: .48rem;
                    line-height: normal;
                    color: #fff;
                }
                .desc {
                    color: #999;
                    font-size: .266667rem;
                }
            }
            .content-right {
                height: 100%;
                width: 2.8rem;
                width: 28vw;
                background-color: #4cd964;
                color: #fff;
                text-align: center;
                text-decoration: none;
                font-size: .4rem;
                font-weight: 700;
                user-select: none;
                line-height: 1.28rem;
                line-height: 12.8vw;
                &.disabled {
                    background-color: #535356;
                }
                span {
                    font-weight: 700;
                }
                small {
                    font-weight: 700;
                    font-size: .293333rem;
                    display: block;
                }
            }
        }
        .ball-container {
            .ball {
                @ballWidthR: 0.56rem;
                @ballWidthV: 5.6vw;
                position: fixed;
                left: 0.32rem+(1.333333-@ballWidthR)/2;
                bottom: 0.2rem+(1.333333-@ballWidthR)/2;
                z-index: 9999;
                &.drap-enter-active, &.drap-leave-active {
                    transition: all 0.5s cubic-bezier(0.38, -0.24, 0.79, 0.08) 0s;
                    .inner {
                        width: @ballWidthR;
                        width: @ballWidthV;
                        height: @ballWidthR;
                        height: @ballWidthV;
                        border-radius: 50%;
                        background: rgb(1, 160, 220);
                        transition: all 0.5s linear 0s;
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
            background-color: #fff;
            /*display: flex;*/
            /*align-items: center;*/
            .list-header {
                /*height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                .border-bottom();*/

                /*flex: 1;*/
                display: flex;
                align-items: center;

                padding: 0 .333333rem;
                padding: 0 3.333333vw;
                border-bottom: 1px solid #ddd;
                background-color: #eceff1;
                color: #666;
                height: 1.066667rem;
                height: 10.666667vw;

                .title {
                    /*float: left;*/
                    /*font-size: 14px;*/
                    /*color: rgb(7, 17, 27);*/

                    padding-left: .133333rem;
                    padding-left: 1.333333vw;
                    border-left: .093333rem solid #2395ff;
                    border-left: .933333vw solid #2395ff;
                    flex: 1;
                }
                .empty {
                    /*float: right;*/
                    /*font-size: 12px;*/
                    /*color: rgb(0, 160, 220);*/
                    flex: none;
                    display: flex;
                    align-items: center;
                    padding-left: .4rem;
                    padding-left: 4vw;
                    color: #666;
                    text-decoration: none;
                    font-size: .346667rem;
                }
            }
            .list-content {
                /*padding: 0 18px;*/
                /*max-height: 217px;*/
                /*overflow: hidden;*/
                /*background-color: #fff;*/

                overflow: auto;
                -webkit-overflow-scrolling: touch;
                max-height: 8rem;
                max-height: 80vw;
                .food {
                    /*<!--padding: 12px 0;-->*/
                    /*<!--box-sizing: border-box;-->*/
                    /*<!--.border-bottom();-->*/
                    display: flex;
                    align-items: center;
                    padding: .2rem .333333rem .2rem 0;
                    padding: 2vw 3.333333vw 2vw 0;
                    min-height: 1.466667rem;
                    min-height: 14.666667vw;
                    margin-left: .333333rem;
                    margin-left: 3.333333vw;
                    &:not(:last-child) {
                        border-bottom: 1px solid #eee;
                    }
                    .entity_name {
                        /*font-size: 14px;*/
                        /*color: rgb(7, 17, 27);*/
                        flex: 5.5;
                        line-height: normal;
                        .specs_name {
                            display: inline-block;
                            font-style: normal;
                            vertical-align: middle;
                            max-width: 4.666667rem;
                            max-width: 46.666667vw;
                        }
                        .entity_specs {
                            white-space: nowrap;
                            line-height: .333333rem;
                            line-height: 3.333333vw;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: #999;
                            font-size: .266667rem;
                        }
                    }
                    .price {
                        /* position: absolute;
                         right: 90px;
                         bottom: 12px;
                         line-height: 24px;
                         font-size: 14px;
                         font-weight: 700;
                         color: rgb(240, 20, 20);*/
                        flex: 2.5;
                        color: #f60;
                        text-align: right;
                        white-space: nowrap;
                        .original_price {
                            margin-right: .133333rem;
                            margin-right: 1.333333vw;
                            font-size: .266667rem;
                            color: #999;
                            font-weight: 400;
                        }
                        .now_price {
                            font-weight: 700;
                            &:before {
                                content: "\A5";
                                font-size: .266667rem;
                                color: currentColor;
                            }
                        }
                    }
                    .cartcontrol-wrapper {
                        /*position: absolute;*/
                        /*right: 0;*/
                        /*bottom: 6px;*/
                        flex: 3;
                        text-align: right;
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
