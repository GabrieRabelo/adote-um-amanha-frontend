<template>
  <v-slide-x-transition leave-absolute>
    <DonatorsContent />
  </v-slide-x-transition>
</template>

<script>
import Vue from "vue";
import DonatorsContent from "../components/donators/DonatorsContent.vue";

export default Vue.extend({
  components: { DonatorsContent },
  methods: {
    onNecessityClick(necessity) {
      this.$router.push(`/necessity/${necessity.id}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
