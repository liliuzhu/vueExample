<template>
    <div class="shop_rate scroller" @scroll="_listenCallback">
        <section class="brief_rate">
            <div class="brief_rate_left">
                <strong class="score" v-if="scores.overall_score">{{scores.overall_score.toFixed(1)}}</strong>
                <p class="score_title">综合评价</p>
                <p class="score_desc" v-if="scores.compare_rating">高于周边商家{{(scores.compare_rating*100).toFixed(1)}}%</p>
            </div>
            <ul class="brief_rate_right">
                <li class="rate_item">
                    <span class="item_title">服务态度</span>
                    <span class="item_content">
                        <star :rating="scores.service_score"></star><span class="item_score"
                                                                          v-if="scores.service_score">{{scores.service_score.toFixed(1)}}</span>
                    </span>
                </li>
                <li class="rate_item">
                    <span class="item_title">菜品评价</span>
                    <span class="item_content">
                        <star :rating="scores.food_score"></star><span class="item_score" v-if="scores.food_score">{{scores.food_score.toFixed(1)}}</span>
                    </span>
                </li>
                <li class="rate_item">
                    <span class="item_title">送达时间</span>
                    <span class="item_content">
                        {{scores.deliver_time}}分钟
                    </span>
                </li>
            </ul>
        </section>
        <section class="rate_wrapper">
            <div class="tag_wrap" v-if="tags">
                <ul class="tag_list">
                    <li class="tag_item" @click="changeTag(index);"
                        :class="{unsatisfied:tag.unsatisfied,active:index===activeTag}"
                        v-for="(tag,index) in tags">
                        {{tag.name}}({{tag.count}})
                    </li>
                </ul>
            </div>
            <ul class="rating_list" ref="ratingList">
                <li class="rating_item" v-for="rating in ratingsClass[activeTag]">
                    <div class="rating_content">
                        <img :src="analysismageHash(rating.avatar||'cf5d0b0f2fc83f3ac3e4a0cfae891256png',true,60)"
                             class="avatar">
                        <div class="comment_block">
                            <h3 class="user_name">{{rating.username}}</h3>
                            <small class="order_time">{{rating.rated_at}}</small>
                        </div>
                        <div>
                            <star :rating="rating.rating"></star>
                            <span class="comment_inline">{{rating.time_spent_desc}}</span>
                        </div>
                        <a class="comment_msg" v-if="rating.rating_text">{{rating.rating_text}}</a>
                        <ul class="img_list">
                            <li v-for="image in rating.order_images">
                                <img @click="lookBigImg($event,image)" :src="analysismageHash(image.image_hash,true,142)"
                                     :alt="image.food_names">
                            </li>
                        </ul>
                        <ul class="food_list">
                            <li v-for="rat in rating.food_ratings">{{rat.rate_name}}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
        <bigImg ref="bigImg"></bigImg>
    </div>
