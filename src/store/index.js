import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shopAccount: {},
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload || {};
    },
    setShopAccount(state, payload) {
      state.shopAccount = payload || {};
    }
  },
  actions: {
    userLogin({ commit }, payload) {
      if (!payload) {
        return;
      }
      localStorage.setItem("af_user", payload);
      commit("setUser", payload);
    },
    async getShopAccount({ commit }, payload) {
      const shop = await axios.get(`/get-shop?shop=${payload}`);
      commit("setShopAccount", shop);
    }
  },
  modules: {}
});
