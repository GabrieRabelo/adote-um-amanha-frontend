<template>
  <iframe
    class="a-button px-9 py-5"
    elevation="0"
    v-on="$listeners"
    frameborder="0"
    v-if="src"
    :src="embeddedVideo"
  >
  </iframe>
</template>

<script>
import Vue from "vue";
import YoutubeVideoParser from "../utils/YoutubeVideoParser";
export default Vue.extend({
  props: {
    src: String,
  },
  computed: {
    embeddedVideo() {
      return YoutubeVideoParser.toEmbeddedVideo(this.src);
    },
  },
});
</script>

<style scoped></style>
