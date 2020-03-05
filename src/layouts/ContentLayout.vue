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
  max-width: 900px;
  margin: 0 auto;
  padding: 25px;
}
</style>
