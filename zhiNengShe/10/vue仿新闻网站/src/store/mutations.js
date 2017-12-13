import getters from './getters'
const state={
	header:true,
	loading:false,
	footer:true
};
const mutations={
	showHeader(state){
		state.header=true
	},
	hideHeader(state){
		state.header=false
	},
	showLoading(state){
		state.loading=true;
	},
	hideLoading(state){
		state.loading=false;
	},
	showFooter(state){
		state.footer=true;
	},
	hideFooter(state){
		state.footer=false;
	}
};

//const getters={
//	headShow(state){
//		return state.headShow;
//	},
//	loading(state){
//		return state.loading;
//	},
//	footerShow(state){
//		return state.footerShow;
//	}
//};

export default{
	state,
	mutations,
	getters
}