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
    themes: [],
    selectedThemeId: ""
  },
  getters: {
    selectedTheme(state) {
      if (!state.themes || !state.selectedThemeId) {
        return;
      }
      let selectedTheme;
      state.themes.some(t => {
        if (t.id === state.selectedThemeId) {
          selectedTheme = t;
          return true;
        }
      });
      return selectedTheme;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload || {};
    },
    setThemes(state, payload) {
      state.themes = payload || [];
    },
    setSelectedTheme(state, payload) {
      state.selectedThemeId = payload || "";
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
    },
    async setUp({ commit, state }) {
      const { data } = await api.post(
        `/install-to-theme?themeId=${state.selectedThemeId}`
      );
    }
  },
  modules: {}
});
