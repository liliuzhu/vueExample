<template>
  <div id="app">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="info">主要按钮</el-button>
    <el-button type="danger">主要按钮</el-button>
    <el-button type="warning" icon="delete">主要按钮 <i class="el-icon-upload"></i></el-button>
    <el-button type="text">文字按钮</el-button>

    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="search">搜索</el-button>
    <span class="el-icon-loading"></span>
    <el-row>
      <el-col :span="12">
        <div class="my-grid"></div>
      </el-col>
      <el-col :span="12">
        <div class="my-grid"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="my-grid">
          <Date></Date>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="my-grid"></div>
      </el-col>
      <el-col :span="8">
        <div class="my-grid"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Date from './components/Date.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  components:{
    Date
  }
}
</script >
<style scoped lang="less">
  @color:red;
  .height(@h){
    height: @h;
  }
  .my-grid{
    .height(50px);
    border: 1px solid #000;
    background-color: @color;
  }
</style>
