import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    footerTabbar: true
};
const actions = {
    footerTabbarStatus({commit}, status) {
        commit('footerTabbarStatus', status);
    },
    showFooterTabbar({commit}) {
        commit('showFooterTabbar');
    },
    hideFooterTabbar({commit}) {
        commit('hideFooterTabbar');
    }
};
const mutations = {
    footerTabbarStatus(state, status = false) {
        state.footerTabbar = status;
    },
    showFooterTabbar(state) {
        state.footerTabbar = true;
    },
    hideFooterTabbar(state) {
        state.footerTabbar = false;
    }
};
const getters = {
    footerTabbar(state) {
        return state.footerTabbar;
    }
};

const store = new Vuex.Store({
    state, actions, mutations, getters
});
export default store;
