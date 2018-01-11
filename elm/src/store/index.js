import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    footerTabbar: true,
    shopStatus: 0
};
const actions = {
    footerTabbar({commit}, status) {
        commit('footerTabbar', status);
    },
    showFooterTabbar({commit}) {
        commit('showFooterTabbar');
    },
    hideFooterTabbar({commit}) {
        commit('hideFooterTabbar');
    },
    shopStatus({commit}, status) {
        commit('shopStatus', status);
    }
};
const mutations = {
    footerTabbar(state, status = false) {
        state.footerTabbar = status;
    },
    showFooterTabbar(state) {
        state.footerTabbar = true;
    },
    hideFooterTabbar(state) {
        state.footerTabbar = false;
    },
    shopStatus(state, status = 0) {
        state.shopStatus = status;
    }
};
const getters = {
    footerTabbar(state) {
        return state.footerTabbar;
    },
    shopStatus(state) {
        return state.shopStatus;
    }
};

const store = new Vuex.Store({
    state, actions, mutations, getters
});
export default store;
