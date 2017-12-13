<template>
    <div class="star">
        <i class="icon" :class="['size-' + size,itemClass]" v-for="itemClass in itemClasses"></i>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {
            size: {
                type: Number,
                default: 24
            },
            score: {
                type: Number,
                default: 5
            },
            num: {
                type: Number,
                default: 5
            }
        },
        // watch: {
        //     score: function (newVal, oldVal) {
        //         console.log(newVal, oldVal);
        //     }
        // },
        computed: {
            itemClasses() {
                let result = [];
                let number = Math.ceil(this.num);
                // 需要显示多少颗星
                if (this.score >= number) {
                    number = Math.ceil(this.score);
                    // console.warn("得星数大于总星数");
                }
                // 有多少颗完整的星
                for (let i = 0; i < Math.floor(this.score); i++) {
                    result.push('on');
                }
                // 是否有半星
                if (this.score < Math.round(this.score)) {
                    result.push('half');
                }
                while (result.length < number) {
                    result.push('off');
                }
                return result;
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    @import "../../common/style/mixin";

    .star {
        font-size: 0;
        .icon {
            display: inline-block;
            background-size: 100% 100%;
            &.size-24 {
                width: 12px;
                height: 12px;
                margin-left: 2px;
                .bg-image('./star24_off@2x.png', './star24_off@3x.png');
                &:first-child {
                    margin-left: 0;
                }
                &.on {
                    .bg-image('./star24_on@2x.png', './star24_on@3x.png');
                }
                &.half {
                    .bg-image('./star24_half@2x.png', './star24_half@3x.png');
                }
            }
            &.size-36 {
                width: 18px;
                height: 18px;
                margin-left: 4px;
                .bg-image('./star36_off@2x.png', './star36_off@3x.png');
                &:first-child {
                    margin-left: 0;
                }
                &.on {
                    .bg-image('./star36_on@2x.png', './star36_on@3x.png');
                }
                &.half {
                    .bg-image('./star36_half@2x.png', './star36_half@3x.png');
                }
            }
            &.size-48 {
                width: 24px;
                height: 24px;
                margin-left: 20px;
                .bg-image('./star48_off@2x.png', './star48_off@3x.png');
                &:first-child {
                    margin-left: 0;
                }
                &.on {
                    .bg-image('./star48_on@2x.png', './star48_on@3x.png');
                }
                &.half {
                    .bg-image('./star48_half@2x.png', './star48_half@3x.png');
                }
            }
        }
    }
</style>
