<template>
  <div class="router-menu">
    <div class="menu-line">
      <slot name="before"></slot>
      <v-menu :align="align">
        <menu-item
          v-for="(item, index) in menu"
          :key="index"
          v-if="item.meta && item.meta.menu"
          :class="{ 'has-submenu': item.children, bottom: item.bottom }"
        >
          <router-link
            class="router-link"
            tag="div"
            :to="{ name: item.name }"
            :disabled="item.meta.disabled"
          >
            <v-toggle
              :icon="item.meta.icon"
              :text="item.meta.title"
              :show-text="showText"
              :label="item.meta.label"
              :icon-params="{ iconSize: iconParams.size }"
              :icon-mode="iconParams.mode"
            />
          </router-link>
        </menu-item>
      </v-menu>
      <slot name="after"></slot>
    </div>
    <v-menu class="submenu" v-if="submenu.length">
      <menu-item
        v-for="(item, index) in submenu"
        v-if="item.meta && item.meta.menu"
        :key="index"
      >
        <router-link
          class="router-link"
          tag="div"
          :to="{ name: item.name }"
          :disabled="item.meta.disabled"
        >
          <v-toggle :text="item.meta.title" />
        </router-link>
      </menu-item>
    </v-menu>
  </div>
</template>

<script>
import VMenu from "../atoms/VMenu";
import MenuItem from "../atoms/MenuItem";
import VToggle from "../atoms/VToggle";
export default {
  name: "RouterMenu",
  components: { VToggle, VMenu, MenuItem },
  props: {
    menu: {
      type: Array,
      default: () => [],
      required: true
    },
    submenu: {
      type: Array,
      default: () => []
    },
    showText: Boolean,
    align: {
      type: String,
      default: "horizontal"
    },
    iconParams: {
      type: Object,
      default: () => ({
        mode: "feather",
        size: "16px"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-line {
  display: flex;
  align-items: center;
}
.menu.horizontal:not(.submenu) {
  height: 100%;
}
.menu-item {
  display: flex;
  height: 100%;
  align-items: center;
  box-sizing: border-box;
}
</style>
