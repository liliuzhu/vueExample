<template>
    <div class="menu_view">
        <div class="main">
            <ul class="menucategory_category scroller">
                <li @click="currentCategory(index);" :class="{menucategory_active:category.is_selected}"
                    v-for="(category,index) in menu">
                    <span class="category_quantity"
                          v-if="categoryQuantity(category)">{{categoryQuantity(category)}}</span>
                    <img v-if="category.icon_url" :src="analysismageHashMenu(category.icon_url)">
                    <span>{{category.name}}</span>
                </li>
            </ul>
            <section class="menuview_menuList scroller" @scroll="_listenCallback" ref="menuview_menuList">
                <dl v-for="(category,index) in menu" class="menu" :key="index">
                    <dt class="menu_category">
                        <strong class="category_name">{{category.name}}</strong>
                        <span class="category_desc zhu_ellipsis">{{category.description}}</span>
                    </dt>
                    <dd v-for="food in category.foods" @click="lookFoodDetail(food)" class="food_item">
                        <div class="food_root">
                            <span v-if="food.image_path" class="food_logo">
                                <foodAttributes class="attrTag" :foodAttributes="food.attributes"></foodAttributes>
                                <img :alt="food.name" :src="analysismageHash(food.image_path,true,140)">
                            </span>
                            <section class="food_info">
                                <p class="food_name">{{food.name}}
                                    <foodAttributes class="attrTag1" :mode="1"
                                                    :foodAttributes="food.attributes"></foodAttributes>
                                </p>
                                <p class="food_desc" v-if="food.description">{{food.description}}</p>
                                <p class="food_sales">
                                    <span v-if="food.month_sales">月售{{food.month_sales}}份</span>
                                    <span v-if="food.satisfy_rate">好评率{{food.satisfy_rate}}%</span>
                                </p>
                                <foodActivity :food="food"></foodActivity>
                                <foodPrice class="foodPrice" :food="food"></foodPrice>
                                <div class="food_count_control">
                                    <foodCountControl :food="food"></foodCountControl>
                                </div>
                            </section>
                        </div>
                    </dd>
                </dl>
            </section>
        </div>
        <specpanel></specpanel>
        <footer class="cartview">
            <shopcart ref="shopcart" :delivery_fee="shopInfo.float_delivery_fee"
                      :minimum_order_amount="shopInfo.float_minimum_order_amount" :selectFoods="selectFoods"></shopcart>
        </footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';
    import foodCountControl from '@/components/foodCountControl/foodCountControl';
    import shopcart from './shopcart';
    import specpanel from './specpanel';
    import foodAttributes from './foodAttributes';
    import foodPrice from './foodPrice';
    import foodActivity from './foodActivity';

    export default {
        data() {
            return {
                categoryHeight: [],
                scrollIng: false,
                count: 0
            };
        },
        props: {
            menu: {
                type: Array,
                required: true,
                default: function () {
                    return [];
                }
            },
            shopInfo: {
                type: Object,
                required: true,
                default: function () {
                    return {};
                }
            }
        },
        watch: {
            menu() {
                this.$nextTick(() => {
                    this._calculateHeight();
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._calculateHeight();
            });
        },
        computed: {
            selectFoods() {
                let selectSpec = [];
                this.menu.forEach((category) => {
                    category.foods.forEach((food) => {
                        food.specfoods.forEach((spec) => {
                            if (spec.count) {
                                selectSpec.push(spec);
                            }
                        });
                    });
                });
                return selectSpec;
            }
        },
        methods: {
            analysismageHash,
            _listenCallback(event) {
                window.throttle2(() => {
                    this._scrollCallback(event);
                });
            },
            lookFoodDetail(food) {
                this.$refs.shopcart.showFoodDetail(food);
            },
            _scrollCallback(event) {
                let scrollTop = event.target.scrollTop;
                this.$emit("containerScroll", scrollTop, 'index');
                if (!this.scrollIng) {
                    this._selectedMenuCategory(this._getMenuIndex(scrollTop));
                }
            },
            analysismageHashMenu(imageHash = "") {
                let hash = imageHash;
                let extension = imageHash.slice(-4) === 'jpeg' ? imageHash.slice(-4) : imageHash.slice(-3);
                return `https://fuss10.elemecdn.com/${hash.substr(0, 1)}/${hash.substr(1, 2)}/${hash.slice(3)}.${extension}?imageMogr/format/webp/thumbnail/18x/`;
            },
            currentCategory(index) {
                this._selectedMenuCategory(index);
                this.scrollerTo({
                    scroller: this.$refs.menuview_menuList,
                    to: this.categoryHeight[index],
                    before: () => {
                        this.scrollIng = true;
                    },
                    after: () => {
                        this.scrollIng = false;
                    }
                });
            },
            categoryQuantity(category) {
                let quantity = 0;
                category.foods.forEach((food) => {
                    food.specfoods.forEach((spec) => {
                        quantity += spec.count || 0;
                    });
                });
                return quantity;
            },
            _selectedMenuCategory(index) {
                this.menu.forEach((category, i) => {
                    if (index === i) {
                        category.is_selected = true;
                    } else {
                        category.is_selected = false;
                    }
                });
            },
            _getMenuIndex(currentScrollTop) {
                for (let i = 0; i < this.categoryHeight.length; i++) {
                    let height1 = this.categoryHeight[i];
                    let height2 = this.categoryHeight[i + 1];
                    if (!height2 || (currentScrollTop >= height1 && currentScrollTop < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            _calculateHeight() {
                this.categoryHeight = [];
                let categoryList = this.$refs.menuview_menuList.getElementsByClassName('menu');
                let height = 0;
                this.categoryHeight.push(height);
                for (let i = 0; i < categoryList.length; i++) {
                    let item = categoryList[i];
                    height += item.clientHeight;
                    this.categoryHeight.push(height);
                }
            },
            scrollerTo(options) {
                let defaults = {
                    before() {
                    },
                    scroller: null,
                    to: 0,
                    delay: 300,
                    steps: 50,
                    after() {
                    }
                };
                let settings = Object.assign({}, defaults, options);
                let nowScrollTop = settings.scroller.scrollTop;
                let moved = 0;
                let distance = settings.to - nowScrollTop;
                let interval = settings.delay / settings.steps;
                let step = distance / settings.steps;
                let timeout = null;
                settings.before();

                function movestep() {
                    if (moved < settings.steps) {
                        moved++;
                        timeout = setTimeout(() => {
                            nowScrollTop += step;
                            settings.scroller.scrollTop = nowScrollTop;
                            movestep();
                        }, interval);
                    } else {
                        clearTimeout(timeout);
                        moved = 0;
                        settings.after();
                    }
                }

                movestep();
            }
        },
        components: {
            foodCountControl,
            shopcart,
            specpanel,
            foodAttributes,
            foodPrice,
            foodActivity
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .menu_view {
        padding-bottom: 1.28rem;
        padding-bottom: 12.8vw;
        background-color: #fff;
        .main {
            display: flex;
            height: 100%;
            .menucategory_category {
                padding: 0;
                list-style: none;
                flex: 0 0 2.053333rem;
                flex: 0 0 20.533333vw;
                height: 100%;
                background-color: #f8f8f8;
                li {
                    position: relative;
                    padding: .466667rem .2rem;
                    padding: 4.666667vw 2vw;
                    border-bottom: 1px solid #e8e8e8;
                    font-size: .346667rem;
                    color: #666;
                    transform: translateZ(0);
                    &.menucategory_active {
                        color: #333;
                        background-color: #fff;
                    }
                    .category_quantity {
                        position: absolute;
                        right: .08rem;
                        right: .8vw;
                        top: .08rem;
                        top: .8vw;
                        color: #fff;
                        background-image: -webkit-gradient(linear, right top, left top, from(#ff7416), color-stop(98%, #ff3c15));
                        background-image: -webkit-linear-gradient(right, #ff7416, #ff3c15 98%);
                        background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
                        border-radius: .2rem;
                        border-radius: 2vw;
                        font-size: .266667rem;
                        font-weight: 700;
                        text-align: center;
                        min-width: .373333rem;
                        min-width: 3.733333vw;
                        padding: 0 .106667rem;
                        padding: 0 1.066667vw;
                        line-height: .373333rem;
                    }
                    img {
                        width: .24rem;
                        width: 2.4vw;
                        height: .333333rem;
                        height: 3.333333vw;
                    }
                }
            }
            .menuview_menuList {
                position: relative;
                padding-left: .16rem;
                padding-left: 1.6vw;
                height: 100%;
                width: 7.946667rem;
                width: 79.466667vw;
                overflow-x: hidden;
                .menu {
                    padding-left: .106667rem;
                    padding-left: 1.066667vw;
                    .menu_category {
                        position: relative;
                        padding: .2rem .8rem .2rem 0;
                        padding: 2vw 8vw 2vw 0;
                        border-bottom: 1px solid #eee;
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                        .category_name {
                            margin-right: .133333rem;
                            margin-right: 1.333333vw;
                            font-weight: 700;
                            font-size: .32rem;
                            color: #666;
                            flex: none;
                        }
                        .category_desc {
                            flex: 1;
                            color: #999;
                            font-size: .266667rem;
                        }
                    }
                    .food_item {
                        position: relative;
                        margin: 0;
                        min-height: 3.066667rem;
                        min-height: 30.666667vw;
                        border-bottom: 1px solid #eee;
                        .food_root {
                            padding: .266667rem .266667rem .266667rem 0;
                            padding: 2.666667vw 2.666667vw 2.666667vw 0;
                            margin-bottom: 1px;
                            display: -webkit-box;
                            display: -webkit-flex;
                            display: -ms-flexbox;
                            display: flex;
                            min-height: 2.746667rem;
                            min-height: 27.466667vw;
                            position: relative;
                        }
                        .food_logo {
                            width: 2.026667rem;
                            width: 20.266667vw;
                            height: 2.026667rem;
                            height: 20.266667vw;
                            vertical-align: top;
                            flex: none;
                            margin-right: .266667rem;
                            margin-right: 2.666667vw;
                            position: relative;
                            .attrTag {
                                position: absolute;
                                top: 0;
                                left: 0;
                            }
                            img {
                                width: 100%;
                                border-radius: .053333rem;
                                border-radius: .533333vw;
                            }
                        }
                        .food_info {
                            flex: 1;
                            position: relative;
                            padding-bottom: .666667rem;
                            padding-bottom: 6.666667vw;
                            .food_name {
                                font-size: .4rem;
                                font-weight: 700;
                                line-height: 1.2;
                                overflow: hidden;
                                padding-right: .533333rem;
                                padding-right: 5.333333vw;
                                word-break: break-word;
                                .attrTag1 {
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                }
                            }
                            .foodPrice {
                                position: absolute;
                                bottom: 0;
                            }
                        }
                        .food_desc {
                            margin: .133333rem 0 !important;
                            margin: 1.333333vw 0 !important;
                            font-size: .253333rem;
                            color: #999;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 4.8rem;
                            width: 48vw;
                        }
                        .food_sales {
                            margin: .173333rem 0;
                            margin: 1.733333vw 0;
                            color: #666;
                            font-size: .293333rem;
                            line-height: 1;
                            span {
                                vertical-align: middle;
                                &:not(:first-child) {
                                    margin-left: .106667rem;
                                    margin-left: 1.066667vw;
                                }
                            }
                        }
                        .food_count_control {
                            position: absolute;
                            right: 0;
                            bottom: -.066667rem;
                            bottom: -.666667vw;

                        }
                    }
                }
            }
        }
    }

    .cartview {
        font-size: .426667rem;
    }

</style>
