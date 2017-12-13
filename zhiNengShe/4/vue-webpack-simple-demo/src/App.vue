<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <button @click="change">按钮</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  },
  methods:{
    change(){
      this.msg=this.msg.split("").reverse().join("");
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
