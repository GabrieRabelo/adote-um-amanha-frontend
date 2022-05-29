<template>
  <div class="info__container">
    <div class="info__header d-flex">
      <div class="info__img justify-center">
        <img
          v-if="isNecessity"
          width="40px"
          src="../../../assets/img/institution-logo.png"
          alt="user logo"
        />
        <img
          v-else
          width="40px"
          src="../../../assets/img/donator-logo.png"
          alt="user logo"
        />
      </div>
      <div class="info__title ml-2 d-flex align-center">
        <span>{{ order.title }}</span>
      </div>
    </div>
    <span class="info__description">{{ order.description }}</span>
  </div>
</template>

<script>
import Vue from "vue";
import { RequestType } from "../models/RequestEntity";
export default Vue.extend({
  props: ["order"],
  computed: {
    isNecessity() {
      return this.order.type === RequestType.necessity;
    },
  },
});
</script>

<style lang="scss">
.info {
  &__title {
    font-weight: 600;
  }
  &__description {
    font-style: italic;
    color: #00000099;
  }
}
</style>
