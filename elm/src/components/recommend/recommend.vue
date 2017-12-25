<template>
    <div class="recommend">
        <pageHeader :callback="back" title="为你推荐"></pageHeader>
        <recommendList :recommends="recommends"></recommendList>
    </div>
</template>
<script type="text/ecmascript-6">
    import pageHeader from '@/components/pageHeader/pageHeader';
    import recommendList from '@/components/recommendList/recommendList';

    export default {
        data() {
            return {
                recommends: []
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
            this.getRecommendAtion();
        },
        methods: {
            back() {
                this.$router.back();
            },
            getRecommendAtion() {
                if (!this.location.longitude || !this.location.latitude) {
                    return false;
                }
                if (this.custom.hasServer) {
                    let latitude = this.location.latitude;
                    let longitude = this.location.longitude;
                    let url = `/api/shopping/v1/find/recommendation?offset=${this.recommends.length}&limit=20&latitude=${latitude}&longitude=${longitude}`;
                    this.$ajax.get(url)
                        .then((res) => {
                            this.recommends = this.recommends.concat(res.data.items);
                        })
                        .catch((err) => {
                            console.error("recommendation", err);
                        });
                } else {
                    let url = `./simulate_data/discover/recommendation.json`;
                    this.$ajax.get(url)
                        .then((res) => {
                            this.recommends = this.recommends.concat(res.data.items);
                        })
                        .catch((err) => {
                            console.error("recommendation.json", err);
                        });
                }
            }
        },
        components: {
            pageHeader,
            recommendList
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">

</style>
