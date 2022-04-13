<template>
  <v-textarea v-bind="$attrs" v-on="$listeners" outlined></v-textarea>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped>
.v-text-field {
  border-radius: 10px;

  &--outlined {
    ::v-deep fieldset {
      border-color: var(--v-primary-base);
    }
  }
}
</style>