</template>
<script type="text/ecmascript-6">
    import {analysismageHash} from '../../common/js/util.js';
    import star from '@/components/star/star';
    import Vue from 'vue';
    import bigImg from './bigImg';

    export default {
        name: "",
        data() {
            return {
                ID: this.$route.query.id,
                scores: {},
                tags: [],
                ratingsClass: [],
                activeTag: 0,
                rateLoading: false
            };
        },
        mounted() {
            this._getShopScores();
        },
        methods: {
            analysismageHash,
            lookBigImg(event, bigImgInfo) {
                this.$refs.bigImg.show(event, bigImgInfo);
            },
            _listenCallback(event) {
                window.throttle2(() => {
                    this._scrollCallback(event);
                });
            },
            changeTag(index) {
                this.activeTag = index;
                if (!this.ratingsClass[index].length) {
                    this.getMoreRateings();
                }
            },
            getMoreRateings() {
                if (this.rateLoading) {
                    return false;
                }
                this.rateLoading = true;
                let serverUrl = `/api/ugc/v3/restaurants/${this.ID}/ratings?has_content=true&tag_name=${this.tags[this.activeTag].name}&offset=${this.ratingsClass[this.activeTag].length}&limit=8`;
                let localUrl = `./simulate_data/shop/ratings.json`;
                let url = this.custom.hasServer ? serverUrl : localUrl;
                this.$ajax.get(url)
                    .then((res) => {
                        let newArr = this.ratingsClass[this.activeTag].concat(res.data);
                        Vue.set(this.ratingsClass, this.activeTag, newArr);
                        this.rateLoading = false;
                    })
                    .catch((err) => {
                        this.rateLoading = false;
                        console.error('tag_name' + err);
                    });
            },
            _scrollCallback(event) {
                let scrollTop = event.target.scrollTop;
                this.$emit("containerScroll", scrollTop, 'rate');
                let leaveTop = this.$refs.ratingList.getBoundingClientRect().bottom;
                let availHeight = this.custom.availHeight;
                if (leaveTop <= availHeight + 10) {
                    this.getMoreRateings();
                }
            },
            _getShopScores() {
                let serverUrl = `/api/ugc/v2/restaurants/${this.ID}/ratings/scores`;
                let localUrl = `./simulate_data/shop/scores.json`;
                let url = this.custom.hasServer ? serverUrl : localUrl;
                this.$ajax.get(url)
                    .then((res) => {
                        this.scores = res.data;
                        let serverUrl = `/api/ugc/v2/restaurants/${this.ID}/ratings/tags`;
                        let localUrl = `./simulate_data/shop/tags.json`;
                        let url = this.custom.hasServer ? serverUrl : localUrl;
                        return this.$ajax.get(url);
                    })
                    .then((res) => {
                        this.tags = res.data;
                        this.tags.map((tag, i) => {
                            Vue.set(this.ratingsClass, i, []);
                        });
                        this.getMoreRateings();
                    })
                    .catch((err) => {
                        console.error('scores' + err);
                    });
            }
        },
        components: {
            star,
            bigImg
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .shop_rate {
        .brief_rate {
            background-color: #fff;
            margin-bottom: .266667rem;
            margin-bottom: 2.666667vw;
            padding: .4rem;
            padding: 4vw;
            font-size: .36rem;
            display: flex;
            align-items: center;
            color: #666;
            border-bottom: 1px solid #eee;
            .brief_rate_left {
                padding-right: .4rem;
                padding-right: 4vw;
                border-right: 1px solid #ddd;
                text-align: center;
                line-height: 1.5;
                .score {
                    font-size: .64rem;
                    line-height: 1;
                    font-weight: 400;
                    color: #ff6000;
                    font-weight: 700;
                    display: block;
                }
                .score_title {
                    font-size: .32rem;
                }
                .score_desc {
                    font-size: .266667rem;
                    color: #999;
                    line-height: 1.5;
                }
            }
            .brief_rate_right {
                flex: 1;
                font-size: .373333rem;
                line-height: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                .rate_item {
                    font-size: 0;
                    width: 80%;
                    margin: .133333rem 0;
                    margin: 1.333333vw 0;
                    .item_title {
                        font-size: .32rem;
                    }
                    .item_content {
                        padding-left: .266667rem;
                        padding-left: 2.666667vw;
                        font-size: .32rem;
                    }
                    .item_score {
                        padding-left: .266667rem;
                        padding-left: 2.666667vw;
                        color: #f60;
                        font-size: .32rem;
                    }
                }
            }
        }
        .rate_wrapper {
            background-color: #fff;
            padding: .266667rem .32rem 0;
            padding: 2.666667vw 3.2vw 0;
            font-size: .36rem;
            .tag_wrap {
                padding-bottom: .266667rem;
                padding-bottom: 2.666667vw;
                border-bottom: 1px solid #ddd;
                .tag_item {
                    display: inline-block;
                    padding: 0 .24rem;
                    padding: 0 2.4vw;
                    height: .746667rem;
                    height: 7.466667vw;
                    line-height: .746667rem;
                    line-height: 7.466667vw;
                    margin: .093333rem;
                    margin: .933333vw;
                    font-size: .32rem;
                    border-radius: .053333rem;
                    border-radius: .533333vw;
                    color: #6d7885;
                    background-color: #ebf5ff;
                    &.unsatisfied {
                        color: #aaa;
                        background-color: #f5f5f5;
                        &.active {
                            color: #fff;
                            background-color: #ccc;
                        }
                    }
                    &.active {
                        color: #fff;
                        background-color: #0097ff;
                    }
                }
            }
            .rating_item {
                padding: .4rem 0;
                padding: 4vw 0;
                border-bottom: .013333rem solid #ddd;
                border-bottom: .133333vw solid #ddd;
                .rating_content {
                    position: relative;
                    padding-left: 1.2rem;
                    padding-left: 12vw;
                    font-size: .346667rem;
                    .avatar {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: .8rem;
                        width: 8vw;
                        height: .8rem;
                        height: 8vw;
                        border-radius: 50%;
                    }
                    .comment_block {
                        display: flex;
                        align-items: center;
                        .user_name {
                            font-size: .346667rem;
                            margin-top: 0;
                            color: #333;
                            margin-right: .16rem;
                            margin-right: 1.6vw;
                            font-weight: 700;
                        }
                        .order_time {
                            font-size: .293333rem;
                            color: #bbb;
                        }
                    }
                    .comment_inline {
                        font-size: .266667rem;
                        color: #999;
                        vertical-align: middle;
                    }
                    .comment_msg {
                        color: #333;
                        font-size: .373333rem;
                        margin: .213333rem 0;
                        margin: 2.133333vw 0;
                        display: block;
                    }
                    .img_list li {
                        display: inline-block;
                        margin: .133333rem;
                        margin: 1.333333vw;
                        img {
                            width: 1.893333rem;
                            width: 18.933333vw;
                            height: 1.893333rem;
                            height: 18.933333vw;
                        }
                    }
                    .food_list li {
                        display: inline-block;
                        font-size: .293333rem;
                        color: #6d7885;
                        border: 1px solid #eee;
                        padding: .106667rem .266667rem;
                        padding: 1.066667vw 2.666667vw;
                        margin: .093333rem;
                        margin: .933333vw;
                        border-radius: .053333rem;
                        border-radius: .533333vw;
                        max-width: 1.6rem;
                        max-width: 16vw;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        box-sizing: content-box;
                    }
                }
            }
        }
    }
</style>
