import Vue from "vue";
import Vuex from "vuex";
import Api from "../Api";
import moment from "moment";
Vue.use(Vuex);

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
      state.loading = payload || false;
    }
  },
  actions: {
    async setUser({ commit }) {
      const { data } = await Api.get("/get-user");
      commit("setUser", data);
    },
    async setThemes({ commit }) {
      commit("setLoading", "Загрузка");
      const { data } = await Api.get("/get-themes");
      commit("setThemes", data);
      commit("setLoading", false);
    },
    async installToTheme({ commit, dispatch, state }, { update }) {
      commit("setLoading", "Установка темы...");
      const template =
        state.selectedTemplate && !update
          ? `&template=${state.selectedTemplate}`
          : "";
      try {
        const { data } = await Api.post(
          `/install-to-theme?themeId=${state.selectedThemeId}${template}`
        );
        if (data) {
          dispatch("setThemes");
          commit("setLoading", false);
        }
        return Promise.resolve("Приложение установлено успешно");
      } catch ({ response }) {
        commit("setLoading", false);
        return Promise.reject(response.error);
      }
    },
    async backupTheme({ commit, state, getters }) {
      commit("setLoading", "Бекап темы...");
      await Api.get(`/backup-theme?themeId=${state.selectedThemeId}`, {
        responseType: "blob" // important
      })
        .then(response => {
          const fileName = `${getters.selectedTheme.title}-${moment().format(
            "YYYY-MM-D-HH-mm"
          )}.zip`;
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          return true;
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    async uninstallFromTheme({ commit, dispatch }, payload) {
      commit("setLoading", "Удаление темы...");
      await Api.post(`/uninstall-from-theme?themeId=${payload}`);
      commit("setLoading", false);
      dispatch("setThemes");
    }
  },
  modules: {}
});
