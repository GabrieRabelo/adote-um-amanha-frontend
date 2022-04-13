<template>
  <span class="link" @click="onClick">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    url: {
      required: true,
      type: String,
    },
  },
  methods: {
    onClick() {
      this.$router.push(this.url);
    },
  },
});
</script>

<style scoped>
.link {
  text-decoration: underline;
}
</style>
