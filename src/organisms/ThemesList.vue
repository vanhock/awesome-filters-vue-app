<template>
  <div class="themes">
    <div
      class="themes__item"
      v-for="theme in themes"
      :key="theme.id">
      <div class="title">{{theme.title}}</div>
      <div class="caption">{{theme.updated_at | normalizeDate}}</div>
      <div><div class="badge" v-if="theme.is_published">{{theme.is_published ? 'опубликованная' : ''}}</div></div>
      <div class="actions"><v-button-outline>Установить</v-button-outline></div>
    </div>
  </div>
</template>

<script>
import VCardTable from "../molecules/VCard/VCardTable";
import { mapState } from "vuex";
import VButtonOutline from "../molecules/VButton/VButtonOutline";
export default {
  name: "ThemesList",
  components: { VButtonOutline, VCardTable },
  computed: {
    ...mapState(["themes"])
  }
};
</script>

<style lang="scss" scoped>
.themes {
  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 10px 20px;
    background-color: $color-b5;
    border-radius: 4px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    & > * {
      width: 140px;
      overflow: hidden;
      white-space: nowrap;
      margin-right: 15px;
    }
    .caption {
      font-size: 12px;
    }
    .title {
      text-align: left;
      font-weight: bold;
      color: $color-b3;
    }
    .badge {
      display: flex;
      height: 15px;
      justify-content: center;
      align-items: center;
      max-width: 100px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: $color-w1;
      border-radius: 30px;
    }
  }
}
</style>
