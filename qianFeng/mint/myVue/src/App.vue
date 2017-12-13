<template>
  <div id="app">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <mt-button icon="back" slot="left">返回</mt-button>

      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-index-list>
      <mt-index-section v-for="item in userData" :index="item.index" :key="item.id">
        <mt-cell v-for="user in item.users" @click.native="telAlert(user)" :title="user.name" :key="user.id">{{user.tel}}</mt-cell>
      </mt-index-section>
    </mt-index-list>
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
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'app',
    data () {
      return {
        userData:userData
      }
    },
    methods:{
      telAlert(user){
        MessageBox({
          title: '呼叫',
          message: user.name+" : "+user.tel,
          showCancelButton: true
        }).then(function(action){
          console.log(action=="confirm"?"确认":"取消");
        });
//        MessageBox.prompt('请输入姓名').then(function({value, action}){
//          console.log(value, action)
//        },function(action){
//          console.log(action)
//        });
      }
    }
  }
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
body{
  font-size: 14px;
  font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
}
</style>
