<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <section class="hongbao_sheet mask" v-if="state">
            <div class="hongbao_body" @click.stop.prevent>
                <h3 class="hongbao_title">店铺专享红包</h3>
                <a href="javascript:void(0);" class="close" @click="hide"></a>
                <ul class="hongbao_list" v-if="hongbaos.length">
                    <li class="hongbao_item">
                        <h4 class="item_title">
                            <span>{{hongbaos[0].condition_type===1?'超级会员特权':'可领红包'}}</span>
                        </h4>
                        <div class="hongbao_class" v-for="(hongbao,Index) in hongbaos">
                            <section class="hongbao_detail" :class="{vip:hongbao.condition_type===1}">
                                <div class="detail_left">
                                    <div class="amount">
                                        <p><span>{{hongbao.amount}}</span></p>
                                    </div>
                                    <div class="hongbao_rule">
                                        <h3>
                                            <svg v-if="hongbao.condition_type">
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                     xlink:href="#svip-icon"></use>
                                            </svg>
                                            {{hongbao.name}}
                                        </h3>
                                        <p>{{hongbao.description}}</p>
                                    </div>
                                </div>
                                <div class="detail_right">
                                    <div class="operation">
                                        <p v-if="hongbao.exchange_tips">{{hongbao.exchange_tips.text}}</p>
                                        <a class="exchange" href="javascript:void(0);">{{hongbao.exchange_type?'兑换':'领取'}}</a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </li>
                </ul>
                <backgroundLoading v-else></backgroundLoading>
            </div>
        </section>
    </transition>
