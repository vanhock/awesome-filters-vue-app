<template>
  <div id="app">
    <div id="nav">
      <div class="back-to-store" v-if="user && user.shop" @click="toTheBackOffice">
        <v-icon icon="chevron-left" mode="feather" :params="{width: '258px', height: '110px' }" />
        Вернуться в бек-офис
      </div>
      <v-icon icon="awesomefilters" :params="{width: '258px', height: '110px' }" />
      <!-- <router-menu :menu="menu" /> -->
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import "bootstrap-4-grid/css/grid.min.css";
import "./_mixins/FiltersMixin";
import RouterMenu from "./molecules/RouterMenu";
import VIcon from "./atoms/VIcon/VIcon"

import Vue from "vue";
import VueNoty from "vuejs-noty";
import {mapState} from "vuex";
Vue.use(VueNoty, {
  timeout: 1500,
  dismissQueue: true,
  killer: true,
  progressBar: false,
  layout: "topCenter",
  theme: "mint",
  animation: {
    open: "scale-in-bottom",
    close: "scale-out-top"
  }
});

export default {
  components: { RouterMenu, VIcon },
  created() {
    this.$store.dispatch("setUser");
  },
  computed: {
    ...mapState(["user"]),
    menu() {
      return this.$router && this.$router.options.routes;
    }
  },
  methods: {
    toTheBackOffice() {
      if(!this.user) {
        return
      }
      location.href = `https://${this.user.shop}/admin2/applications`;
    }
  }
};
</script>

<style lang="scss">
@import "./_assets/styles/notification";
body {
  margin: 0;
  padding: 0;
}
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 30px;
}

#nav {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  max-width: 1400px;
  min-height: 700px;
  margin: 0 auto 50px auto;
  background-color: #fff;
  border-radius: 7px;
  @include box-shadow(medium);
  h1 {
    padding: 30px 0;
    margin: 0;
  }
}
.back-to-store {
  position: absolute;
  display: flex;
  align-items: center;
  width: 117px;
  left: 0;
  line-height: 17px;
  opacity: 0.5;
  cursor: pointer;
  font-size: 12px;
  text-align: left;
  .v-icon {
    margin-right: 7px;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
