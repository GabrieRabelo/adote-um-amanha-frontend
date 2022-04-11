<template>
  <v-stepper :value="number" class="a-stepper elevation-0">
    <v-stepper-header class="a-stepper__header">
      <v-stepper-step step="1"> </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2"> </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"> </v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  props: ["number"],
};
</script>

<style lang="scss">
.a-stepper {
  &__header {
    box-shadow: none !important;
  }
  min-width: 300px;
}
</style>
