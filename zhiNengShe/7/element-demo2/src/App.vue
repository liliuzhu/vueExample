<template>
  <div id="app">
    <el-button @click="get">普通按钮</el-button>
    <div>
      {{myMessag}}
    </div>
    <hr>
    <el-button type="primary">普通按钮</el-button>

    <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
    <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
    <!--日历-->
    <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
    </el-date-picker>
    <!--评分-->
    <div class="block">
      <span class="demonstration">默认不区分颜色</span>
      <el-rate v-model="value3"></el-rate>
    </div>
    <div class="block">
      <span class="demonstration">区分颜色</span>
      <el-rate
              v-model="value4"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
    </div>
    <!--分页-->
    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination
              layout="prev, pager, next"
              :total="50">
      </el-pagination>
    </div>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination
              layout="prev, pager, next"
              :total="1000">
      </el-pagination>
    </div>
    <!--选项卡-->
    <el-tabs type="card">
      <el-tab-pane label="用户管理" >
        <el-badge :value="200" :max="99" class="item">
          <el-button size="small">评论</el-button>
        </el-badge>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <el-switch
                v-model="bSign"
                on-text=""
                off-text="">
        </el-switch>
      </el-tab-pane>
      <el-tab-pane label="角色管理">

        <el-table
                :data="tableData"
                style="width: 100%">
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿"></el-tab-pane>
    </el-tabs>
    <!--button-->
    <my-button @click.native="get"></my-button>
  </div>
</template>

<script>
  import myButton from './components/button.vue'
  import axios from 'axios'
export default {
  name: 'app',
  components:{
    myButton
  },
  data () {
    return {
      myMessag:"默认数据",
      msg: 'Welcome to Your Vue.js App',
      radio:"1",
      value1:'',
      value3:3,
      value4:null,
      bSign:true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted(){
    this.get();
  },
  methods:{
    get(){
      axios.get('https://api.github.com/users/itstrive').then(function(res){
                console.log(res);
        this.myMessag=res.data;
      }.bind(this)).catch(function(err){
        console.log(err);
      })
    }
  }
}
</script>

<style>
  .item{
    margin-top: 10px;
  }
</style>
