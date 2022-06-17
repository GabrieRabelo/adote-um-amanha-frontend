<template>
  <v-row class="justify-center scroll-loader__slot">
    <v-progress-circular
      v-if="value"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-row>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
};
</script>

<style scoped>
.scroll-loader__slot {
  height: 50px;
}
</style>
