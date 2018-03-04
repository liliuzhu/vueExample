<template>
    <div id="app" class="wrapper">
        <svgSymbol></svgSymbol>
        <router-view :location="location"></router-view>
        <footerTabbar v-if="footerTabbar"></footerTabbar>
    </div>
</template>

<script>
    import footerTabbar from './components/footerTabbar/footerTabbar';
    import svgSymbol from './components/svgSymbol/svgSymbol';
    import {mapGetters} from 'vuex';
    import {Toast} from 'mint-ui';

    export default {
        name: 'app',
        data() {
            return {
                location: {},
                showToolbarRouters: ["/msite", "/order", "/discover", "/profile"]
            };
        },
        mounted() {
            this.checkeEquipment();
            this.checkRoute(this.$route.path);
            this.getLocation();
        },
        computed: {
            ...mapGetters(['footerTabbar'])
        },
        watch: {
            $route(to, from) {
                this.checkRoute(to.path);
            }
        },
        methods: {
            checkRoute(currentPath) {
                if (this.showToolbarRouters.indexOf(currentPath) !== -1) {
                    this.$store.dispatch('footerTabbar', true);
                } else {
                    this.$store.dispatch('footerTabbar');
                }
            },
            getLocation() {
                if (this.custom.hasServer) {
                    let url = '/api/shopping/v1/cities/guess';
                    this.$ajax.get(url).then((res) => {
                        this.location = res.data;
                    }).catch((err) => {
                        console.error("/api/shopping/v1/cities/guess" + err);
                    });
                } else {
                    let geolocation = new window.BMap.Geolocation();// 开启SDK辅助定位
                    geolocation.enableSDKLocation();
                    geolocation.getCurrentPosition((position) => {
                        this.getLocationCallback(position, geolocation);
                    });
                }
            },
            getLocationCallback(position, geoloca) {
                if (geoloca.getStatus() === window.BMAP_STATUS_SUCCESS) {
                    position.latitude = parseFloat(position.latitude);
                    position.longitude = parseFloat(position.longitude);
                    this.location = position;
                    // this.location = {latitude: 39.90469, longitude: 116.407173};
                } else {
                    alert('failed' + geoloca.getStatus());
                }
            },
            checkeEquipment() {
                // let regExp = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/i;
                // if (window.devicePixelRatio) {
                //
                // }
                Toast({
                    message: '使用游览器的移动设备模式或者移动端浏览体验更好哦！',
                    position: 'middle',
                    duration: 5000
                });
            }
        },
        components: {
            footerTabbar,
            svgSymbol
        }
    }
    ;
</script>

<style rel="stylesheet/css" type="text/css" lang="less" scoped>
    .wrapper {
    }
</style>

