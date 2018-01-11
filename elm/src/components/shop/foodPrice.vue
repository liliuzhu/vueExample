<template>
    <strong class="food_price">
        <span class="new_price">{{minPrice}}</span>
        <span v-if="food.specfoods.length>1" class="lowest_price">起</span>
        <del v-else-if="food.specfoods[0].original_price" class="origin_price">
            ¥{{food.specfoods[0].original_price}}
        </del>
    </strong>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                // minPrice: 0
            };
        },
        props: {
            food: Object,
            required: true,
            default: function () {
                return {};
            }
        },
        // mounted() {
        //     this._getMinPrice();
        // },
        // watch: {
        //     food() {
        //         this._getMinPrice();
        //     }
        // },
        computed: {
            minPrice() {
                if (this.food.specfoods && this.food.specfoods.length > 0) {
                    let specPrice = this.food.specfoods.map((spec) => {
                        return spec.price;
                    });
                    return Math.min.apply(Math, specPrice);
                } else {
                    return 0;
                }
            }
        },
        methods: {
            _getMinPrice() {
                let specPrice = this.food.specfoods.map((spec) => {
                    return spec.price;
                });
                this.minPrice = Math.min.apply(Math, specPrice);
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .food_price {
        font-weight: 700;
        font-size: .426667rem;
        line-height: .426667rem;
        line-height: 4.266667vw;
        color: #f60;
        padding-bottom: .093333rem;
        padding-bottom: .933333vw;
        display: flex;
        align-items: baseline;
        /*position: absolute;*/
        /*bottom: 0;*/
        &:before {
            font-weight: 400;
            content: "\A5";
            font-size: .32rem;
            margin-right: .053333rem;
            margin-right: .533333vw;
            display: inline-block;
        }
        .new_price {
            margin-right: .106667rem;
            margin-right: 1.066667vw;
            font-weight: 700;
        }
        .lowest_price {
            font-weight: 500;
            font-size: .32rem;
            color: #ff5339;
        }
        .origin_price {
            font-size: .32rem;
            color: #666;
            font-weight: 400;
            vertical-align: top;
        }
    }
</style>
