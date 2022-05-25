<template>
  <div
    class="card px-5 py-3 d-flex flex-column"
    v-ripple
    @click="$emit('click')"
  >
    <div class="d-flex">
      <div class="card__title">{{ match.necessity.title }}</div>
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <div class="d-flex card__subtitle mt-1">
          <img
            src="../../../assets/img/institution-logo.png"
            alt="institution-icon"
            width="24"
          />
          <span class="ml-2">{{ match.necessity.user.name }}</span>
        </div>
        <div class="d-flex card__subtitle mt-1">
          <img
            src="../../../assets/img/donator-logo.png"
            alt="donator-icon"
            width="24"
          />
          <span class="ml-2">{{ match.donation.user.name }}</span>
        </div>
        <div class="card__subtitle mt-2">{{ subcategory }}</div>
      </div>
      <div class="status-container d-flex align-end">
        <div class="card__subtitle">{{ match.date | date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Subcategory from "@/modules/shared/enums/Subcategory";
import dateFormat from "@/modules/shared/filters/dateFormat";
import Vue from "vue";

export default Vue.extend({
  props: {
    match: Object,
  },
  filters: {
    date: dateFormat,
  },
  computed: {
    subcategory() {
      return Subcategory.toString(this.match.necessity.subcategory);
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
