import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from "moment";
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
    selectedTemplate: "",
    loading: false
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
    },
    loading: state => !!state.loading,
    loadingText: state => state.loading
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
    },
    setLoading(state, payload) {
      state.loading = payload || false
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
    async installToTheme({ commit, dispatch, state }) {
      commit("setLoading", "Установка темы...")
      const template = state.selectedTemplate ? `&template=${state.selectedTemplate}` : "";
      try {
        const { data } = await api.post(
          `/install-to-theme?themeId=${state.selectedThemeId}${template}`
        );
        if(data) {
          dispatch("setThemes");
          commit("setLoading", false);
        }
      } catch(e) {
        console.log(e);
        commit("setLoading", false);
      }
    },
    backupTheme({ commit, state, getters }) {
      commit("setLoading", "Бекап темы...")
      axios({
        url: `/backup-theme?themeId=${state.selectedThemeId}`,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const fileName = `${getters.selectedTheme.title}-${moment().format('YYYY-MM-D-HH-mm')}.zip`;
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      }).catch(error => {
        console.log(error);
        commit("setLoading", false);
      })
    },
    uninstallFromTheme({ commit, dispatch }, payload) {
      commit("setLoading", "Удаление темы...")
      api.post(`/uninstall-from-theme?themeId=${payload}`).then(() => {
        dispatch("setThemes");
        commit("setLoading", false);
      });
    }
  },
  modules: {}
});
