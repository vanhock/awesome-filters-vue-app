<template>
  <div class="templates-list row">
    <v-slider mode="carousel" ref="slider">
      <div v-for="(t, key) in templates" :key="key" @click="setSelectedTemplate(t.folder)">
        <div class="templates-list__item" :class="{selected: t.folder === selectedTemplate}" :style="{backgroundImage: `url(${t.image})`}">
          <div class="name">{{t.name}}</div>
        </div>
      </div>
    </v-slider>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import templates from "../../../collectionTemplates";
import VCardClear from "../molecules/VCard/VCardClear";
import VSlider from "../molecules/VSlider";
export default {
  name: "TemplatesList",
  components: { VSlider, VCardClear },
  computed: {
    ...mapState(["selectedTemplate"]),
    ...mapGetters(["selectedTheme"]),
    templates: () => templates
  },
  watch: {
    selectedTheme(theme) {
      templates.some((template, index) => {
        if (
          theme.title.toLowerCase().includes(template.name.toLowerCase())
        ) {
          this.setSelectedTemplate(template.folder);
          return this.$refs.slider.goTo(index);
        }
      });
    }
  },
  methods: {
    setSelectedTemplate(folder) {
      this.$store.commit("setSelectedTemplate", folder);
    }
  }
};
</script>

<style lang="scss" scoped>
.templates-list {
  &__item {
    display: flex;
    height: 170px;
    margin: 15px 10px;
    background-color: #fff;
    border-radius: 4px;
    background-size: cover;
    will-change: box-shadow, background-color;
    transition: box-shadow 0.2s ease-out;
    border: 2px solid $color-b4;
    &.selected {
      border-color: $color-b2;
    }
    &:not(.selected):hover {
      cursor: pointer;
      @include box-shadow(medium);
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      margin-top: auto;
      background-color: #fff;
      font-weight: bold;
      border-radius: 0 0 4px 4px;
    }
  }
}
</style>
