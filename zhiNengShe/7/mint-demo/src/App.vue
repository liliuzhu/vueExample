<template>
  <div id="app">
    <!--<mt-header fixed title="固定在顶部"></mt-header>-->

    <!--tabbar-->
    <mt-tabbar v-model="active">
      <mt-tab-item id="外卖">
        <img slot="icon" src="./assets/logo.png">
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="./assets/logo.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="./assets/logo.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="./assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="外卖">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">选项一</mt-tab-item>
          <mt-tab-item id="2">选项二</mt-tab-item>
          <mt-tab-item id="3">选项三</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="订单">

        <mt-button type="default">default</mt-button>
        <mt-button type="primary" @click.native="open">加载数据</mt-button>
        <mt-button type="danger">danger</mt-button>

        <mt-button size="small">small</mt-button>
        <mt-button size="large">large</mt-button>
        <mt-button size="normal">normal</mt-button>
        <!--单选框-->
        <mt-radio
                title="单选框列表"
                v-model="value"
                :options="['选项A', '选项B', '选项C']">
        </mt-radio>
        <mt-cell title="标题文字">sss</mt-cell>
        <mt-cell title="标题文字">{{value}}</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="发现">
        <!--轮播图-->
        <div class="page-swipe">
          <mt-swipe :auto="0" :show-indicators="false">
            <mt-swipe-item :class="{slide1:true}">1</mt-swipe-item>
            <mt-swipe-item :class="{slide2:true}">2</mt-swipe-item>
            <mt-swipe-item :class="{slide3:true}">3</mt-swipe-item>
          </mt-swipe>
        </div>
        <!--<mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>-->
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <!--<mt-cell v-for="n in 5" title="tab-container 4"></mt-cell>-->
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:"1",
      active:"外卖",
      value:"选项A"
    }
  },
  methods:{
    open(){
      Indicator.open('加载中...');
//      axios.get().then(function(res){
//
//      }).catch(function(err){
//
//      })
      setTimeout(function(){
        Indicator.close();
      },2000);
    }
  }
}
</script>

<style>
  .page-swipe .mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
  .page-swipe .mint-swipe-item {
    line-height: 200px;
  }
  .page-swipe .slide1 {
    background-color: #0089dc;
    color: #fff;
  }
  .page-swipe .slide2 {
    background-color: #ffd705;
    color: #000;
  }
  .page-swipe .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }
  .page-swipe-desc {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
  }
</style>
