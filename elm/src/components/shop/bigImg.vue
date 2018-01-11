<template>
    <transition name="fade1" @enter="enter">
        <div class="mask" v-if="bigImgInfo" @click="hide">
            <div class="img_wrap" :class="{showed:showed}" :style="startStyle">
                <img v-if="bigImgInfo.image_hash"
                     :src="analysismageHash(bigImgInfo.image_hash,true,750)">
            </div>
            <p class="buy_food" v-if="bigImgInfo.food_names">{{bigImgInfo.food_names.join(',')}}</p>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';

    export default {
        name: "",
        data() {
            return {
                bigImgInfo: false,
                startStyle: {},
                showed: false
            };
        },
        methods: {
            analysismageHash,
            enter() {
                setTimeout(() => {
                    this.showed = true;
                }, 10);
            },
            show(event, bigImgInfo) {
                var target = event.target;
                let rect = target.getBoundingClientRect();
                let left = rect.left + 'px';
                let top = rect.top + 'px';
                this.startStyle = {left, top};
                this.bigImgInfo = bigImgInfo;
            },
            hide() {
                // location.href = `baiduyunguanjia://guanjia/noui`;
                this.bigImgInfo = false;
                this.showed = false;
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .mask {
        z-index: 101;
        background: #000;
        .img_wrap {
            position: fixed;
            top: 0;
            left: 0;
            width: 1.893333rem;
            width: 18.933333vw;
            height: 1.893333rem;
            height: 18.933333vw;
            background: transparent;
            transition: all .3s;
            &.showed {
                top: 0 !important;
                left: 0 !important;
                width: 100%;
                height: 100%;
            }
            img {
                width: 100%;
                position: relative;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .buy_food {
            position: absolute;
            bottom: .466667rem;
            bottom: 4.666667vw;
            left: .266667rem;
            left: 2.666667vw;
            font-size: .266667rem;
            color: #fff;
        }
    }

    .fade1-enter-active, .fade1-leave-active {
        transition: none;
    }
</style>
