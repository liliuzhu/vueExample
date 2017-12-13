<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">
                <i class="rotate icon-remove_circle_outline"></i>
            </div>
        </transition>
        <transition name="move">
            <div class="cart-count" v-show="food.count>0"><span class="rotate">{{food.count}}</span></div>
        </transition>
        <div class="cart-add" @click.stop.prevent="addCart">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import Bus from 'components/eventBus/eventBus';
    export default {
        data() {
            return {};
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
            addCart(event) {
                if (!event._constructed) {
                    return 0;
                }
                if (!this.food.count && this.food.count !== 0) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                // this.$emit('cart_add', event.target);
                // this.$emit('cart_add', event.currentTarget);
                Bus.$emit('cart_add', event.currentTarget);
            },
            decreaseCart() {
                if (!event._constructed) {
                    return 0;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }

    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .cartcontrol{
        font-size: 0;
        .cart-decrease,.cart-count,.cart-add{
            display: inline-block;
            vertical-align: top;
        }
        .cart-decrease,.cart-add{
            font-size: 24px;
            line-height: 24px;
            /*height: 30px;*/
            overflow: hidden;
            color: rgb(0,160,220);
            padding: 3px;
            .inner{
                display: inline-block;
            }
        }
        .cart-count{
            min-width: 12px;
            line-height: 24px;
            font-size: 10px;
            padding: 3px 0;
            color: rgb(147,153,159);
            text-align: center;
        }
        .rotate{
            display: inline-block;
            transform: rotate(0);
        }
        .move-enter-active, .move-leave-active {
            transition: all 0.3s ease-in-out 0ms;
            transform: translate3d(0,0,0);
            opacity: 1;
            .rotate{
                transition: all 0.3s ease-in-out 0ms;
            }
        }
        .move-enter,.move-leave-to{
            opacity: 0;
            transform: translate3d(24px,0,0);
            .rotate{
                transform: rotate(360deg);
            }
        }

    }
</style>
