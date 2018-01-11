<template>
    <div class="food_activityRow">
        <span class="food_activity" v-if="food.activity">
            <span class="food_rate">{{discount}}</span>
            <span class="food_rate_text">{{mode?food.activity.applicable_quantity_detail_text:food.activity.applicable_quantity_text.split('，')[0]}}</span>
        </span>
        <span class="promotion_stock"
              v-if="promotionStock>0&&promotionStock<10">
            剩{{promotionStock}}份
        </span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {
            food: {
                type: Object,
                required: true,
                default: function () {
                    return {};
                }
            },
            mode: {
                type: Number,
                default: 0
            }
        },
        computed: {
            discount() {
                if (this.food.activity.benefit_text) {
                    return this.food.activity.benefit_text + (this.food.specfoods.length > 1 ? '起' : '');
                } else {
                    let discount = (this.food.specfoods[0].price / this.food.specfoods[0].original_price * 10).toFixed(1);
                    return (discount % 1 === 0 ? Math.round(discount) : discount) + '折' + (this.food.specfoods.length > 1 ? '起' : '');
                }
            },
            promotionStock() {
                let specfoods = this.food.specfoods;
                let num = 0;
                for (let i, len = specfoods.length; i < len; i++) {
                    if (specfoods[i].promotion_stock > 0) {
                        num += specfoods[i].promotion_stock;
                    }
                }
                return num;
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .food_activityRow {
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .food_activity {
            display: flex;
            > span {
                /*height: .346667rem;*/
                /*height: 3.466667vw;*/
                padding: 0.02rem .08rem;
                padding: 0.2vw .8vw;
                border: 1px solid #ff3c15;

                position: relative;
                /*line-height: .346667rem;*/
                font-size: .266667rem;
                color: transparent;
                white-space: nowrap;
            }
            .food_rate {
                background-image: -webkit-gradient(linear, left top, right top, from(#ff7416), color-stop(98%, #ff3c15));
                background-image: -webkit-linear-gradient(left, #ff7416, #ff3c15 98%);
                background-image: linear-gradient(90deg, #ff7416, #ff3c15 98%);
                border-top-left-radius: .013333rem;
                border-top-left-radius: .133333vw;
                border-top-right-radius: .013333rem;
                border-top-right-radius: .133333vw;
                color: #fff;
            }
            .food_rate_text {
                color: #f07373;
                border-left: none;
            }

        }
        .promotion_stock {
            background-color: rgba(255, 76, 13, .15);
            border-radius: .026667rem;
            border-radius: .266667vw;
            font-size: .266667rem;
            color: #ff4c0d;
            /*height: .346667rem;*/
            /*height: 3.466667vw;*/
            ppadding: 0.02rem .08rem;
            padding: 0.2vw .8vw;
            vertical-align: middle;
            margin-left: .08rem;
            margin-left: .8vw;
        }
    }
</style>
