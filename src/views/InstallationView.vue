<template>
  <div class="installation-view">
    <preloader :show="loading" :text="loadingText">
      <content-layout sidebar-position="right">
        <div class="view-content">
          <div class="installation-menu">
            <div class="item" :class="{ selected: selectedSection === 1 }">
              <v-icon mode="feather" icon="check-square" />
              <div>1. Выберите тему</div>
            </div>
            <div class="item" :class="{ selected: selectedSection === 2 }">
              <v-icon mode="feather" icon="grid" />
              <div>2. Выберите шаблон страницы</div>
            </div>
            <div class="item" :class="{ selected: selectedSection === 3 }">
              <v-icon mode="feather" icon="eye" />
              <div>3. Просмотр темы</div>
            </div>
          </div>
          <section v-show="selectedSection === 1">
            <h2 class="title">1. Выберите тему</h2>
            <div class="desc">
              <p>
                В выбранную тему будут скопированы файлы, необходимые для работы
                приложения Awesome Filters.
              </p>
              <p>
                Приложение автоматически создаст <b>бекап</b> - архив с копией
                вашей темы.
              </p>
            </div>
            <themes-list />
            <div class="actions">
              <v-button-primary
                :disabled="!selectedThemeId"
                @click="setSelected(2)"
                >Продолжить установку</v-button-primary
              >
              <v-button-outline
                v-show="selectedTheme && selectedTheme.installed"
                @click="installToTheme"
                >Обновить</v-button-outline
              >
            </div>
          </section>
          <section v-show="selectedSection === 2">
            <h2 class="title">2. Выберите шаблон страницы</h2>
            <div class="desc">
              <p>
                Выберите дизайн страницы, соответствующий вашей теме дизайна или
                Стандартный.
              </p>
              <p>
                Если не нашли вашу тему в списке,
                <a href="#">закажите</a> индивидуальную разработку страницы с
                фильтрами у нас.
              </p>
            </div>
            <templates-list />
            <div class="actions">
              <v-button-primary
                :disabled="!selectedThemeId || !selectedTemplate"
                @click="installToTheme"
                >Установить</v-button-primary
              >
              <v-button-inline @click="setSelected(1)">Назад</v-button-inline>
            </div>
          </section>
        </div>
      </content-layout>
    </preloader>
  </div>
</template>

<script>
import ThemesList from "../organisms/ThemesList";
import { mapState, mapGetters } from "vuex";
import VButtonPrimary from "../molecules/VButton/VButtonPrimary";
import VButtonInline from "../molecules/VButton/VButtonInline";
import VButtonOutline from "../molecules/VButton/VButtonOutline";
import Preloader from "../molecules/Preloader";
import ContentLayout from "../layouts/ContentLayout";
import TemplatesList from "../organisms/TemplatesList";
import VIcon from "../atoms/VIcon/VIcon";
export default {
  name: "Home",
  components: {
    TemplatesList,
    ContentLayout,
    VButtonOutline,
    VButtonInline,
    VButtonPrimary,
    ThemesList,
    Preloader,
    VIcon
  },
  created() {
    this.$store.dispatch("setThemes");
  },
  data: () => ({
    selectedSection: 1
  }),
  computed: {
    ...mapState(["user", "selectedThemeId", "selectedTemplate"]),
    ...mapGetters(["selectedTheme", "loading", "loadingText"]),
    editSourceCodeUrl() {
      if (!this.user) {
        return;
      }
      return `https://${this.user.shop}/admin2/themes/${this.selectedThemeId}`;
    }
  },
  methods: {
    installToTheme() {
      this.$store.dispatch("backupTheme").then(() => {
        this.$store.dispatch("installToTheme").then(success => {
          this.$noty.success(success);
        }).catch(e => {
          console.log(e);
          this.$noty.error(e);
        });
      });
    },
    setSelected(section) {
      this.selectedSection = section;
    },
    selectAndCopy(el) {
      const copied = document.createElement("div");
      copied.className = "copied";
      copied.innerHTML = "Скопировано";
      if (!el) {
        return;
      }
      el.select();
      document.execCommand("copy");
      el.parentNode.insertBefore(copied, el.nextSibling);
      setTimeout(() => {
        copied.remove();
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.installation-view {
  text-align: left;
}
h2 {
  color: $color-b3;
}
.view-content {
  padding: 0 30px;
}
.desc {
  text-align: left;
  margin-bottom: 15px;
  font-size: 14px;
  color: $color-b2;
}
.code {
  background-color: $color-highlight;
  padding: 7px 15px;
  margin: 5px 0;
  cursor: pointer;
  -webkit-appearance: none;
  border: 0;
  height: 22px;
  width: 372px;
  font-size: 16px;
}
</style>
<style lang="scss">
.installation-view {
  section {
    .v-button {
      margin-top: 15px;
      margin-right: 10px;
    }
    .actions {
      display: flex;
      .v-button {
        margin-top: 25px;
        font-size: 16px;
      }
    }
    img {
      display: block;
      margin: 20px 0;
    }
  }
  .copied {
    position: absolute;
    margin-left: 440px;
    margin-top: -34px;
    color: $color-w1;
  }
  .v-button-inline {
    color: $color-b3;
  }
  .installation-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 40px 28px;
      font-weight: bold;
      font-size: 14px;
      &:not(.selected) {
        opacity: 0.5;
      }
      .v-icon {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
