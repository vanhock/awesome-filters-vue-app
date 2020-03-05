<template>
  <div class="themes ">

    <div
        class="themes__item"
        v-for="theme in themes"
        :key="theme.id"
        :class="{selected: selectedThemeId === theme.id}"
        @click="setSelectedTheme(theme.id)">
        <div class="wrapper">
          <v-radio-checkbox name="selected-theme" :checked="selectedThemeId === theme.id" />
          <div class="title">{{theme.title}}</div>
          <div><div class="badge" v-if="theme.is_published">{{theme.is_published ? 'опубликованная' : ''}}</div></div>
          <div class="installed">
            Установлено:
            <span class="true" v-if="theme.installed">{{theme.installed}}</span>
            <span v-if="!theme.installed">Нет</span>
          </div>
          <div class="uninstall"></div>
          <div class="update"></div>
        </div>
      </div>
  </div>
</template>

<script>
import VCardTable from "../molecules/VCard/VCardTable";
import { mapState } from "vuex";
import VButtonOutline from "../molecules/VButton/VButtonOutline";
import VRadioCheckbox from "../atoms/VRadioCheckbox";
export default {
  name: "ThemesList",
  components: { VRadioCheckbox, VButtonOutline, VCardTable },
  computed: {
    ...mapState(["themes", "selectedThemeId"])
  },
  methods: {
    setSelectedTheme(id) {
      this.$store.commit("setSelectedTheme", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.themes {
  margin-top: 25px;
  &__item {
    width: 100%;
    .wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 10px 20px;
      background-color: $color-b5;
      border-radius: 4px;
      cursor: pointer;
      will-change: box-shadow, background-color;
      transition: box-shadow 0.2s ease-out;
      border: 2px solid transparent;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .files {
      margin-top: 15px;
      background-color: $color-highlight;
    }
    &.selected .wrapper {
      border-color: $color-b2;
    }
    &:not(.selected):hover {
      @include box-shadow(medium);
    }
    & > * {
      display: flex;
      align-items: center;
      min-width: 30px;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      margin-right: 15px;
    }
    .caption {
      font-size: 12px;
    }
    .title {
      margin-right: auto;
      text-align: left;
      font-weight: bold;
      color: $color-b2;
    }
    .badge {
      display: flex;
      height: 15px;
      margin-right: 50px;
      justify-content: center;
      align-items: center;
      max-width: 100px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: $color-red;
      border-radius: 30px;
    }
    .installed {
      font-size: 12px;
      width: 170px;
      .true {
        color: $color-green;
        font-weight: bold;
      }
    }
  }
}
</style>
<style>
.v-radio-checkbox {
  width: 50px !important;
  pointer-events: none;
}
</style>
