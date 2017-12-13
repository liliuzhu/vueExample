//import 数据 from ''	这里面可以获取数据
//import * as types from './types'

export default{
	showHeader:({commit})=>{
		commit('showHeader');
	},
	hideHeader:({commit})=>{
		//alert(1);
		commit('hideHeader');
	},
	showLoading:({commit})=>{
		commit('showLoading');
	},
	hideLoading:({commit})=>{
		commit('hideLoading');
	},
	hideFooter:({commit})=>{
		commit("hideFooter");
	},
	showFooter:({commit})=>{
		commit("showFooter");
	}
}
