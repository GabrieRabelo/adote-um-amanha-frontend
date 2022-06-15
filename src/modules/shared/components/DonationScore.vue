<template>
  <div>
    <v-row class="mt-7"><v-divider /></v-row>
    <v-row class="mt-7">Doações</v-row>
    <v-row class="justify-center mt-10">
      <v-card
        class="a-card-aprovado mr-5"
        max-width="150"
        elevation="0"
        outlined
      >
        <v-card-title>APROVADAS</v-card-title>
        <v-card-text class="a-card-text">{{ approved }}</v-card-text>
      </v-card>
      <v-card class="a-card-rejeitado" max-width="150" elevation="0" outlined>
        <v-card-title>RECUSADAS</v-card-title>
        <v-card-text class="a-card-text">{{ refused }}</v-card-text>
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
.a-card-text {
  text-align: center;
  font-size: 20px;
}
.v-card__title {
  font-size: 100%;
}
</style>
