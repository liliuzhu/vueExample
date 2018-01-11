<template>
    <div class="exchange">
        <backgroundLoading></backgroundLoading>
    </div>
</template>
<script type="text/ecmascript-6">
    import {openWebWindow} from '../../common/js/util.js';
    import backgroundLoading from '@/components/backgroundLoading/backgroundLoading';

    export default {
        data() {
            return {};
        },
        mounted() {
            openWebWindow('https://home.m.duiba.com.cn/chome/index?from=login&spm=14695.1.1.1', true);
        },
        components: {
            backgroundLoading
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">

</style>
