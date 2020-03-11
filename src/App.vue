<template>
  <div id="app">
    <div id="nav">
      <v-icon icon="awesomefilters" :params="{width: '258px', height: '85px' }" />
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
export default {
  components: { RouterMenu, VIcon },
  created() {
    this.$store.dispatch("setUser");
  },
  computed: {
    menu() {
      return this.$router && this.$router.options.routes;
    }
  }
};
</script>

<style lang="scss">
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
  display: flex;
  justify-content: center;
}
.content {
  max-width: 1400px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 7px;
  @include box-shadow(medium);
  h1 {
    padding: 30px 0;
    margin: 0;
  }
}
</style>