</template>
<script type="text/ecmascript-6">
    import backgroundLoading from '@/components/backgroundLoading/backgroundLoading';

    export default {
        name: "",
        data() {
            return {
                ID: this.$route.query.id,
                state: false,
                hongbaos: []
            };
        },
        props: {
            location: {
                type: Object,
                required: true
            }
        },
        watch: {
            location() {
                this._getHongBaoInfo();
            }
        },
        mounted() {
            this._getHongBaoInfo();
        },
        methods: {
            afterLeave() {
                this.hongbaos = [];
            },
            afterEnter() {
                this._getHongBaoInfo();
            },
            hide() {
                this.state = false;
            },
            show() {
                this.state = true;
            },
            _getHongBaoInfo() {
                if (!this.location.latitude || !this.location.longitude || !this.state) {
                    return false;
                }
                let latitude = this.location.latitude;
                let longitude = this.location.longitude;

                let serverUrl = `/api/shopping/v1/restaurants/${this.ID}/exclusive_hongbao/detail?latitude=${latitude}&longitude=${longitude}&code=` + Math.random();
                let localUrl = `./simulate_data/shop/exclusiveHongbao.json`;
                let url = this.custom.hasServer ? serverUrl : localUrl;
                this.$ajax.get(url)
                    .then((res) => {
                        this.hongbaos = res.data.sort((a, b) => {
                            return b.condition_type - a.condition_type;
                        });
                    })
                    .catch((err) => {
                        console.err('restaurants' + err);
                    });
            }
        },
        components: {
            backgroundLoading
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .hongbao_sheet {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 99;
        box-sizing: border-box;
        .hongbao_body {
            padding: 0 .16rem;
            padding: 0 1.6vw;
            position: absolute;
            height: 50%;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: 1;
            background: #f5f5f5;
            will-change: transform;
            display: flex;
            flex-direction: column;
            .hongbao_title {
                /*position: absolute;*/
                z-index: 1;
                padding-top: .4rem;
                padding-top: 4vw;
                height: 1.333333rem;
                height: 13.333333vw;
                width: 100%;
                text-align: center;
                font-size: .453333rem;
                font-weight: 700;
                color: #000;
                background: #f5f5f5;
            }
            .hongbao_list {
                flex: 1;
                overflow-y: auto;
                /*padding-top: 1.333333rem;*/
                /*padding-top: 13.333333vw;*/
                height: 100%;
                font-weight: 700;
                -webkit-overflow-scrolling: touch;
            }
            .hongbao_item {
                padding-bottom: .4rem;
                padding-bottom: 4vw;
                .item_title {
                    padding: 0 .213333rem;
                    padding: 0 2.133333vw;
                    font-size: .32rem;
                    color: #666;
                    > span {
                        font-weight: 700;
                        font-size: .32rem;
                        color: #666;
                    }
                }
                /*.hongbao_detail {*/
                /*display: flex;*/
                /*position: relative;*/
                /*margin: .266667rem auto 0;*/
                /*margin: 2.666667vw auto 0;*/
                /*padding-left: .4rem;*/
                /*padding-left: 4vw;*/
                /*width: 9.333333rem;*/
                /*width: 93.333333vw;*/
                /*height: 2.533333rem;*/
                /*height: 25.333333vw;*/
                /*background: #fff;*/
                /*border: .013333rem solid #f5d9d5;*/
                /*border: .133333vw solid #f5d9d5;*/
                /*border-radius: .026667rem;*/
                /*border-radius: .266667vw;*/

                /*border: 1px solid #eae5b9;*/
                /*background: #fff4be;*/
                /*}*/

            }
        }
    }

    .hongbao_detail {
        display: flex;
        position: relative;
        margin: .266667rem auto 0;
        margin: 2.666667vw auto 0;
        padding-left: .4rem;
        padding-left: 4vw;
        width: 9.333333rem;
        width: 93.333333vw;
        height: 2.533333rem;
        height: 25.333333vw;
        background: #fff;
        border: .013333rem solid #f5d9d5;
        border: .133333vw solid #f5d9d5;
        border-radius: .026667rem;
        border-radius: .266667vw;
        &.vip {
            border: 1px solid #eae5b9;
            background: #fff4be;
            .detail_left {
                &::before, &::after {
                    border: 1px solid #eae5b9;
                }
                .amount {
                    color: #594519;
                }
                .hongbao_rule {
                    > h3 {
                        color: #594519;
                    }
                    > p {
                        color: #735b27;
                    }
                }
            }
            .detail_right{
                .operation{
                    .exchange{
                        /*background-color: #5d4a1d;*/
                        color: #ffeeab;
                        background-color: rgba(89, 69, 25, .5);
                    }
                }
            }
        }
        &::before {
            width: 1px;
            height: 2.026667rem;
            height: 20.266667vw;
            content: "";
            position: absolute;
            top: 50%;
            right: 2.346667rem;
            right: 23.466667vw;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            border: 1px dashed #eec2b7;
            border: 1px dashed rgba(93, 74, 29, .2);
        }
        .detail_left {
            position: relative;
            display: flex;
            flex: 1;
            padding-right: .266667rem;
            padding-right: 2.666667vw;
            &::before, &::after {
                content: "";
                position: absolute;
                right: 0;
                width: .266667rem;
                width: 2.666667vw;
                height: .133333rem;
                height: 1.333333vw;
                background: #f5f5f5;
                transform: translateX(50%);
                z-index: 10;
                border: 1px solid #f5d9d5;
            }
            &::before {
                bottom: -1px;
                border-bottom: none;
                border-radius: .266667rem .266667rem 0 0;
                border-radius: 2.666667vw 2.666667vw 0 0;
                border-bottom: none;
            }
            &::after {
                top: -1px;
                border-top: none;
                border-radius: 0 0 .266667rem .266667rem;
                border-radius: 0 0 2.666667vw 2.666667vw;
                border-top: none;
            }
            .amount {
                color: #ff5339;
                justify-content: center;
                align-items: center;
                font-size: .853333rem;
                display: flex;
                p {
                    display: flex;
                    align-items: flex-start;
                    &:before {
                        margin-top: .133333rem;
                        margin-top: 1.333333vw;
                        content: "\A5";
                        font-weight: 400;
                        font-size: .426667rem;
                    }
                    span {
                        font-weight: 700;
                    }
                }
            }
            .hongbao_rule {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: .346667rem;
                margin-left: 3.466667vw;
                word-wrap: break-word;
                word-break: break-all;
                > h3 {
                    font-size: .4rem;
                    font-weight: 700;
                    color: #333;
                    > svg {
                        fill: #f8ca45;
                        width: .4rem;
                        width: 4vw;
                        height: .32rem;
                        height: 3.2vw;
                    }
                }
                > p {
                    font-size: .293333rem;
                    margin-top: .186667rem;
                    margin-top: 1.866667vw;
                    color: #666;
                }
            }
        }
        .detail_right {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 2.346667rem;
            flex: 0 0 23.466667vw;
            overflow: hidden;
            .operation {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: .346667rem;
                > P {
                    font-size: .293333rem;
                    color: #735b27;
                }
                .exchange {
                    margin-top: .08rem;
                    margin-top: .8vw;
                    display: inline-block;
                    width: 1.6rem;
                    width: 16vw;
                    height: .693333rem;
                    height: 6.933333vw;
                    color: #fff;
                    text-align: center;
                    line-height: .693333rem;
                    line-height: 6.933333vw;
                    border-radius: .426667rem;
                    border-radius: 4.266667vw;
                    background: #ff5339;
                }
            }
        }
    }

    .close {
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
        z-index: 9999;
    }

    .fade-enter-active, .fade-leave-active {
        .hongbao_body {
            transition: transform .3s;
        }

    }

    .fade-enter, .fade-leave-to {
        .hongbao_body {
            transform: translateY(100%);
        }
    }
</style>
