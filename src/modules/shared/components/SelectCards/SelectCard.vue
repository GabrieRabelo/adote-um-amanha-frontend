<template>
  <div
    class="card px-5 py-2"
    :class="{ 'card--selected': selected }"
    @click="$emit('click')"
  >
    <v-radio-group :value="selected ? '0' : '-1'">
      <v-radio
        value="0"
        :off-icon="selected ? '$radioOn' : '$radioOff'"
        color="primary"
      />
    </v-radio-group>
    <div class="card__title d-flex align-center">
      {{ title }}
    </div>
    <v-spacer />
    <div class="d-flex align-center">
      <v-icon>{{ icon }}</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "selected", "icon"],
};
</script>

<style>
/*
.card {
  border: 1px solid black;
  border-radius: 20px;
}
.card--selected {
  background-color: none;
}*/
</style>
