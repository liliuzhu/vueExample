<template>
  <div id="app">
    <h1>hellow vuex</h1>
    <p>{{$store.state.count}}-局部-{{count}}</p>
    <p>
      <button @click="jia({a:10})">+</button>
      <button @click="jian">-</button>
    </p>
    <p>
      <button @click="jiaPlus({a:20})">+Plus</button>
      <button @click="jianPlus({a:5})">-Plus</button>
    </p>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';
  export default {
    name: 'app',
    data () {
      return {

      }
    },
//  computed:{
//    count(){
//      console.log(this);
//      return this.$store.state.count+1;
//    }
//  }
//  computed:mapState({
//      count(state2){
//        return state2.count+10;
//      }
//  })
    computed:{
//      ...mapState(["count"]),
      ...mapGetters(["count"])
    },
    methods:{
      ...mapMutations(['jian','jia']),
      ...mapActions(['jiaPlus']),
      ...mapActions({jianPlus:'jianPlus'})
    },
    mounted:function(){
//      const a=mapMutations(['jian','jia']);
//      var _toString = Object.prototype.toString;
//      console.log({...{a:1,b:2}});
    }
  }
</script>

<style>

</style>

