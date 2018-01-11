<template>
    <!--<component :is="''"></component>-->
    <span class="food_spicy_icon" v-if="mode===1&&analysisAttributes('辣')"></span>
    <span class="attrTag-attrTag attr_ghost" v-else-if="mode===0&&analysisAttributes('招牌')">
    招牌
    </span>
    <span class="attrTag-attrTag attr_new attr_new" v-else-if="mode===0&&analysisAttributes('新')">
    新品
    </span>

</template>
<script type="text/ecmascript-6">
    const icon = {template: `<span class="food_spicy_icon"></span>`};
    export default {
        data() {
            return {};
        },
        props: {
            foodAttributes: Array,
            required: true,
            default: function () {
                return [];
            },
            mode: {
                type: Number,
                default: 0
            }
        },
        methods: {
            analysisAttributes(keyword) {
                if (!keyword || !this.foodAttributes.length) {
                    return false;
                }
                for (let i = 0, len = this.foodAttributes.length; i < len; i++) {
                    if (this.foodAttributes[i].icon_name.indexOf(keyword) !== -1) {
                        return true;
                    }
                }
                return false;
            }
        },
        components: {
            icon
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .food_attributes {
        height: 0;
        width: 0;
        overflow: visible;
    }

    .food_spicy_icon {
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        height: .453333rem;
        height: 4.533333vw;
        width: .453333rem;
        width: 4.533333vw;
        background: url(./spicy_icon.png) no-repeat center center;
        background-size: .346667rem;
        background-size: 3.466667vw;
        background-position: 100%;
    }

    .attrTag-attrTag {
        /*width: .64rem;*/
        /*width: 6.4vw;*/
        /*height: .346667rem;*/
        /*height: 3.466667vw;*/
        line-height: .346667rem;
        line-height: 3.46667vw;
        padding: 0.03rem 0.05rem;
        text-align: center;
        font-size: .266667rem;
        white-space: nowrap;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
        border-top-left-radius: .053333rem;
        border-top-left-radius: .533333vw;
        border-bottom-right-radius: .053333rem;
        border-bottom-right-radius: .533333vw;
        color: #fff;
        &.attr_ghost {
            background-image: -webkit-linear-gradient(315deg, #ffae1b, #f57751);
            background-image: linear-gradient(135deg, #ffae1b, #f57751);
        }
        &.attr_new {
            background-image: -webkit-linear-gradient(315deg, #7ae336, #00c180);
            background-image: linear-gradient(135deg, #7ae336, #00c180);
        }
    }
</style>
