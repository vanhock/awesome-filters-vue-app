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
    selectedThemeId: "",
    selectedTemplate: ""
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
    },
    setSelectedTemplate(state, payload) {
      state.selectedTemplate = payload || "";
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
    },
    async backupTheme({ commit, state }) {
      axios({
        url: `/backup-theme?themeId=${state.selectedThemeId}`,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.zip');
        document.body.appendChild(link);
        link.click();
      });
      console.log(data);
    },
    uninstallFromTheme({ commit, dispatch }, payload) {
      api.post(`/uninstall-from-theme?themeId=${payload}`).then(() => {
        dispatch("setThemes");
      });
    }
  },
  modules: {}
});
