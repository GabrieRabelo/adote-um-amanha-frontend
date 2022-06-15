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

<style>
.link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
