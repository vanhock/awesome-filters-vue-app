import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    themes: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload || {};
    },
    setThemes(state, payload) {
      state.themes = payload || [];
    }
  },
  actions: {
    async setUser({ commit }) {
      const { data } = await api.get("/get-user");
      commit("setUser", data);
    },
    async setThemes({ commit }) {
      const { data } = await api.get("/get-themes");
      commit("setThemes", data);
    }
  },
  modules: {}
});
