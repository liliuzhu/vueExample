<template>
    <div class="recommend">
        <div v-if="recommends.length>0" class="recommend_warp">
            <pageHeader :callback="back" title="为你推荐"></pageHeader>
            <recommendList ref="recommendList" :recommends="recommends"></recommendList>
            <loadingShop :isEnd="isEnd"></loadingShop>
        </div>
        <backgroundLoading v-else></backgroundLoading>
    </div>
</template>
<script type="text/ecmascript-6">
    import pageHeader from '@/components/pageHeader/pageHeader';
    import recommendList from '@/components/recommendList/recommendList';
    import backgroundLoading from '@/components/backgroundLoading/backgroundLoading';
    import loadingShop from '@/components/loadingShop/loadingShop';

    export default {
        data() {
            return {
                recommends: [],
                loading: false,
                isEnd: false,
                rank_id: this.$route.query.rank_id
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
        watch: {
            location() {
                this.getRecommendAtion();
            }
        },
        mounted() {
            document.addEventListener("scroll", this.listenCallback);
            this.getRecommendAtion();
        },
        beforeDestroy() {
            document.removeEventListener("scroll", this.listenCallback);
        },
        methods: {
            listenCallback() {
                window.throttle2(this.scrollCallback);
            },
            scrollCallback() {
                let leaveTop = this.$refs.recommendList.$el.getBoundingClientRect().bottom;
                let availHeight = this.custom.availHeight;
                if (leaveTop < availHeight) {
                    this.getRecommendAtion();
                }
            },
            getRecommendAtion() {
                if (this.loading || !this.location.longitude || !this.location.latitude || this.isEnd) {
                    return false;
                }
                this.loading = true;
                if (this.custom.hasServer) {
                    let latitude = this.location.latitude;
                    let longitude = this.location.longitude;
                    let url = `/api/shopping/v1/find/recommendation?offset=${this.recommends.length}&rank_id=${this.rank_id}&limit=20&latitude=${latitude}&longitude=${longitude}`;
                    this.$ajax.get(url)
                        .then((res) => {
                            if (res.data.items.length < 20) {
                                this.isEnd = true;
                            }
                            this.recommends = this.recommends.concat(res.data.items);
                            this.loading = false;
                        })
                        .catch((err) => {
                            console.error("recommendation", err);
                        });
                } else {
                    let url = `./simulate_data/recommend/recommendation.json`;
                    this.$ajax.get(url)
                        .then((res) => {
                            this.recommends = this.recommends.concat(res.data.items);
                            this.loading = false;
                        })
                        .catch((err) => {
                            console.error("recommendation.json", err);
                        });
                }
            },
            back() {
                this.$router.back();
            }
        },
        components: {
            pageHeader,
            recommendList,
            backgroundLoading,
            loadingShop
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">

</style>
