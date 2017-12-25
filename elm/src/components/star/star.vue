<template>
    <div class="star">
        <div class="rating_gray">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star-gray.cc081b9"></use>
            </svg>
        </div>
        <div class="rating_actived" :style="{width:rating*20+'%'}">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star-actived.d4c54d1"></use>
            </svg>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props: {
            rating: {
                type: Number,
                default: 0
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .star {
        position: relative;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
        .rating_gray, .rating_actived {
            display: flex;
            svg {
                width: 1.493333rem;
                width: 14.933333vw;
                height: .266667rem;
                height: 2.666667vw;
                -webkit-flex: none;
                flex: none;
            }
        }
        .rating_actived {
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
        }
    }
</style>
