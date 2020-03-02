<template>
  <div class="installation-view">
    <content-with-sidebar sidebar-position="right">
      <div class="view-content">
        <h1>Установка</h1>
        <h2 class="title">1. Выберите тему</h2>
        <div class="desc">
          <p>
            В выбранную тему будут скопированы файлы, необходимые для работы приложения Awesome Filters.
          </p>
          <p>Рекомендуем устанавливать в <b>не опубликованную тему</b>, чтобы случайно не сломать страницы, видимые для клиента.</p>
          <div>
            Список файлов, которые будут скопированые при установке:
            <!--<ul>
              <li></li>
            </ul>-->
          </div>
        </div>
        <themes-list />
        <h2 class="title">2. Подключите сниппеты</h2>
        <div class="desc">
          <p>Подключить сниппеты на сайт в теме с помощью <code>{% include '[snippet]' %}</code>, где [snippet] - имя файла, без расширения .liquid.</p>
          <p>Подключить сниппет перед закрывающим тегом <code>&lt;/head&gt;</code></p>
          <p>Сниппет подключить перед закрывающим тегом <code>&lt;/body&gt;</code></p>
          <v-button-primary>Перейти в редактирование кода темы</v-button-primary>
        </div>
        <h2 class="title">3. Настройте шаблон collection.liquid</h2>
        <div class="desc">
          <b>Внимание!</b> Для настройки данного шаблона необходимо знать синтаксис шаблонов Vue.js, <br />
          если вы не обладаете данными навыками, то рекомендуем обратиться к нашим специалистам для дальнейшей установки приложения. <br />
          <p><b>Это бесплатно!</b> Услуга по установке входит в стоимость приложения!</p>
        </div>
      </div>
    </content-with-sidebar>
  </div>
</template>

<script>
import ContentWithSidebar from "../layouts/ContentWithSidebarLayout";
import ThemesList from "../organisms/ThemesList";
import { mapState } from "vuex";
import VButtonPrimary from "../molecules/VButton/VButtonPrimary";
export default {
  name: "Home",
  components: {
    VButtonPrimary,
    ThemesList,
    ContentWithSidebar
  },
  created() {
    this.$store.dispatch("setThemes");
  },
  computed: {
    ...mapState(["user"])
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
</style>
