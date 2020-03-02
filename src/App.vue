<template>
  <div id="app">
    <div id="nav">
      <router-menu :menu="menu" />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import "./_mixins/FiltersMixin";
import RouterMenu from "./molecules/RouterMenu";
export default {
  components: { RouterMenu },
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
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
