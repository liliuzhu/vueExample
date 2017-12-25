<template>
    <div class="msite">
        <header class="header">
            <div class="head_wrapper" ref="head_wrapper">
                <div class="head_info">
                    <section class="location_wrapper">
                        <i class="ele-icon-mapmarker"></i><span class="location">{{locationInfo.name}}</span><i
                        class="ele-icon-eject"></i>
                    </section>
                    <aside class="weather">
                        <div>
                            <h3 class="temperature">{{weather.temperature}}°</h3>
                            <p class="daylight">{{weather.description}}</p>
                        </div>
                        <img class="weather_icon"
                             :src="weatherIcon"
                             alt="天气图标">
                    </aside>
                </div>
            </div>
            <div class="search_wrapper" ref="search_wrapper">
                <div class="seach" :style="{position:seachFixed?'fixed':'relative'}">
                    <a class="content" href="javascript:void(0);">
                        <i class="ele-icon-search"></i><span>搜索商家、商品名称</span>
                    </a>
                </div>
            </div>
            <div class="keywords">
                <div class="scroll_content">
                    <a v-for="(item,index) in hotwords" :key="index" class="word" href="javascript:void(0);">{{item.word}}</a>
                </div>
            </div>
        </header>
        <section class="food_class">
            <div class="food_entry">
                <mt-swipe v-if="foodEntrys&&foodEntrys.length" :prevent="true" :stopPropagation="true" :auto="0">
                    <mt-swipe-item :key="num" v-for="num in Math.ceil(foodEntrys.length/8)">
                        <a v-for="(entry,index) in foodEntrys.slice((num-1)*8,num*8)" class="entry_item"
                           href="javascript:void(0);">
                            <div class="container">
                                <img :src="analysismageHash(entry.image_hash,true,90)">
                            </div>
                            <span class="title">{{entry.name}}</span>
                        </a>
                    </mt-swipe-item>
                </mt-swipe>
                <div class="swipe_back" v-else></div>
            </div>
            <div class="new_user_activity">
                <img :src="analysismageHash(newUserLink.hash,true,710,178)">
            </div>
            <section id="activity-lego" class="activity-lego">
                <div class="activity-lego-1"></div>
                <div class="activity-lego-2"></div>
            </section>
        </section>
        <module-title title="推荐商家"></module-title>
        <shopList ref="shopList" :shopList="shopList"></shopList>
        <loadingShop v-show="showLoading"></loadingShop>
        <transition name="fade">
            <div @click="backTop" v-show="seachFixed" class="backTo_wrapper">
                <svg class="backTop_icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back-top.f9a58c0"></use>
                </svg>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';
    import moduleTitle from '@/components/moduleTitle/moduleTitle';
    import shopList from '@/components/shopList/shopList';
    import loadingShop from '@/components/loadingShop/loadingShop';

    export default {
        data() {
            return {
                weather: {},
                foodEntrys: [],
                hotwords: [],
                locationInfo: {name: '定位中...'},
                newUserLink: {hash: "3c845b2ec2855ed55d90c45bf9b07abbpng", url: "/newuser/"},
                shopList: [],
                initScrollTop: 0,
                seachFixed: false,
                showLoading: false
            };
        },
        props: {
            location: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        computed: {
            weatherIcon() {
                if (this.weather.image_hash) {
                    return analysismageHash(this.weather.image_hash, true, 69);
                }
                return './static/img/weather.jpeg';
            }
        },
        mounted() {
            this.initScrollTop = this.$refs.search_wrapper.offsetTop;
            document.addEventListener("scroll", this.listenCallback);
            this.getLoactonsAndWeather();
        },
        beforeDestroy() {
            document.removeEventListener("scroll", this.listenCallback);
        },
        watch: {
            location() {
                this.getLoactonsAndWeather();
            }
        },
        methods: {
            listenCallback() {
                window.throttle2(this.scrollCallback);
            },
            analysismageHash,
            scrollCallback() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.seachFixed = scrollTop > this.initScrollTop;
                let leaveTop = this.$refs.shopList.$el.getBoundingClientRect().bottom;
                let availHeight = window.screen.availHeight * (window.devicePixelRatio || 1);
                if (leaveTop < availHeight) {
                    this.loadMoreShop(this.shopList.length);
                }
            },
            backTop() {
                window.pageYOffset && (window.pageYOffset = 0);
                document.documentElement.scrollTop && (document.documentElement.scrollTop = 0);
                document.body.scrollTop && (document.body.scrollTop = 0);
            },
            getLoactonsAndWeather() {
                if (this.custom.hasServer) {
                    if (!this.location.longitude || !this.location.latitude) {
                        return false;
                    }
                    let url = '/api//batch/v2';
                    let longitude = this.location.longitude;
                    let latitude = this.location.latitude;
                    let data = {
                        requests: {
                            foodEntryData: {
                                method: "GET",
                                url: `/shopping/v2/entries?latitude=${latitude}&longitude=${longitude}&templates[]=main_template`
                            },
                            hotwords: {
                                method: "GET",
                                url: `/shopping/v3/hot_search_words?latitude=${latitude}&longitude=${longitude}`
                            },
                            weather: {
                                method: "GET",
                                url: `/bgs/weather/current?latitude=${latitude}&longitude=${longitude}`
                            }
                        }
                    };
                    /*
                    * 集中加载基本信息
                    * */
                    this.$ajax.post(url, data)
                        .then(res => {
                            let batch = res.data;
                            batch.weather.code === 200 && (this.weather = JSON.parse(batch.weather.body));
                            batch.foodEntryData.code === 200 && (this.foodEntrys = JSON.parse(batch.foodEntryData.body)[0].entries);
                            batch.hotwords.code === 200 && (this.hotwords = JSON.parse(batch.hotwords.body));
                            /*
                            *根据经纬度获取所在位置
                            */
                            let url = `/api/bgs/poi/reverse_geo_coding?latitude=${latitude}&longitude=${longitude}`;
                            return this.$ajax.get(url);
                        })
                        .then((res) => {
                            this.locationInfo = res.data;
                            this.loadMoreShop(0, 16);
                        })
                        .catch(err => {
                            console.error('batch/v2', err);
                        });
                } else {
                    let url = './simulate_data/msite/batch.json';
                    this.$ajax.get(url)
                        .then((res) => {
                            let batch = res.data;
                            // console.log(batch);
                            batch.weather.code === 200 && (this.weather = JSON.parse(batch.weather.body));
                            batch.foodEntryData.code === 200 && (this.foodEntrys = JSON.parse(batch.foodEntryData.body)[0].entries);
                            batch.hotwords.code === 200 && (this.hotwords = JSON.parse(batch.hotwords.body));
                            let url = './simulate_data/msite/reverse_geo_coding.json';
                            return this.$ajax.get(url);
                        })
                        .then((res) => {
                            this.locationInfo = res.data;
                            this.loadMoreShop(0, 16);
                        })
                        .catch((err) => {
                            console.error('reverse_geo_coding.json', err);
                        });
                }
            },
            loadMoreShop(offset = 0, limit = 8) {
                if (this.showLoading || !this.location.longitude || !this.location.latitude) {
                    return false;
                }
                this.showLoading = true;
                let longitude = this.location.longitude;
                let latitude = this.location.latitude;
                if (this.custom.hasServer) {
                    let url = `api/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}&extras[]=activities&extras[]=tags&extra_filters=home&terminal=h5`;
                    this.$ajax.get(url)
                        .then((res) => {
                            this.shopList = this.shopList.concat(res.data);
                            this.showLoading = false;
                        })
                        .catch((err) => {
                            console.error('loadMoreShop', err);
                        });
                } else {
                    let url = './simulate_data/msite/init.json';
                    this.$ajax.get(url)
                        .then((res) => {
                            this.shopList = this.shopList.concat(res.data);
                            this.showLoading = false;
                        })
                        .catch((err) => {
                            console.error('loadMoreShop.json', err);
                        });
                }
            }
        },
        components: {
            moduleTitle,
            shopList,
            loadingShop
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .msite {
        .header {
            color: #fff;
            background-image: -webkit-gradient(linear, left top, right top, from(#0af), to(#0085ff));
            background-image: -webkit-linear-gradient(left, #0af, #0085ff);
            background-image: linear-gradient(90deg, #0af, #0085ff);
        }
        .head_wrapper {
            padding: .266667rem .373333rem 0;
            padding: 2.666667vw 3.733333vw 0;
            .head_info {
                -webkit-box-pack: justify;
                -webkit-justify-content: space-between;
                -ms-flex-pack: justify;
                justify-content: space-between;
                height: .92rem;
                height: 9.2vw;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -ms-flex-align: center;
                align-items: center;
            }
            .location_wrapper {
                width: 60%;
                font-weight: 700;
                .ele-icon-mapmarker {
                    width: .346667rem;
                    width: 3.466667vw;
                    height: .413333rem;
                    height: 4.133333vw;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: .40rem;
                }
                .location {
                    font-weight: 700;
                    margin: 0 .133333rem;
                    margin: 0 1.333333vw;
                    font-size: .453333rem;
                    max-width: 80%;
                    min-width: 30%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: inline-block;
                    vertical-align: middle;
                }
                .ele-icon-eject {
                    font-size: .15rem;
                    display: inline-block;
                    vertical-align: middle;
                    transform: rotate(180deg);
                }
            }
            .weather {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -ms-flex-align: center;
                align-items: center;
                text-align: right;
                .temperature {
                    font-size: .373333rem;
                }
                .daylight {
                    font-size: .266667rem;
                }
                .weather_icon {
                    margin-left: .106667rem;
                    margin-left: 1.066667vw;
                    width: .733333rem;
                    width: 7.333333vw;
                    height: .733333rem;
                    height: 7.333333vw;
                }
            }
        }
        .search_wrapper {
            position: relative;
            height: 1.36rem;
            height: 13.6vW;
            top: 0;
            z-index: 999;
            .seach {
                position: relative;
                padding: .2rem .373333rem;
                padding: 2vw 3.733333vw;
                height: 1.36rem;
                height: 13.6vW;
                left: 0;
                right: 0;
                top: 0;
                background-image: -webkit-gradient(linear, left top, right top, from(#0af), to(#0085ff));
                background-image: -webkit-linear-gradient(left, #0af, #0085ff);
                background-image: linear-gradient(90deg, #0af, #0085ff);
                z-index: 999;
                .content {
                    display: flex;
                    width: 100%;
                    height: .96rem;
                    height: 9.6vw;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                    border-radius: .026667rem;
                    border-radius: .266667vw;
                    background: #fff;
                    color: #666;
                    font-size: .346667rem;
                    i, span {
                        font-weight: 700;
                        font-family: simsun;
                    }
                    .ele-icon-search {
                        margin-right: .2rem;
                        font-size: .34rem;
                    }
                }
            }
        }
        .keywords {
            height: .96rem;
            height: 9.6vw;
            padding: .2rem .373333rem .4rem;
            padding: 2vw 3.733333vw 4vw;
            .scroll_content {
                width: 100%;
                white-space: nowrap;
                overflow-x: auto;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
                &::-webkit-scrollbar {
                    display: none;
                }
                .word {
                    display: inline-block;
                    color: inherit;
                    margin-right: .4rem;
                    margin-right: 4vw;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        .food_class {
            margin-bottom: .213333rem;
            margin-bottom: 2.133333vw;
            font-size: 0;
            .food_entry {
                overflow: hidden;
                height: 4.72rem;
                height: 47.2vw;
                background: #fff;
                background-size: 100% auto;
                text-align: center;
                position: relative;
                .swipe_back {
                    background: #fff url('./food_entry.svg') no-repeat center center;
                    position: absolute;
                    height: 100%;
                    width: 100%;
                }
                .mint-swipe-item {
                    overflow: hidden;
                }
                .entry_item {
                    position: relative;
                    float: left;
                    margin-top: .293333rem;
                    margin-top: 2.933333vw;
                    width: 25%;
                    .container {
                        position: relative;
                        display: inline-block;
                        width: 1.2rem;
                        width: 12vw;
                        height: 1.2rem;
                        height: 12vw;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .title {
                        display: block;
                        margin-top: .133333rem;
                        margin-top: 1.333333vw;
                        color: #666;
                        font-size: .32rem;
                    }
                }
            }
            .new_user_activity {
                padding: 0 .266667rem;
                padding: 0 2.666667vw;
                background-color: #fff;
                img {
                    width: 9.466667rem;
                    width: 94.666667vw;
                    height: 2.373333rem;
                    height: 23.733333vw;
                }
            }
            .activity-lego {
                background: #fff;
                .activity-lego-1, .activity-lego-2 {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    padding: 0 .266667rem;
                    padding: 0 2.666667vw;
                }
                .activity-lego-1 {
                    margin-bottom: .08rem;
                    margin-bottom: .8vw;
                }
                .activity-lego-2 {
                    padding-bottom: .28rem;
                    padding-bottom: 2.8vw;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                }
            }
        }
        .backTo_wrapper {
            position: fixed;
            z-index: 100;
            right: .4rem;
            right: 4vw;
            bottom: 2rem;
            bottom: 20vw;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.133333rem;
            width: 11.333333vw;
            height: 1.133333rem;
            height: 11.333333vw;
            border: 1px solid #999;
            border-radius: 50%;
            background: #fff;
            .backTop_icon {
                display: block;
                width: .533333rem;
                width: 5.333333vw;
                height: .533333rem;
                height: 5.333333vw;
                fill: #999;
            }
        }
    }
</style>
<style rel="stylesheet/css" type="text/css" lang="less">
    .fade-enter-active, .fade-enter-active {
        transition: opacity .3s;
        opacity: 1;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .mint-swipe-indicator {
        margin: 0 .066667rem;
        margin: 0 .666667vw;
        &.is-active {
            background-color: #000;
            opacity: .6;
        }
    }
</style>
