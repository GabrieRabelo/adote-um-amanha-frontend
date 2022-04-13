<template>
  <Input
    v-on="$listeners"
    v-bind="$attrs"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    @click:append="onIconClick"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Input from "./Input.vue";

export default Vue.extend({
  inheritAttrs: false,
  components: {
    Input,
  },
  data: () => ({
    showPassword: false,
  }),
  methods: {
    onIconClick() {
      this.showPassword = !this.showPassword;
    },
  },
});
</script>

<style></style>
