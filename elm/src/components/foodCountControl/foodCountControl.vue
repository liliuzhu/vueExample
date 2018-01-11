<template>
    <div class="foodCountControl">
        <transition name="move">
            <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="foodCount>0">
                <i class="rotate ele-icon-remove_circle_outline" :class="{disabled:mode===1&&foodCount>1}"></i>
            </div>
        </transition>
        <transition name="move">
            <div class="cart-count" v-show="foodCount>0"><span class="rotate">{{foodCount}}</span></div>
        </transition>
        <a v-if="mode===1" class="choice_add" :class="{disabled:shopStatus!==1}"
           @click.stop.prevent="selectFoodSpec">
            <span class="entityspecbutton">选规格</span>
        </a>
        <div v-else-if="mode===0" class="cart-add" @click.stop.prevent="addCart">
            <i class="ele-icon-add_circle" :class="{disabled:shopStatus!==1}"></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import Bus from '@/components/eventBus/eventBus';
    import {mapGetters} from 'vuex';
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {};
        },
        props: {
            food: {
                type: Object,
                default: function () {
                    return null;
                }
            },
            spec: {
                type: Object,
                default: function () {
                    return null;
                }
            },
            mode: {
                type: Number,
                /*
                * 1:规格， 0:加减
                * */
                default: function () {
                    return !this.spec && this.food.specfoods.length > 1 ? 1 : (this.spec || this.food.specfoods.length === 1 ? 0 : null);
                }
            }
        },
        mounted() {
            if (this.food && this.spec) {
                console.log('数据只能传入项');
            } else if (!this.food && !this.spec) {
                console.log('未传入必要数据');
            }
        },
        computed: {
            foodCount() {
                if (this.spec) {
                    return this.spec.count;
                } else if (this.food) {
                    let count = 0;
                    this.food.specfoods.forEach((spec) => {
                        count += spec.count || 0;
                    });
                    return count;
                }
                return 0;
            },
            ...mapGetters(['shopStatus'])
        },
        methods: {
            selectFoodSpec() {
                if (this.shopStatus !== 1) {
                    return false;
                }
                Bus.$emit('select_food_spec', this.food);
            },
            addCart(event) {
                if (this.shopStatus !== 1) {
                    return false;
                }
                let specfood = null;
                if (this.spec) {
                    specfood = this.spec;
                } else if (this.food) {
                    specfood = this.food.specfoods[0];
                } else {
                    return;
                }
                if (!specfood.count && specfood.count !== 0) {
                    Vue.set(specfood, 'count', 1);
                } else if (specfood.count < specfood.stock) {
                    specfood.count++;
                } else {
                    alert("数量达到最大库存量");
                }
                if (specfood.entities) {
                    // let entities=[];
                    // Vue.set(specfood, 'count', 1);
                }
                Bus.$emit('cart_add_food', event.currentTarget);
            },
            decreaseCart() {
                let specfood = null;
                if (this.spec) {
                    specfood = this.spec;
                    specfood.count && specfood.count--;
                } else if (this.food) {
                    specfood = this.food.specfoods[0];
                    if (this.food.specfoods.length === 1) {
                        specfood.count && specfood.count--;
                    } else if (this.foodCount === 1) {
                        this.food.specfoods.forEach((specfood) => {
                            if (specfood.count) {
                                specfood.count = 0;
                            }
                        });
                    } else {
                        Toast({
                            message: '多规格商品只能到购物车删除',
                            position: 'middle',
                            duration: 5000
                        });
                        // alert('多规格商品只能到购物车删除');
                    }
                }
            }
        }

    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .foodCountControl {
        white-space: nowrap;
        font-size: 0;
        .cart-decrease, .cart-count, .cart-add, .choice_add {
            display: inline-block;
            vertical-align: middle;
            padding: .093333rem;
            padding: .933333vw;
        }
        .cart-decrease, .cart-add {
            font-size: 0.6rem;
            line-height: 0.56px;
            overflow: hidden;
            color: rgb(0, 160, 220);
            .disabled {
                color: #ddd;
            }
            i {
                width: 0.56rem;
                width: 5.6vw;
                height: 0.56rem;
                height: 5.6vw;
                display: inline-block;
            }
        }
        .choice_add {
            &.disabled .entityspecbutton {
                background-color: #ddd;
            }
            .entityspecbutton {
                display: inline-block;
                vertical-align: middle;
                color: #fff;
                background-color: #3199e8;
                text-decoration: none;
                padding: 0 .2rem;
                padding: 0 2vw;
                font-size: .32rem;
                border-radius: .346667rem;
                border-radius: 3.466667vw;
                line-height: .666667rem;
                line-height: 6.666667vw;
            }
        }
        .cart-count {
            padding: .093333rem 0;
            padding: .933333vw 0;
            line-height: 0.544rem;
            line-height: 5.44vw;
            text-align: center;
            color: #666;
            font-size: .373333rem;
            min-width: .4rem;
            min-width: 4vw;
            max-width: 2em;
            overflow: hidden;
        }
        .rotate {
            display: inline-block;
            transform: rotate(0);
        }
        .move-enter-active, .move-leave-active {
            transition: all 0.3s ease-in-out 0ms;
            transform: translate3d(0, 0, 0);
            opacity: 1;
            .rotate {
                transition: all 0.3s ease-in-out 0ms;
            }
        }
        .move-enter, .move-leave-to {
            opacity: 0;
            transform: translate3d(24px, 0, 0);
            .rotate {
                transform: rotate(360deg);
            }
        }

    }
</style>
