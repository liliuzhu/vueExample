<template>
    <section class="shop">
        <div v-if="showBackground" class="background"></div>
        <div v-else class="container">
            <noShopData v-if="menu.length===0" :noShop="noShop"></noShopData>
            <div class="shop_info_wrap scroller" v-else ref="shopInfoWrap">
                <shopHeader :shopInfo="shopInfo" :location="location" :hongBao="hongBao" ref="shopHeader"></shopHeader>
                <div class="shop_tab" ref="shopTab">
                    <a v-for="(tabbar,index) in tabbars" class="shop_tab_item"
                       :class="{shop_tab_active:tabbarIndex===index}" @click="tabbarIndex=index"
                       href="javascript:void(0);"><span>{{tabbar.name}}</span></a>
                </div>
                <div class="tab_contend" :style="{height:contentHeight+'px'}">
                    <menuView v-show="tabbarIndex===0" ref="menuView" :shopInfo="shopInfo" :menu="menu"></menuView>
                    <shopRate v-show="tabbarIndex===1" ref="shopRate"></shopRate>
                    <shopDetail :shopInfo="shopInfo" v-show="tabbarIndex===2" ref="shopDetail"></shopDetail>
                </div>
            </div>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import noShopData from './noShopData';
    import shopHeader from './shopHeader';
    import menuView from './menuView';
    import shopRate from './shopRate';
    import shopDetail from './shopDetail';

    export default {
        data() {
            return {
                tabbars: [{name: '点餐'}, {name: '评价'}, {name: '商家'}],
                tabbarIndex: 0,
                ID: this.$route.query.id,
                shopInfo: {},
                hongBao: [],
                contentHeight: 50,
                showBackground: true,
                noShop: false,
                menu: [],
                deliveryRange: {}

            };
        },
        props: {
            location: {
                type: Object,
                required: true,
                default: function () {
                    return {};
                }
            }
        },
        watch: {
            location() {
                this.getShopInfoById();
            },
            showBackground(newVal, oldVal) {
                if (!newVal) {
                    document.title = this.shopInfo.name;
                    this.initShop();
                }
            },
            deliveryRange(newVal, oldVal) {
                this.initShopStatus();
            }
        },
        mounted() {
            this.getShopInfoById();
        },
        methods: {
            initShop() {
                this.$nextTick(() => {
                    this.contentHeight = this.custom.availHeight - (this.$refs.shopTab && this.$refs.shopTab.offsetHeight);
                    const shopHeaderHeight = this.$refs.shopHeader.$el.offsetHeight;
                    const scrollType = {index: 0, rate: 0, detail: 0};
                    let scrollBack = (scrollTop, type = 'index') => {
                        if (this.$refs.shopInfoWrap.scrollTop < shopHeaderHeight || scrollTop < shopHeaderHeight) {
                            this.$refs.shopInfoWrap.scrollTop += scrollTop - scrollType[type];
                            scrollType[type] = scrollTop;
                        }
                    };
                    this.$refs.menuView.$on('containerScroll', scrollBack);
                    this.$refs.shopRate.$on('containerScroll', scrollBack);
                    this.$refs.shopDetail.$on('containerScroll', scrollBack);
                });
            },
            getShopInfoById() {
                if (!this.location.latitude || !this.location.longitude) {
                    return false;
                }
                let latitude = this.location.latitude;
                let longitude = this.location.longitude;
                let serverUrl = `/api/shopping/v2/menu?restaurant_id=${this.ID}`;
                let localUrl = `./simulate_data/shop/menu.json`;
                let url = this.custom.hasServer ? serverUrl : localUrl;
                this.$ajax.get(url)
                    .then((res) => {
                        this.menu = res.data;
                        let serverUrl = `/api/shopping/v1/restaurants/${this.ID}/exclusive_hongbao/overview?latitude=${latitude}&longitude=${longitude}&code=` + Math.random();
                        let localUrl = `./simulate_data/shop/hongbao.json`;
                        let url = this.custom.hasServer ? serverUrl : localUrl;
                        return this.$ajax.get(url);
                    })
                    .then((res) => {
                        this.hongBao = res.data.sort((a, b) => {
                            return b.type - a.type;
                        });
                        let serverUrl = `/api/shopping/restaurant/${this.ID}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=${latitude}&longitude=${longitude}`;
                        let localUrl = `./simulate_data/shop/shopInfo.json`;
                        let url = this.custom.hasServer ? serverUrl : localUrl;
                        return this.$ajax.get(url);
                    })
                    .then((res) => {
                        this.shopInfo = res.data;
                        this.noShop = false;
                        this.showBackground = false;
                        let serverUrl = `/api/shopping/v1/restaurant/${this.ID}/delivery?latitude=${latitude}&longitude=${longitude}`;
                        let localUrl = `./simulate_data/shop/delivery.json`;
                        let url = this.custom.hasServer ? serverUrl : localUrl;
                        return this.$ajax.get(url);
                    })
                    .then((res) => {
                        this.deliveryRange = res.data;
                    })
                    .catch((err) => {
                        this.noShop = true;
                        this.showBackground = false;
                        console.error('shopId' + err);
                    });
            },
            initShopStatus() {
                /*
                * 店铺状态 1正常营业  4:不在营业时间范围之内  100:within_delivery_range=false 不在配送范围
                * */
                let status = this.shopInfo.status || 0;
                if (status === 1) {
                    if (!this.deliveryRange.within_delivery_range) {
                        status = 10;
                    }
                }
                this.$store.dispatch('shopStatus', status);
            }
        },
        components: {
            shopHeader,
            noShopData,
            menuView,
            shopRate,
            shopDetail
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    /*html,body{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*}*/
    .shop {
        width: 100%;
        height: 100vh;
        .background, .container {
            width: 100%;
            height: 100%;
            /*overflow-x: hidden;*/
            overflow: hidden;
        }
        .background {
            background: transparent url("./shop_background.svg") no-repeat center top;
            background-size: 100%;
        }
        .shop_info_wrap {
            width: 100%;
            height: 100vh;
            padding-right: .226667rem;
            padding-right: 2.266667vw;
            box-sizing: content-box;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    .shop_tab {
        line-height: 1.066667rem;
        line-height: 10.666667vw;
        display: flex;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        .shop_tab_item {
            position: relative;
            flex: 1;
            text-align: center;
            font-size: .373333rem;
            color: #666;
            border-bottom: 1px solid #ddd;
            span {
                position: relative;
            }
            &.shop_tab_active {
                color: #333;
                font-weight: 700;
                span::after {
                    content: "";
                    position: absolute;
                    bottom: -.32rem;
                    bottom: -3.2vw;
                    left: 0;
                    right: 0;
                    height: .053333rem;
                    height: .533333vw;
                    background-color: #2395ff;
                }
            }
        }
    }

    .tab_contend {
        > div {
            height: 100%;
            box-sizing: border-box;
        }

    }
</style>
<style rel="stylesheet/css" type="text/css" lang="less">
    .scroller {
        overflow-y: auto;
        height: 100%;
        -webkit-overflow-scrolling: touch;
    }

    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);
        transition: opacity .3s ease-in-out;
        opacity: 1;
    }
</style>
