<template>
  <v-container fill-height class="container">
    <v-img src="../../../assets/img/logo-splash.gif"></v-img>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    duration: 1500,
  }),
  mounted() {
    setTimeout(() => {
      this.$router.push("auth");
    }, this.duration);
  },
});
</script>

<style scoped>
.container {
  background-image: linear-gradient(0deg, #fff05a, rgb(255, 240, 90, 0.57));
}
</style>
