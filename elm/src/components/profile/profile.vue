<template>
    <div class="profile">
        <pageHeader title="我的" :callback="back"></pageHeader>
        <section class="profile_info">
            <span class="profile_avatar">
               <svg>
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
               </svg>
            </span>
            <div class="profile_login">
                <h1 class="title">登录/注册</h1>
                <p class="alert">
                    <svg fill="#fff">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                    </svg>
                    <span>登录后享受更多特权</span>
                </p>
            </div>
            <span class="to_login">
                <svg fill="#fff">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </span>
        </section>
        <div class="red_packets">
            <a href="javascript:;" class="item_packets">
                <p>
                    <svg fill="#ff5f3e">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#luckybag"></use>
                    </svg>
                </p>
                <p class="text">红包</p>
            </a>
            <a href="javascript:;" class="item_packets">
                <p>
                    <svg fill="#6ac20b">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-coins"></use>
                    </svg>
                </p>
                <p class="text">金币</p>
            </a>
        </div>

        <section class="profile_options">
            <a href="javascript:;" class="option">
                <aside class="option_icon">
                    <svg fill="#4aa5f0">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#address"></use>
                    </svg>
                </aside>
                <div class="option_text">
                    我的地址
                    <span class="option_detail"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                          xlink:href="#arrow-right"></use></svg></span></div>
            </a>
        </section>
        <section class="profile_options">
            <a href="javascript:;" class="option">
                <aside class="option_icon">
                    <svg fill="#fc7b53">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                    </svg>
                </aside>
                <div class="option_text">
                    金币商城
                    <span class="option_detail"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                          xlink:href="#arrow-right"></use></svg></span></div>
            </a>
            <a href="javascript:;" class="option">
                <aside class="option_icon">
                    <svg fill="">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#commend"></use>
                    </svg>
                </aside>
                <div class="option_text">
                    分享拿5元现金
                    <span class="option_detail"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                          xlink:href="#arrow-right"></use></svg></span></div>
            </a>
        </section>

        <section class="profile_options">
            <a href="javascript:;" class="option">
                <aside class="option_icon">
                    <svg fill="#4aa5f0">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                    </svg>
                </aside>
                <div class="option_text">
                    我的客服
                    <span class="option_detail"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                          xlink:href="#arrow-right"></use></svg></span></div>
            </a>
            <a href="javascript:;" class="option">
                <aside class="option_icon">
                    <svg fill="#3cabff">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                    </svg>
                </aside>
                <div class="option_text">
                    下载饿了么APP
                    <span class="option_detail"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                          xlink:href="#arrow-right"></use></svg></span></div>
            </a>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import pageHeader from '@/components/pageHeader/pageHeader';

    export default {
        data() {
            return {};
        },
        methods: {
            back() {
                this.$router.back();
            }
        },
        components: {
            pageHeader
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .profile {
        .profile_info {
            display: flex;
            background-image: -webkit-gradient(linear, left top, right top, from(#0af), to(#0085ff));
            background-image: -webkit-linear-gradient(left, #0af, #0085ff);
            background-image: linear-gradient(90deg, #0af, #0085ff);
            padding: .666667rem .4rem;
            padding: 6.666667vw 4vw;
            color: #fff;
            align-items: center;
            .profile_avatar, .profile_avatar svg {
                width: 1.6rem;
                width: 16vw;
                height: 1.6rem;
                height: 16vw;
            }
            .profile_avatar {
                font-size: 1.6rem;
                line-height: 1.6rem;
                line-height: 16vw;
                border-radius: 50%;
                background: #fff;
                display: inline-block;
                vertical-align: middle;
            }
            .profile_login {
                margin-left: .48rem;
                margin-left: 4.8vw;
                flex-grow: 1;
                > * {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .title {
                    font-size: .56rem;
                    margin-bottom: .213333rem;
                    margin-bottom: 2.133333vw;
                    font-weight: 700;
                }
                .alert {
                    display: flex;
                    align-items: center;
                    font-size: .32rem;
                    svg {
                        margin-right: .066667rem;
                        margin-right: .666667vw;
                        width: .186667rem;
                        width: 1.866667vw;
                        height: .293333rem;
                        height: 2.933333vw;
                    }
                }
            }
            .to_login {
                svg {
                    width: .266667rem;
                    width: 2.666667vw;
                    height: .56rem;
                    height: 5.6vw;
                }
            }
        }
        .red_packets{
            display: table;
            width: 100%;
            height: 2.24rem;
            height: 22.4vw;
            border-bottom: 1px solid #ddd;
            background-color: #fff;
            .item_packets{
                &:not(:last-child) {
                    border-right: 1px solid #ddd;
                }
                display: table-cell;
                width: 33.3333%;
                vertical-align: middle;
                text-align: center;
                svg{
                    width: .693333rem;
                    width: 6.933333vw;
                    height: .693333rem;
                    height: 6.933333vw;
                }
                .text{
                    margin-top: .133333rem;
                    margin-top: 1.333333vw;
                    font-size: .32rem;
                    line-height: .373333rem;
                    line-height: 3.733333vw;
                    font-weight: 500;
                    color: #666;
                    font-weight: 700;
                }
            }
        }
        .profile_options{
            margin-top: .266667rem;
            margin-top: 2.666667vw;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            font-size: .426667rem;
            line-height: .453333rem;
            line-height: 4.533333vw;
            background: #fff;
            .option{
                font-size: .426667rem;
                color: #333;
                display: flex;
                align-items: center;
                padding-left: .666667rem;
                padding-left: 6.666667vw;
                .option_icon{
                    margin-left: -.266667rem;
                    margin-left: -2.666667vw;
                    margin-right: .266667rem;
                    margin-right: 2.666667vw;
                    svg{
                        width: .48rem;
                        width: 4.8vw;
                        height: .48rem;
                        height: 4.8vw;
                    }
                }
                &:not(:last-child) .option_text {
                    border-bottom: 1px solid #eee;
                }
                .option_text{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: .373333rem .266667rem .373333rem 0;
                    padding: 3.733333vw 2.666667vw 3.733333vw 0;
                    .option_detail svg{
                        width: .266667rem;
                        width: 2.666667vw;
                        height: .266667rem;
                        height: 2.666667vw;
                        fill: #bbb;
                    }
                }
            }
        }
    }
</style>
