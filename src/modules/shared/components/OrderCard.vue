<template>
  <div
    class="card px-5 py-3 d-flex flex-column"
    v-ripple
    @click="$emit('click')"
  >
    <div class="d-flex">
      <div class="card__title">{{ order.title }}</div>
    </div>
    <div>
      <div class="d-flex my-1">
        <img
          width="25px"
          src="../../../assets/img/institution-logo.png"
          alt="user logo"
          v-if="isNecessity"
        />
        <img
          v-else
          width="25px"
          src="../../../assets/img/donator-logo.png"
          alt="user logo"
        />
        <span class="card__subtitle card__subtitle--span ml-2">{{
          institutionName
        }}</span>
      </div>
      <div class="d-flex justify-space-between">
        <div class="card__subtitle">{{ orderInfo }}</div>
        <div class="card__subtitle">{{ order.createdDate | date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Subcategory from "../enums/Subcategory";
import dateFormat from "../filters/dateFormat";
import { getUserData } from "../utils/LoggedUserManager";
import { UserRole } from "../enums/UserRole";
import StatusUtils from "../enums/Status";
import { RequestType } from "../models/RequestEntity";
import Category from "../enums/Category";

export default Vue.extend({
  props: {
    order: Object,
  },
  filters: {
    date: dateFormat,
  },
  computed: {
    institutionName() {
      return getUserData().role == UserRole.admin ? this.order.user.name : "";
    },
    subcategory() {
      return Subcategory.toString(this.order.subcategory);
    },
    category() {
      return Category.toPluralString(this.order.category);
    },
    status() {
      return StatusUtils.toString(this.order.status);
    },
    iconSrc() {
      const file = this.isNecessity
        ? "institution-logo.png"
        : "donator-logo.png";
      return `../../../assets/img/${file}`;
    },
    isNecessity() {
      return this.order.type === RequestType.necessity;
    },
    orderInfo() {
      const items = [this.subcategory, this.category].filter((e) => e);
      return items.join(", ");
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

    &--span {
      margin: auto;
    }
  }

  &__status {
    font-style: italic;
    line-height: 1.5;
    vertical-align: baseline;
  }
}
</style>
