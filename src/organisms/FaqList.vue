<template>
  <div class="faq-list">
    <div class="faq-list__header">FAQ - вопросы и ответы</div>
    <div
      class="faq-list__item list-item"
      v-for="(item, index) in items"
      :key="index"
      :class="{ active: activeItem === index }"
    >
      <div class="list-item__title" @click="activeItem = index">{{ item.title }}</div>
      <div class="list-item__content">{{ item.content }}</div>
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
        title: "dsfsdf",
        content: "dsfs dsfsd sd fsdfs dfds fsdf sdf sd sd fsdf"
      },
      {
        title: "dd sdfsdf",
        content: "dsdsfdsfsdf dfdfdf fsdf sdf sd sd fsdf"
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
