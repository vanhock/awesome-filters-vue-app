<template>
  <div class="faq-list">
    <div class="faq-list__header">FAQ - вопросы и ответы</div>
    <div
      class="faq-list__item list-item"
      v-for="(item, index) in items"
      :key="index"
      :class="{ active: activeItem === index }"
      @click="activeItem = index"
    >
      <div class="list-item__title" >{{ item.title }}</div>
      <div class="list-item__content" v-html="item.content"></div>
    </div>
    <p><a href="mailto: hello@thedevl.com" target="_blank">Нужна помощь с установкой?</a></p>
  </div>
</template>
<script>
export default {
  name: "FaqList",
  data: () => ({
    activeItem: 0,
    items: [
      {
        title: "Насколько безопасна установка приложения, не сломает ли оно сайт?",
        content: `<p>Установка приложения полностью безопасна, 
                  перед установкой создается резервная копия вашей темы, а так же копия шаблона collection.liquid.<p>
                  <p>Вы в любой момент можете восстановить резервную копию вашей темы или удалить все файлы приложения из темы.</p>`
      },
      {
        title: "Я могу установить AwesomeFilters на измененную или собственную тему дизайна? Как перенести изменения из существующего шаблона коллекции?",
        content: `<p>Да, вы можете установить AwesomeFilters на любую тему. </p>
                  <p>Если вы вносили доработки в шаблон collection.liquid, то будет необходима доработка шаблона после установки AwesomeFilters.</p>
                  <p>Вы можете внести доработки сами или <a href="" target="_blank">заказать</a> доработку шаблона у нас.</p>`
      },
      {
        title: "Я не нашел свой шаблон в списке, что мне делать?",
        content: `<p>Мы бесплатно установим фильтры на ваш шаблон, если вы приобретали шаблон или устанавливали в магазине InSales и в шаблоне не изменен шаблон collection.liquid.</p>
                  <p>Если шаблон был установлен не из магазина InSales или разработан индивидуально, то установка платная.</p>`
      },
      {
        title: "Доработки входят в стоимость приложения?",
        content: "Доработки шаблона оплачиваются отдельно, по согласованию."
      }
    ]
  })
};
</script>
<style lang="scss">
.faq-list {
  margin-top: 70px;  
  padding-top: 40px;
  font-size: 14px;
  border-top: 1px dashed $color-b4;
  opacity: 0.3;
  transition: opacity linear 0.2s;
  &:hover {
      opacity: 1;
  }
  &__header {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 25px;
      color: $color-b3;
  }
  &__item {
    & > * {
      padding: $padding;
    }
    &:not(.active) {
      .list-item__content {
        height: 0;
        padding: 0;
        opacity: 0;
      }
      .list-item__title {
          cursor: pointer;
      }
    }
    &.active {
      .list-item__content {
        height: auto;
        overflow-y: auto;
        @include scroll();
      }
    }
  }
  .list-item {
    border-bottom: 1px solid #fff;  
    &__title {
        font-weight: bold;
        background-color: $color-b5;
        color: $color-b2;
    }
  }
  
}
</style>
