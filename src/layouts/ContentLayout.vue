<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentLayout",
};
</script>

<style lang="scss" scoped>
.layout {
  padding: 0 25px;
}
</style>
