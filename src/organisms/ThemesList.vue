<template>
  <div>
    <div class="themes">
      <div
        class="themes__item"
        v-for="theme in themes"
        :key="theme.id"
        :class="{ selected: selectedThemeId === theme.id }"
        @click="setSelectedTheme(theme.id)"
      >
        <div class="wrapper">
          <v-radio-checkbox
            name="selected-theme"
            :checked="selectedThemeId === theme.id"
          />
          <div class="title">{{ theme.title }}</div>
          <div>
            <div class="badge" v-if="theme.is_published">
              {{ theme.is_published ? "опубликованная" : "" }}
            </div>
          </div>
          <div class="installed">
            Установлено:
            <span class="true" v-if="theme.installed">{{
              theme.installed
            }}</span>
            <span v-if="!theme.installed">Нет</span>
          </div>
          <div class="on-hover">
            <v-icon
              v-if="theme.installed"
              mode="feather"
              icon="trash-2"
              :params="{ iconSize: '18px' }"
              @click="openDeleteModal(theme.id)"
            />
          </div>
          <div class="on-hover">
            <v-icon
              v-if="theme.installed"
              mode="feather"
              icon="eye"
              :params="{ iconSize: '18px' }"
              @click="openPreview(theme.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="themes__empty" v-if="!themes || !themes.length">
      <div class="text">
        <p><b>В вашем магазине нет не опубликованных тем!</b></p>
        <p>Чтобы продолжить, перейдите в раздел "Темы", скопируйте Основую тему и заново зайдите в приложение</p>
        <div class="actions"><v-button-primary @click="openThemesPage">Перейти в раздел "Темы"</v-button-primary></div>
      </div>
      <img src="no-themes.jpg" alt="" />
    </div>
    <v-modal
      ref="modal"
      title="Удаление AwesomeFilters из темы"
      @close="themeToDelete = ''"
    >
      <p>
        Приложение удалит все установленные приложением ресурсы из темы, кроме шаблона <b>collection.liquid</b>
      </p>
      <p>
        Внимание! Шаблон collection.liquid не вернется в состояние до установки.
        Вам необходимо обновить его вручную, используя backup-[date]-collection.liquid в
        теме или бекап темы, скаченный при установке.
      </p>
      <div class="actions">
        <v-button-primary @click="uninstallFromTheme">Удалить</v-button-primary>
        <v-button-inline @click="$refs.modal.showModal = false"
          >Отмена</v-button-inline
        >
      </div>
    </v-modal>
  </div>
</template>

<script>
import VCardTable from "../molecules/VCard/VCardTable";
import { mapState } from "vuex";
import VButtonOutline from "../molecules/VButton/VButtonOutline";
import VRadioCheckbox from "../atoms/VRadioCheckbox";
import VButtonPrimary from "../molecules/VButton/VButtonPrimary";
import VButtonInline from "../molecules/VButton/VButtonInline";
import VIcon from "../atoms/VIcon/VIcon";
import VModal from "../molecules/VModal";
export default {
  name: "ThemesList",
  components: {
    VIcon,
    VRadioCheckbox,
    VButtonOutline,
    VCardTable,
    VModal,
    VButtonInline,
    VButtonPrimary
  },
  data: () => ({
    themeToDelete: ""
  }),
  computed: {
    ...mapState(["themes", "user", "selectedThemeId"])
  },
  methods: {
    setSelectedTheme(id) {
      this.$store.commit("setSelectedTheme", id);
    },
    uninstallFromTheme(id) {
      if (this.themeToDelete) {
        this.$store
          .dispatch("uninstallFromTheme", this.themeToDelete)
          .then(() => {
            this.$noty.success("Приложение удалено из темы");
          });
        this.$refs.modal.showModal = false;
      }
    },
    openDeleteModal(id) {
      this.themeToDelete = id;
      this.$refs.modal.showModal = true;
    },
    openPreview(themeId) {
      const win = window.open(
        `https://${this.user.shop}/collection/all?theme_preview=${themeId}`,
        "_blank"
      );
      win.focus();
    },
    openThemesPage() {
      location.href = `https://${this.user.shop}/admin2/themes`
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
      width: 140px;
      .true {
        color: $color-green;
        font-weight: bold;
      }
    }
    .on-hover {
      width: 50px;
      visibility: hidden;
      opacity: 0.4;
      &:hover {
        opacity: 0.7;
      }
    }
    &:hover {
      .on-hover {
        visibility: visible;
      }
    }
  }
  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 34px;
    background-color: $color-b5;
    border-radius: 7px;
    img {
      width: 240px;
    }
    .text {
      margin-right: 15px;
      b {
        margin-bottom: 15px;
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
