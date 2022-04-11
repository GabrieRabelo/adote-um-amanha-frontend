<template>
  <iframe
    class="a-button px-9 py-5"
    elevation="0"
    v-on="$listeners"
    frameborder="0"
    v-if="computedSource"
    :src="computedSource"
  >
  </iframe>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    src: String,
  },
  computed: {
    computedSource(): string | null {
      if (!this.src.includes("https://")) {
        return null;
      }
      return this.src;
    },
  },
});
</script>

<style scoped></style>
