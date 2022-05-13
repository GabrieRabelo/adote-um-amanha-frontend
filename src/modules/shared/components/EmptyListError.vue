<template>
  <div class="empty-list__container">
    <img
      class="empty-list__image mb-4"
      src="../../../assets/img/empty-list.png"
      alt="Not found"
      width="128"
    />
    <div class="empty-list__text text--title mb-4">{{ title }}</div>
    <div class="empty-list__text text--body">{{ body }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title", "body"],
});
</script>

<style lang="scss" scoped>
.empty-list {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__text {
    text-align: center;
    color: #999;
  }
}

.text {
  &--title {
    font-weight: 600;
    font-size: 17px;
  }
}
</style>
