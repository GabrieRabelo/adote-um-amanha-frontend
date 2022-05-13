<template>
  <v-list-item v-on="$listeners">
    <v-list-item-avatar>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-title>{{ title }}</v-list-item-title>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    icon: String,
  },
});
</script>

<style></style>
