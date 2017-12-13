<template>
  <!--<link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css">-->
  <div id="app">
    <button class="btn btn-default">普通按钮</button>
    <button class="btn btn-danger">普通按钮</button>
    <div class="row">
      <div class="col-sm-8 my-border">8</div>
      <div class="col-sm-4 my-border">4</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  .my-border{
    border: 1px solid #ddd;
  }
</style>
