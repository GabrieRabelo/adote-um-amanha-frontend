<template>
  <v-btn
    class="a-button v-application px-9 py-5"
    :class="{ disabled: $attrs.disabled }"
    :elevation="elevation"
    v-bind="$attrs"
    v-on="$listeners"
    rounded
  >
    <v-icon v-if="prependIcon" left dark>{{ prependIcon }}</v-icon>
    <span class="a-button--title">
      {{ title }}
    </span>
    <v-icon v-if="appendIcon" right dark>{{ appendIcon }}</v-icon>
  </v-btn>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    prependIcon: String,
    appendIcon: String,
  },
  computed: {
    elevation() {
      return this.$attrs.elevation || 0;
    },
  },
});
</script>

<style scoped lang="scss">
.v-btn {
  text-transform: none;
  color: #191919 !important;
  font-size: 16px;
  font-weight: 400;
  box-sizing: border-box;
  transition: 300ms;
  border: 2px solid #ffd25a;

  .v-icon {
    color: #191919;
  }
}

.error--text {
  border: 2px solid var(--v-error-base);
}

.a-button {
  &--title {
    color: #191919 !important;
  }
}

.disabled {
  border: 2px solid rgba(0, 0, 0, 0) !important;
}
</style>
