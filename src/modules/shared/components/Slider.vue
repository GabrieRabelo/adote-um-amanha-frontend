<template>
  <div>
    <div v-if="title" class="slider__title">
      {{ title }}
    </div>
    <v-slider v-bind="$attrs" v-on="$listeners">
      <template v-if="prependText" slot="prepend">{{ prependText }}</template>
      <template v-if="appendText" slot="append">{{ appendText }}</template>
    </v-slider>
  </div>
</template>

<script>
export default {
  props: {
    prependText: String,
    appendText: String,
    title: String,
  },
};
</script>

<style scoped lang="scss">
.slider__title {
  font-weight: 600;
}
</style>
