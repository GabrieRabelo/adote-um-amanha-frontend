<template>
  <div>
    <v-card>
      <v-card-title> Motivo </v-card-title>
      <v-card-text>
        {{ motive }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    motive: String,
  },
});
</script>

<style></style>
