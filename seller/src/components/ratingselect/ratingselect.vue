<template>
    <div class="ratingselect">
        <div class="rating-type border-bottom">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType.value===2}">{{desc.all}}<span
                class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive"
                  :class="{'active':selectType.value===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
            <span @click="select(1,$event)" class="block negative"
                  :class="{'active':selectType.value===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent" :class="{'on':onlyContent.value}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        data() {
            return {};
        },
        props: {
            type: Array,
            default: function () {
                return [];
            },
            selectType: {
                type: Object,
                default: function () {
                    return {value: ALL};
                }
            },
            onlyContent: {
                type: Object,
                default: function () {
                    return {value: false};
                }
            },
            desc: {
                type: Object,
                default: function () {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            },
            ratings: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        computed: {
            positive() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                });
            },
            negative() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            select(index, event) {
                if (!event._constructed) {
                    return false;
                }
                this.selectType.value = index;
                this.$emit('changeFilter');
            },
            toggleContent(event) {
                if (!event._constructed) {
                    return false;
                }
                this.onlyContent.value = !this.onlyContent.value;
                this.$emit('changeFilter');
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    @import "../../common/style/mixin";

    .ratingselect {
        .rating-type {
            padding: 18px 0;
            margin: 0 18px;
            .border-bottom();
            font-size: 0;
            .block {
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
                color: rgb(77, 85, 93);
                font-size: 12px;
                &.active {
                    color: #fff;
                }
                .count {
                    margin-left: 2px;
                    font-size: 8px;
                }
                &.positive {
                    background: rgba(0, 160, 220, .2);
                    &.active {
                        background-color: rgb(0, 160, 220);
                    }
                }
                &.negative {
                    background-color: rgba(77, 85, 93, .2);
                    &.active {
                        background-color: rgb(77, 85, 93);
                    }
                }

            }
        }
        .switch {

            padding: 12px 18px;
            line-height: 24px;
            border-bottom: 1px solid rgba(7, 17, 27, .1);
            color: rgb(147, 153, 159);
            font-size: 0;
            &.on {
                .icon-check_circle {
                    color: #00c850;
                }
            }
            .icon-check_circle {
                display: inline-block;
                vertical-align: middle;
                margin-right: 4px;
                font-size: 24px;
            }
            .text {
                display: inline-block;
                vertical-align: middle;
                font-size: 12px;
            }
        }
    }
</style>
