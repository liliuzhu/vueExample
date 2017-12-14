<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu_wrapper">
            <ul>
                <li class="menu-item" v-for="(item ,index) in goods" @click="selectMenu(index,$event)"
                    :class="{'current':currentIndex==index}">
                    <span class="text border-bottom">
                        <span v-if="item.type>0" class="icon" :class="'type_'+item.type"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods_wrapper">
            <section>
                <dl v-for="item in goods" class="food-list food-list-hook">
                    <dt class="title">{{item.name}}</dt>
                    <dd @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-bottom">
                        <div class="icon">
                            <img :src="food.icon" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                            </div>
                            <div class="price">
                                <span class="now">¥{{food.price}}</span><span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </div>
                    </dd>
                </dl>
            </section>
        </div>
        <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';
    import {setLocalCartMAp, getLocalCartMAp} from '../../common/js/localStorage';

    export default {
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        created() {
            this.CART_MAP = getLocalCartMAp(this.seller.id);
        },
        mounted() {
            this.getGoodsInfo();
        },
        components: {
            shopcart,
            cartcontrol,
            food
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                setLocalCartMAp(this.seller.id, foods);
                return foods;
            }
        },
        props: {
            seller: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        methods: {
            selectFood(food, event) {
                if (!event._constructed) {
                    return 0;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            },
            getGoodsInfo() {
                if (this.custom.hasServe) {
                    this.$ajax.get('/api/shop/goods').then((res) => {
                        if (res.data.status) {
                            this.goods = res.data.body;
                            this.handleData();
                        }
                    }).catch((err) => {
                        console.log('goods 错误' + err);
                    });
                } else {
                    this.$ajax.get('./data.json').then((res) => {
                        if (res.data.goods) {
                            this.goods = res.data.goods;
                            this.handleData();
                        }
                    }).catch((err) => {
                        console.log('goods 读取json错误' + err);
                    });
                }
            },
            handleData() {
                /*
                 * 读取缓存
                 * */
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        let selectFood = this.CART_MAP;
                        selectFood.forEach((select) => {
                            if (food.id === select.id) {
                                Vue.set(food, 'count', select.count);
                            }
                        });
                    });
                });
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            },
            selectMenu(index, event) {
                if (!event._constructed) {
                    return 0;
                }
                let foodList = this.$refs.foods_wrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menu_wrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foods_wrapper, {
                    probeType: 3,
                    click: true
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foods_wrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    @import "../../common/style/mixin";

    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background-color: #f3f5f7;
            /*overflow: auto;*/
            .menu-item {
                display: table;
                padding: 0 12px;
                width: 100%;
                height: 54px;
                line-height: 14px;
                position: relative;
                &.current {
                    background-color: #fff;
                    /*top: -1px;*/
                    z-index: 10;
                    font-weight: 700;
                    .text::after {
                        border: none;
                    }
                }
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    height: 12px;
                    width: 12px;
                    margin-right: 2px;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    &.type_0, &.decrease {
                        .bg-image('./decrease_3@2x.png', './decrease_3@3x.png')
                    }
                    &.type_1, &.discount {
                        .bg-image('./discount_3@2x.png', './discount_3@3x.png')
                    }
                    &.type_2, &.special {
                        .bg-image('./special_3@2x.png', './special_3@3x.png')
                    }
                    &.type_3, &.invoice {
                        .bg-image('./invoice_3@2x.png', './invoice_3@3x.png')
                    }
                    &.type_4, &.guarantee {
                        .bg-image('./guarantee_3@2x.png', './guarantee_3@3x.png')
                    }
                }
                .text {
                    display: table-cell;
                    width: 100%;
                    vertical-align: middle;
                    font-size: 12px;
                    .border-bottom();
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            background-color: #fff;
            overflow: hidden;
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background-color: #f3f5f7;
                border-left: 1px solid #d9dde1;
            }
            .food-item {
                display: flex;
                padding: 10px;
                /*margin: 0 10px;*/
                &:not(:last-child) {
                    .border-bottom();
                }
                .icon {
                    flex: 0 0 60px;
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                    }
                }
                .content {
                    flex: 1;
                    position: relative;
                    /*width: ~'-webkit-calc(100% - 70px)';*/
                    overflow: hidden;
                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc, .extra {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 12px;
                        margin: 8px 0;
                    }
                    .desc {
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .extra {
                        margin-bottom: 0;
                        .count {
                            display: inline-block;
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
                        bottom: -3px;
                        right: 0;
                    }
                }
            }
        }

    }
</style>
