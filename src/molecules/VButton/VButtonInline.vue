<template>
  <v-button class="v-button-inline" @click="$emit('click')" :loading="loading"
    ><slot></slot
  ></v-button>
</template>

<script>
import VButton from "../../atoms/VButton";
export default {
  name: "VButtonInline",
  components: { VButton },
  extends: VButton
};
</script>

<style lang="scss" scoped>
.v-button-inline {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  color: $color-w1;
  white-space: nowrap;
}
</style>
