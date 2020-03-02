<template>
  <div
    class="layout layout-content-with-sidebar"
    :class="`sidebar-${sidebarPosition}`"
  >
    <div
      class="layout-sidebar"
      :class="{ sticky: stickySidebar }"
      v-if="sidebarPosition === 'left'"
    >
      <slot name="sidebar"></slot>
    </div>
    <div class="layout-content"><slot></slot></div>
    <div
      class="layout-sidebar"
      :class="{ sticky: stickySidebar }"
      v-if="sidebarPosition === 'right'"
    >
      <slot name="sidebar"></slot>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "ContentWithSidebar",
  props: {
    sidebarPosition: {
      type: String,
      default: "left"
    },
    stickySidebar: Boolean
  }
};
</script>

<style lang="scss" scoped>
.layout {
  &-content-with-sidebar {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
    grid-column-gap: 40px;
    .layout-sidebar {
      position: relative;
      &.sticky {
        & > * {
          position: sticky;
          top: 100px;
        }
      }
    }
    &.sidebar-right {
      grid-template-columns: 3fr 1fr;
    }
    &.sidebar-left {
      grid-template-columns: 1fr 3fr;
    }
  }
}
</style>
