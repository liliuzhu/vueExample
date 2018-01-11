<template>
    <transition name="fade">
        <section class="activity_sheet mask" v-if="state" @click="hide">
            <div class="activity_body" @click.stop.prevent>
                <h2 class="activity_title">优惠活动</h2>
                <ul class="activity_list">
                    <li class="activity_item" v-for="activitie in activities">
                        <span class="activity_icon" :style="{backgroundColor:'#'+activitie.icon_color}">{{activitie.icon_name}}</span>
                        <span class="activity_desc">{{activitie.tips}}</span>
                    </li>
                </ul>
                <a href="javascript:void(0);" class="close" @click="hide"></a>
            </div>
        </section>
    </transition>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "",
        data() {
            return {
                state: false
            };
        },
        props: {
            activities: {
                type: Array,
                required: true,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            hide() {
                this.state = false;
            },
            show() {
                this.state = true;
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .activity_sheet {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        /*width: 100%;*/
        /*height: 100%;*/
        z-index: 99;
        .activity_body {
            position: absolute;
            background-color: #f5f5f5;
            -webkit-box-shadow: 0 -.013333rem .066667rem 0 rgba(0, 0, 0, .4);
            -webkit-box-shadow: 0 -.133333vw .666667vw 0 rgba(0, 0, 0, .4);
            box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, .4);
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            padding: .533333rem .693333rem;
            padding: 5.333333vw 6.933333vw;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            will-change: transform;
            .activity_title {
                text-align: center;
                font-size: .453333rem;
                font-weight: 600;
                margin-bottom: .413333rem;
                margin-bottom: 4.133333vw;
            }
            .activity_list {
                height: 5.08rem;
                height: 50.8vw;
                overflow-y: auto;
            }
            .activity_item {
                margin-bottom: .306667rem;
                margin-bottom: 3.066667vw;
                align-items: flex-start;
                .activity_icon {
                    height: .426667rem;
                    height: 4.266667vw;
                    line-height: .426667rem;
                    line-height: 4.266667vw;
                    margin-top: .04rem;
                    margin-top: .4vw;
                    font-size: .32rem;
                    padding: .053333rem .16rem;
                    padding: .533333vw 1.6vw;
                    background-color: rgb(112, 188, 70);
                }
                .activity_desc {
                    font-size: .346667rem;
                    line-height: 1.38;
                }
            }
            .close{
                display: block;
                position: absolute;
                height: .64rem;
                height: 6.4vw;
                width: .64rem;
                width: 6.4vw;
                right: .266667rem;
                right: 2.666667vw;
                top: .266667rem;
                top: 2.666667vw;
                background: transparent url('./close.png') no-repeat center center;
                background-size: 70%;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        .activity_body {
            transition: transform .3s;
        }

    }

    .fade-enter, .fade-leave-to {
        .activity_body {
            transform: translateY(100%);
        }
    }
</style>
