<template>
  <iframe
    class="a-button px-9 py-5"
    elevation="0"
    v-on="$listeners"
    frameborder="0"
    v-if="src"
    :src="src"
  >
  </iframe>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    src: String,
  },
});
</script>

<style scoped></style>
