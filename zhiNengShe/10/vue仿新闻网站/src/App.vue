<template>
	<div id="app">
		<loading v-show="loading"></loading>
		<NavView v-if="headerShow"></NavView>
		<transition name="slide-down">
			<!--<router-view></router-view>-->
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
		<FooterView v-if="footerShow"></FooterView>
	</div>
</template>
<script>
	import NavView from './components/Nav.vue'
	import FooterView from './components/Footer.vue'

	import {mapGetters,mapActions} from "vuex"
	export default{
		computed:mapGetters([
			'headerShow','loading','footerShow'
		]),
		watch:{
			$route(to,from){

				if(
						to.path=="/user-info"
						||to.path.indexOf("/user-login")!=-1
						||to.path.indexOf("/user-reg")!=-1
				){
					this.$store.dispatch('hideHeader');
				}else{
					this.$store.dispatch('showHeader');
				}

				if(
						to.path.indexOf('article')!=-1
						||to.path.indexOf("/user-login")!=-1
						||to.path.indexOf("/user-reg")!=-1
				){
					this.$store.dispatch('hideFooter');
				}else{
					this.$store.dispatch('showFooter');
				}
			}
		},
		components:{
			NavView,FooterView
		}
	}
</script>
<style>
	@import "./assets/css/index.css";
	.slide-up-enter-active, .slide-up-leave-active {
	  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .7;
	  transform: translate3d(0, 4em, 0);
	}
	.slide-up-enter, .slide-up-leave-active {
	  opacity: .3;
	  transform: translate3d(0, 4em, 0);
	}

	.slide-down-enter-active, .slide-down-leave-active {
	  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .7;
	  transform: translate3d(0, 6em, 0);
	}
	.slide-down-enter, .slide-down-leave-active {
	  opacity: .1;
	  transform: translate3d(0, 6em, 0);
	}

	.slide-left-enter-active, .slide-left-leave-active {
	  transition: all .2s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .5;
	  transform: translate3d(2em, 0, 0);
	}

	.slide-left-enter, .slide-left-leave-active {
	  opacity: .3;
	  transform: translate3d(2em, 0, 0);
	}

	.slide-right-enter-active, .slide-right-leave-active {
	  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
	  opacity: .5;
	  transform: translate3d(5em, 0, 0);
	}
	.slide-right-enter, .slide-right-leave-active {
	  opacity: .3;
	  transform: translate3d(5em, 0, 0);
	}

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .4s
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
</style>