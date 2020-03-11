<template>
  <div @click="$emit('click')" class="v-icon">
    <div
      v-if="mode === 'image'"
      :class="`icon-${icon}`"
      :style="{
        width: params && params.width || params && params.iconSize,
        height: params && params.height || params && params.iconSize
      }"
      class="v-icon-image"
    ></div>
      <Zodicon
        v-if="mode === 'zondicon'"
        :icon="icon"
        :style="{
        width: params && params.iconSize,
        height: params && params.iconSize,
        fontSize: params && params.textSize
      }"
        class="icon"
      />
      <feather-icon
        v-if="mode === 'feather'"
        :type="icon"
        :fill="params && params.fill"
        :stroke="params && params.stroke"
        :strokeWidth="params && params.strokeWidth"
        :size="(params && params.iconSize) || '24px'"
        class="icon"
      />
  </div>
</template>

<script>
import Zodicon from "vue-zondicons";
import FeatherIcon from "vue-feather";
export default {
  name: "VIcon",
  components: {Zodicon, FeatherIcon},
  props: {
    icon: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: "image"
    },
    params: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../_assets/styles/sprites";
@each $key, $value in $sprites {
  .icon-#{$key} {
    @include sprite($key);
  }
}
.v-icon {
  display: flex;
  &-image {
    background-size: contain;
  }
}
</style>
