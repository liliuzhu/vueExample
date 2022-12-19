<template>
  <div class="home">
    <div>12212</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>1212 {{ dateFormat(11212) }}</div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import { dateFormat } from "@rrc/utils";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    // dateFormat(val) {
    //   return val
    // }
    dateFormat,
  },
};
</script>
