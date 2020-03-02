<template>
  <empty-placeholder title="Вы не авторизованы" transparent>
    <p>
      Для авторизации перейдите в бек-офис вашего магазина InSales
    </p>
    <p>
      и войдите в приложение AwesomeFilters
    </p>
  </empty-placeholder>
</template>

<script>
  import EmptyPlaceholder from "../molecules/EmptyPlaceholder";
  export default {
    name: "SignIn",
    components: {EmptyPlaceholder}
  }
</script>

<style scoped>

</style>