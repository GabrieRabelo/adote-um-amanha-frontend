<template>
  <div class="card px-5 py-3" v-ripple @click="$emit('click')">
    <v-col class="py-0 px-0">
      <div class="card__title">{{ necessity.title }}</div>
      <div class="card__subtitle">{{ subcategory }}</div>
      <div class="card__subtitle">{{ necessity.createdDate | date }}</div>
    </v-col>
    <div class="status-container d-flex align-end">
      <v-icon class="mr-1" :color="statusIconColor">{{ statusIcon }}</v-icon>
      <div class="card__status card__subtitle">{{ status }}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Status } from "../enums/Status";
import StatusUtils from "../enums/Status";
import Subcategory from "../enums/Subcategory";
import dateFormat from "../filters/dateFormat";

export default Vue.extend({
  props: {
    necessity: Object,
  },
  filters: {
    date: dateFormat,
  },
  computed: {
    statusIcon() {
      return this.necessity.status == Status.resolved
        ? "mdi-checkbox-marked-circle-outline"
        : "mdi-dots-horizontal-circle";
    },
    statusIconColor() {
      return this.necessity.status == Status.resolved ? "#3BB54A" : "#FFAA5A";
    },

    subcategory() {
      return Subcategory.toString(this.necessity.subcategory);
    },

    status() {
      return StatusUtils.toString(this.necessity.status);
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ffc700;
  border-radius: 20px;
  width: 100%;
  display: flex;

  &__title {
    font-size: 17px;
    font-weight: 400;
    color: #000;
  }

  &__subtitle {
    font-size: 14px;
    font-weight: 400;
    color: #00000099;
  }

  &__status {
    font-style: italic;
    line-height: 1.5;
    vertical-align: baseline;
  }
}
</style>
