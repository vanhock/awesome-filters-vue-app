<template>
  <v-card
    class="v-card-clear"
    :name="name"
    :image="image"
    :caption="caption"
    :badge="badge"
    :text="text"
    :selecting-mode="selectingMode"
    :show-menu="showMenu"
    :menu-position="menuPosition"
    @click="$emit('click')"
    @select="$emit('select')"
  >
    <template v-slot
      ><slot></slot
    ></template>
    <template v-slot:image>
      <slot name="image"></slot>
    </template>
    <template v-slot:menu
      ><slot name="menu"></slot
    ></template>
  </v-card>
</template>

<script>
import VCard from "../../atoms/VCard";
export default {
  name: "VCardClear",
  components: { VCard },
  extends: VCard,
  props: {
    item: Object
  }
};
</script>

<style lang="scss">
.v-card-clear {
  .name {
    font-size: 14px;
    max-height: 60px;
    min-height: 16px;
    overflow: hidden;
  }
}
</style>
