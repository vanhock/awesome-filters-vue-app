import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import Home from "../views/InstallationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "SettingsView" */ "../views/SettingsView.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
