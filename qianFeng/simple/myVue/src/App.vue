<template>
  <div id="app">
    <my-header custom-title="通讯录" costom-fixed>
      <button @touchstart="backBtn" slot="left">返回</button>
      <button @touchstart="homeBtn" slot="right">主页</button>
    </my-header>
    <my-list :user-data="userData"></my-list>
    <!--<my-alert custom-title="呼叫">
        <div class="alert_btn">
            <button @touchstart="confirmBtn">确认</button>
            <button @touchstart="cancelBtn">取消</button>
        </div>
    </my-alert>-->
  </div>
</template>

<script>
  var userData=[
    {index:"A",users:[
      {name:"a1",tel:"1301111111"},
      {name:"a2",tel:"1301111112"},
      {name:"a3",tel:"1301111113"}
    ]},
    {index:"B",users:[
      {name:"b1",tel:"1301111114"},
      {name:"b2",tel:"1301111115"},
      {name:"b3",tel:"1301111116"}
    ]},
    {index:"C",users:[
      {name:"c1",tel:"1301111117"},
      {name:"c2",tel:"1301111118"},
      {name:"c3",tel:"1301111119"}
    ]},
    {index:"D",users:[
      {name:"d1",tel:"1301111121"},
      {name:"d2",tel:"1301111122"},
      {name:"d3",tel:"1301111123"}
    ]},
    {index:"E",users:[
      {name:"e1",tel:"1301111124"},
      {name:"e2",tel:"1301111125"},
      {name:"e3",tel:"1301111126"}
    ]},
    {index:"F",users:[
      {name:"f1",tel:"1301111127"},
      {name:"f2",tel:"1301111127"},
      {name:"f3",tel:"1301111129"}
    ]}
  ];
export default {
  name: 'app',
  data () {
    return {
      userData:userData
    }
  },
  methods:{
    backBtn:function(){
      alert(123);
    },
    homeBtn:function(){
      alert(456);
    }
  }
}
</script>

<style>
  *{margin: 0;padding: 0;box-sizing: border-box;}
  li{list-style: none;}
</style>
