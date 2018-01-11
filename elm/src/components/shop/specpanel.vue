<template>
    <transition name="fade">
        <div v-if="state" class="specpanel mask">
            <!--<div v-if="state" class="mask"></div>-->
            <div v-if="state" class="content panel_body">
                <h1>{{food.name}}</h1>
                <div class="candidators">
                    <div class="candidators_group" v-if="food.specifications&&Index===0"
                         v-for="(specification,Index) in food.specifications">
                        <h2>{{specification.name}}</h2>
                        <a v-for="(value,index) in specification.values" @click="selectSpec(index,specification)"
                           class="candidator"
                           :class="{selected:index===specificationIndex}">{{value}}</a>
                    </div>

                    <div class="candidators_group" v-if="food.attrs" v-for="(attr,Index) in food.attrs">
                        <h2>{{attr.name}}</h2>
                        <a v-for="(value,index) in attr.values" @click="selectSpec(index,Index)"
                           class="candidator"
                           :class="{selected:index===attrIndex[Index]}">{{value}}</a>
                    </div>

                </div>
                <div class="selected_result">
                    <strong class="food_price">
                        <span class="new_price">{{minPrice}}</span>
                        <span class="lowest_price" v-if="selectState!==1">起</span>
                        <del v-else-if="originPrice" class="origin_price">
                            ¥{{originPrice}}
                        </del>
                    </strong>

                    <button type="button" class="cart_add" :class="{disabled:selectState!==1}" @click="addCart">
                        {{selectState===2?'已售完':'选好了'}}
                    </button>
                </div>
                <a href="javascript:" @click="hide" role="button" aria-label="关闭" class="close"></a>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import Bus from '@/components/eventBus/eventBus';
    import Vue from 'vue';

    export default {
        data() {
            return {
                food: {},
                state: false,
                // selectState: 0,选择不完善，1：ok 2：售完 2：没有该规格=0
                attrIndex: [],
                specificationIndex: 0,
                resultSpecIndex: 0,
                originPrice: null
            };
        },
        mounted() {
            Bus.$on('select_food_spec', this.show);
        },
        beforeDestroy() {
            Bus.$off('select_food_spec', this.show);
        },
        computed: {
            minPrice() {
                if (this.selectState === 0) {
                    let specPrice = this.food.specfoods.map((spec) => {
                        return spec.price;
                    });
                    return Math.min.apply(Math, specPrice);
                } else {
                    this.originPrice = this.food.specfoods[this.resultSpecIndex].original_price;
                    return this.food.specfoods[this.resultSpecIndex].price;
                }
            },
            selectState() {
                if (this.attrIndex.every((val) => val >= 0) && this.specificationIndex >= 0) {
                    let specification = this.food.specifications[0] || {};
                    let name = "规格";
                    if (specification.name === name) {
                        let selectedSpec = specification.values[this.specificationIndex];
                        for (let i = 0, len = this.food.specfoods.length; i < len; i++) {
                            let specs = this.food.specfoods[i].specs;
                            for (let j = 0, len2 = specs.length; j < len2; j++) {
                                if (specs[j].name === name && specs[j].value === selectedSpec) {
                                    this.resultSpecIndex = i;
                                    if (this.food.specfoods[i].stock > 0) {
                                        return 1;
                                    } else {
                                        return 2;
                                    }
                                }
                            }
                        }
                    }
                    return 0;
                } else {
                    return 0;
                }
            }
        },
        methods: {
            hide() {
                this.state = false;
            },
            show(food) {
                this.attrIndex = (function () {
                    return food.attrs.map(() => 0);
                }());
                this.specificationIndex = 0;
                this.food = food;
                this.state = true;
            },
            selectSpec(index, specification) {
                if (specification.name === "规格") {
                    if (index === this.specificationIndex) {
                        this.specificationIndex = -1;
                    } else {
                        this.specificationIndex = index;
                    }
                } else if (typeof specification === "number") {
                    if (index === this.attrIndex[specification]) {
                        this.attrIndex[specification] = -1;
                    } else {
                        this.attrIndex[specification] = index;
                    }
                    this.attrIndex = [...this.attrIndex];
                }
            },
            addCart() {
                if (this.selectState !== 1) {
                    return false;
                }
                let specfood = this.food.specfoods[this.resultSpecIndex];
                if (!specfood.count && specfood.count !== 0) {
                    Vue.set(specfood, 'count', 1);
                } else if (specfood.count < specfood.stock) {
                    specfood.count++;
                } else {
                    alert("数量达到最大库存量");
                }
                this.resultSpecIndex = 0;
                this.hide();
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .specpanel {
        /*position: relative;*/
        /*z-index: 100;*/
        /*height: 0;*/
        .panel_body {
            position: fixed;
            top: 50%;
            left: 10%;
            right: 10%;
            transition: all .3s;
            will-change: transform;
            transform: translate3d(0, -50%, 0) scale(1);
            overflow: auto;
            background-color: #fff;
            border-radius: .106667rem;
            border-radius: 1.066667vw;
            z-index: 1;
            opacity: 1;

            h1 {
                margin: 0;
                text-align: center;
                background-color: inherit;
                color: #333;
                font-size: .426667rem;
                line-height: .6rem;
                line-height: 6vw;
                padding: .333333rem .8rem;
                padding: 3.333333vw 8vw;
            }
            .candidators {
                .candidators_group:not(:last-child) {
                    margin-bottom: .466667rem;
                    margin-bottom: 4.666667vw;
                }
                max-height: 6.666667rem;
                max-height: 66.666667vw;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                padding: 0 0 .533333rem .4rem;
                padding: 0 0 5.333333vw 4vw;
                font-size: 0;
                h2 {
                    font-size: .346667rem;
                    color: #666;
                    line-height: .533333rem;
                    line-height: 5.333333vw;
                }
                .candidator {
                    display: inline-block;
                    vertical-align: middle;
                    white-space: nowrap;
                    border: 1px solid #999;
                    border-radius: .533333rem;
                    border-radius: 5.333333vw;
                    margin: .173333rem .4rem 0 0;
                    margin: 1.733333vw 4vw 0 0;
                    padding: 0 .24rem;
                    padding: 0 2.4vw;
                    min-width: 1.333333rem;
                    min-width: 13.333333vw;
                    line-height: .64rem;
                    line-height: 6.4vw;
                    height: .64rem;
                    height: 6.4vw;
                    font-size: .346667rem;
                    text-decoration: none;
                    text-align: center;
                    color: #666;
                    &.selected {
                        font-weight: 700;
                        color: #3199e8;
                        border-color: #3199e8;
                        background-color: #f6fbff
                    }
                }
            }
            .selected_result {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .333333rem .4rem;
                padding: 3.333333vw 4vw;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                background-color: #f9f9f9;
                .food_price {
                    font-size: .56rem;
                    line-height: 1;
                    color: #ff6000;
                    &:before {
                        font-weight: 400;
                        content: "\A5";
                        margin-right: .053333rem;
                        margin-right: .533333vw;
                        position: relative;
                        font-size: .293333rem;
                        display: inline-block;
                        vertical-align: baseline;
                        /*top: -.04rem;*/
                        /*top: -.4vw;*/
                    }
                    .new_price {
                        margin-right: .106667rem;
                        margin-right: 1.066667vw;
                        font-weight: 700;
                        display: inline-block;
                        vertical-align: baseline;
                    }
                    .lowest_price {
                        font-size: .293333rem;
                        color: #999;
                        display: inline-block;
                        vertical-align: baseline;
                    }
                    .origin_price {
                        font-size: .32rem;
                        color: #666;
                        font-weight: 400;
                        vertical-align: top;
                        position: relative;
                        top: .066667rem;
                        top: .666667vw;
                    }
                }
                .cart_add {
                    outline: none;
                    border: none;
                    -webkit-appearance: none;
                    font-size: .373333rem;
                    color: #fff;
                    padding: 0 .333333rem;
                    padding: 0 3.333333vw;
                    text-align: center;
                    line-height: .866667rem;
                    line-height: 8.666667vw;
                    border-radius: .08rem;
                    border-radius: .8vw;
                    background-color: #3199e8;
                    text-decoration: none;
                    &.disabled {
                        background-color: #ccc;
                    }
                }
            }
            .close {
                display: block;
                position: absolute;
                top: .4rem;
                top: 4vw;
                right: .4rem;
                right: 4vw;
                width: .466667rem;
                width: 4.666667vw;
                height: .466667rem;
                height: 4.666667vw;
                background: transparent url('./close.png') no-repeat;
                background-size: cover;
            }
        }
    }
    .fade-enter, .fade-leave-to {
        /*opacity: 0;*/
        .panel_body {
            opacity: 0;
            transform: translate3d(0, -50%, 0) scale(0.1);
        }
    }
</style>
