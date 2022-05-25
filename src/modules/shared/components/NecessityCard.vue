<template>
  <div
    class="card px-5 py-3 d-flex flex-column"
    v-ripple
    @click="$emit('click')"
  >
    <div class="d-flex">
      <div class="card__title">{{ necessity.title }}</div>
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <div class="card__subtitle">{{ subcategory }}</div>
        <div class="card__subtitle">{{ institutionName }}</div>
        <div class="card__subtitle">{{ necessity.createdDate | date }}</div>
      </div>
      <div class="status-container d-flex align-end">
        <v-icon class="mr-1" :color="statusIconColor">{{ statusIcon }}</v-icon>
        <div class="card__status card__subtitle">{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import StatusUtils from "../enums/Status";
import Subcategory from "../enums/Subcategory";
import dateFormat from "../filters/dateFormat";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";

export default Vue.extend({
  props: {
    necessity: Object,
  },
  filters: {
    date: dateFormat,
  },
  computed: {
    institutionName() {
      return getUserData().role == UserRole.admin
        ? this.necessity.user.name
        : "";
    },
    statusIcon() {
      return StatusUtils.getIcon(this.necessity.status);
    },
    statusIconColor() {
      return StatusUtils.getIconColor(this.necessity.status);
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

<style lang="scss">
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
