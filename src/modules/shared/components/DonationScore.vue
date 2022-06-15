<template>
  <div>
    <v-row class="mt-7"><v-divider /></v-row>
    <v-row class="mt-7">Doações</v-row>
    <v-row class="justify-center mt-10">
      <v-card class="a-card-aprovado mr-5" max-width="150" elevation="0">
        <v-card-title>APROVADAS</v-card-title>
        <v-card-text>{{ approved }}</v-card-text>
      </v-card>
      <v-card class="a-card-rejeitado" max-width="150" elevation="0">
        <v-card-title>RECUSADAS</v-card-title>
        <v-card-text>{{ refused }}</v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    approved: Number,
    refused: Number,
  },
});
</script>

<style>
.a-card-aprovado {
  box-shadow: none;
}
.v-card__title {
  font-size: 100%;
}
</style>
