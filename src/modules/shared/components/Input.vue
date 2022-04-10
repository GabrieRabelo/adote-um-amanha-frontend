<template>
  <v-text-field
    class="a-input"
    :class="[variantClass, elevation]"
    outlined
    v-bind="$attrs"
    v-on="$listeners"
    :dense="variant == 'round'"
  />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    variant: String,
  },
  inheritAttrs: false,
  computed: {
    variantClass() {
      return this.variant || "";
    },
    elevation() {
      return `elevation-${this.$attrs.elevation || 0}`;
    },
  },
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

.round {
  border-radius: 25px;
  ::v-deep fieldset {
    border: none;
  }
}
</style>
