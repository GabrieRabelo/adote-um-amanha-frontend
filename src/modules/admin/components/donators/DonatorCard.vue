<template>
  <div
    class="card px-5 py-3 d-flex flex-column"
    v-ripple
    @click="$emit('click')"
  >
    <div class="d-flex">
      <div class="card__title">{{ donator.name }}</div>
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <div class="card__subtitle">{{ approvedDonations }}</div>
        <div class="card__subtitle">{{ refusedDonations }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    donator: Object,
  },
  computed: {
    approvedDonations() {
      return `Doações Aprovadas: ${this.donator.donationsApproved}`;
    },
    refusedDonations() {
      return `Doações Recusadas: ${this.donator.donationsRefused}`;
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
