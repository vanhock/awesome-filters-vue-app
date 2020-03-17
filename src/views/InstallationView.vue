<template>
  <div class="installation-view">
    <content-layout sidebar-position="right">
      <div class="view-content">
        <preloader :show="loading" :text="loadingText">
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
              <p>Выберите тему, в которую вы хотите установить Awesome Filters.</p>
              <p>
                В выбранную тему будут скопированы файлы, необходимые для работы
                приложения Awesome Filters.
              </p>
              <p>
                Установка полностью безопасна. Приложение автоматически создаст <b>бекап</b> - архив с копией
                вашей темы.
              </p>
              <p>В списке отображены только не опубликованные темы.</p>
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
                @click="installToTheme(true)"
                >Обновить</v-button-outline
              >
            </div>
          </section>
          <section v-show="selectedSection === 2">
            <h2 class="title">2. Выберите шаблон страницы</h2>
            <div class="desc">
              <p v-if="selectedTheme">
                Ваша тема: <b>{{ selectedTheme.title }}</b>
              </p>
              <p>
                Выберите шаблон страницы, соответствующий вашей теме дизайна.
              </p>
              <p>
                Если не нашли вашу тему в списке, то выберите Стандартный
                шаблон.
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
          <section v-if="selectedSection === 3 && selectedTheme">
            <h2 class="title">3. Просмотр темы</h2>
            <div class="desc">
              <p>
                Приложение успешно установлено в тему {{ selectedTheme.title }}!
              </p>
              <h3>Что дальше?</h3>
              <p>Проверьте корректность установки приложения в тему.</p>
              <p>
                Если вы устанавливали приложение на нестандартную или измененную
                тему дизайна, <br />
                то внесите изменения в текущий шаблон collection.liquid,
                используя бекап.
              </p>
              <h3>Нужна доработка шаблона?</h3>
              <p>
                <a href="mailto: hello@thedevl.com" target="_blank"
                  >Обратитесь к нам</a
                >, мы доработаем страницу с фильтрами и добавим нужный
                фунционал.
              </p>
            </div>
            <div class="actions">
              <a
                :href="
                  `https://${user.shop}/collection/all?theme_preview=${selectedTheme.id}`
                "
                target="_blank"
              >
                <v-button-primary>Посмотреть тему</v-button-primary>
              </a>
              <v-button-inline @click="returnToStart">В начало</v-button-inline>
            </div>
          </section>
        </preloader>
        <faq-list />
      </div>
    </content-layout>
  </div>
</template>

<script>
import ThemesList from "../organisms/ThemesList";
import FaqList from "../organisms/FaqList";
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
    FaqList,
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
    installToTheme(update = false) {
      this.$store.dispatch("backupTheme").then(() => {
        this.$store
          .dispatch("installToTheme", {update: update})
          .then(success => {
            this.$noty.success(success);
            this.selectedSection = 3;
          })
          .catch(e => {
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
    },
    returnToStart() {
      this.selectedSection = 1;
      this.$store.commit("setSelectedTheme", "");
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
  padding: 0 30px 50px;
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
      a {
        text-decoration: none;
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
