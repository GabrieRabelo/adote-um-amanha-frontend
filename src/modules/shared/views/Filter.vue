<template>
  <v-container>
    <div class="title ml-2 mt-4">
      <div>Categoria</div>
      <v-row></v-row>
    </div>

    <div class="title ml-2 mt-4">
      <div>Tipo</div>
      <v-row></v-row>
    </div>

    <div class="title ml-2 mt-4">
      <div>Status</div>
      <v-row></v-row>
    </div>

    <div class="title ml-2 mt-4">
      <div>Data</div>
      <v-row></v-row>
    </div>

    <div>
      <Button
        class="justify-center align-center"
        title="Aplicar Filtros"
        color="primary"
        elevation="2"
        @click="$router.push('/home')"
      ></Button>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "../components/Button.vue";

export default Vue.extend({
  components: { Button },
  data: () => ({
    filtro: "Filtro de pesquisa",
  }),
  async mounted() {
    this.$root.showToolbar("FILTRO DE PESQUISA");
  },
});
</script>

<style scoped>
.title {
  font-weight: bold;
}
.a-fab {
  max-width: 120px;
  position: fixed;
  bottom: 12px;
}
</style>
