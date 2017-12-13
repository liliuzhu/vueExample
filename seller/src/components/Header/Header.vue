<template>
    <div class="header">
        <div :style="{backgroundImage:'url('+seller.avatar+')'}" class="background"></div>
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="logo">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="'type_'+seller.supports[0].type"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div @click="detailShow=true" v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <!--<div class="background"></div>-->
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="text">优惠信息</div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="item in seller.supports">
                                <span class="icon" :class="'type_'+item.type"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="text">商家公告</div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div @click="detailShow=false" class="detail-close">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from 'components/star/star';

    export default {
        data() {
            return {
                detailShow: false
            };
        },
        props: {
            seller: {
                type: Object,
                required: true,
                default: function () {
                    return {};
                }
            }
        },
        // updated() {
        //     console.log(this.seller.score);
        // },
        components: {
            star
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    @import "../../common/style/mixin";

    .header {
        position: relative;
        color: #fff;
        background-color: rgba(7, 17, 27, .5);
        overflow: hidden;
        .background {
            position: absolute;
            background-repeat: no-repeat;
            background-size: cover;
            filter: blur(10px);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }
        .content-wrapper {
            position: relative;
            padding: 24px 12px 18px 24px;
            font-size: 0;
            .avatar {
                display: inline-block;
                vertical-align: top;
                img {
                    border-radius: 2px;
                    width: 64px;
                    height: 64px;
                }
            }
            .content {
                display: inline-block;
                margin-left: 16px;
                .title {
                    margin: 2px 0 8px 0;
                    font-size: 0;
                    .brand {
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        .bg-image('./brand@2x.png', './brand@3x.png');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name {
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                        vertical-align: top;
                        display: inline-block;
                        margin-left: 6px;
                    }
                }
                .description {
                    margin-bottom: 10px;
                    font-size: 12px;
                }
                .support {
                    .icon {
                        display: inline-block;
                        width: 12px;
                        line-height: 12px;
                        height: 12px;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        &.type_0, &.decrease {
                            .bg-image('./decrease_1@2x.png', './decrease_1@3x.png')
                        }
                        &.type_1, &.discount {
                            .bg-image('./discount_1@2x.png', './discount_1@3x.png')
                        }
                        &.type_2, &.special {
                            .bg-image('./special_1@2x.png', './special_1@3x.png')
                        }
                        &.type_3, &.invoice {
                            .bg-image('./invoice_1@2x.png', './invoice_1@3x.png')
                        }
                        &.type_4, &.guarantee {
                            .bg-image('./guarantee_1@2x.png', './guarantee_1@3x.png')
                        }
                    }
                    .text {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 10px;
                        margin-left: 4px;
                    }
                }
            }
            .support-count {
                position: absolute;
                right: 12px;
                bottom: 14px;
                padding: 0 8px;
                line-height: 24px;
                height: 24px;
                border-radius: 14px;
                background-color: rgba(0, 0, 0, 0.2);
                text-align: center;
                font-size: 0;
                .count {
                    vertical-align: top;
                    font-size: 10px;
                }
                .icon-keyboard_arrow_right {
                    line-height: 24px;
                    font-size: 10px;
                    margin-left: 2px;
                }
            }
        }
        .bulletin-wrapper {
            font-size: 0;
            line-height: 28px;
            height: 28px;
            padding: 0 12px;
            display: flex;
            align-items: center;
            background-color: rgba(7, 17, 27, .2);
            .bulletin-title {
                display: inline-block;
                width: 22px;
                height: 12px;
                .bg-image('./bulletin@2x.png', './bulletin@3x.png');
                background-size: 100%;
                background-repeat: no-repeat;
            }
            .bulletin-text {
                flex: 1;
                margin: 0 4px;
                display: inline-block;
                font-size: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .icon-keyboard_arrow_right {
                display: inline-block;
                width: 10px;
                height: 12px;
                font-size: 10px;
            }
        }
        .detail {
            position: fixed;
            z-index: 100;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
            background: rgba(7, 17, 27, .8);
            backdrop-filter: blur(10px);
            .detail-wrapper {
                min-height: 100%;
                .detail-main {
                    margin-top: 64px;
                    padding-bottom: 64px;
                    .name {
                        line-height: 16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .star-wrapper {
                        margin: 16px auto 18px auto;
                        text-align: center;
                    }
                    .title {
                        display: flex;
                        width: 80%;
                        margin: 18px auto 24px auto;
                        &::after, &::before {
                            content: "";
                            display: block;
                            flex: 1;
                            position: relative;
                            top: -6px;
                            border-bottom: 1px solid rgba(255, 255, 255, .2);
                        }
                        .text {
                            padding: 0 12px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }
                    .supports {
                        width: 80%;
                        margin: 0 auto;
                        .support-item {
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .icon {
                                display: inline-block;
                                vertical-align: top;
                                width: 16px;
                                height: 16px;
                                margin-right: 6px;
                                background-size: cover;
                                background-repeat: no-repeat;
                                &.type_0, &.decrease {
                                    .bg-image('./decrease_1@2x.png', './decrease_1@3x.png')
                                }
                                &.type_1, &.discount {
                                    .bg-image('./discount_1@2x.png', './discount_1@3x.png')
                                }
                                &.type_2, &.special {
                                    .bg-image('./special_1@2x.png', './special_1@3x.png')
                                }
                                &.type_3, &.invoice {
                                    .bg-image('./invoice_1@2x.png', './invoice_1@3x.png')
                                }
                                &.type_4, &.guarantee {
                                    .bg-image('./guarantee_1@2x.png', './guarantee_1@3x.png')
                                }
                            }
                            .text {
                                display: inline-block;
                                vertical-align: top;
                                font-size: 12px;
                                line-height: 16px;
                            }
                        }
                    }
                    .bulletin {
                        width: 80%;
                        margin: 0 auto;
                        .content {
                            font-size: 12px;
                            line-height: 24px;
                            font-weight: 200;
                        }

                    }

                }
            }
            .detail-close {
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto 0 auto;
                clear: both;
                font-size: 32px;
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: all 0.3s linear 0s;
            opacity: 1;
            background-color: rgba(7, 17, 27, .8);
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
            background-color: rgba(7, 17, 27, 0);
        }
    }
</style>
