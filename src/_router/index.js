import Vue from "vue";
import store from "../_store";
import VueRouter from "vue-router";
import Home from "../views/InstallationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Установка",
      menu: true
    },
  },
  {
    path: "/settings",
    name: "Settings",
    meta: {
      title: "Настройка",
      menu: true
    },
    component: () =>
      import(/* webpackChunkName: "SettingsView" */ "../views/SettingsView.vue"),
  },
  {
    path: "/sign-in",
    name: "SignIn",
    meta: {
      title: "Вход",
      menu: false
    },
    component: () =>
      import(/* webpackChunkName: "SignInView" */ "../views/SignInView.vue"),
  },
];

const router = new VueRouter({
  routes
});

export default router;
