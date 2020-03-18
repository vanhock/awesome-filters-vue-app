<template>
  <content-layout class="unauthorized-view">
    <h1>{{$route.meta.title}}</h1>
    <p>Уважаемый клиент, для обеспечения безопасности мы обновили ключ авторизации приложения.</p>
    <p>Пожалуйста перезайдите в приложение через бекофис.</p>
    <v-button-primary class="back-office" v-if="user && user.shop" @click="toTheBackOffice">Перейти с бек-офис InSales</v-button-primary>
  </content-layout>
</template>
<script>
import ContentLayout from "../layouts/ContentLayout";
import VButtonPrimary from "../molecules/VButton/VButtonPrimary";
import { mapState } from "vuex";
export default {
  name: "unauthorized-view",
  components: { VButtonPrimary, ContentLayout },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    toTheBackOffice() {
      location.href = `https://${this.user.shop}/admin2/applications`;
    }
  }
};
</script>
<style lang="scss" scoped>
  .back-office {
    font-size: 18px;
    margin: 40px auto;
    font-weight: normal;
  }
</style>
