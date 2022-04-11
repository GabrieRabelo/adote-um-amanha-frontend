<template>
  <div>
    <SelectCard
      v-for="option in options"
      :title="option.name"
      :key="option.value"
      :icon="option.icon"
      @click="onCardClick(option)"
      :selected="isSelected(option)"
      class="mb-4"
    />
  </div>
</template>

<script>
import SelectCard from "./SelectCard.vue";
import Vue from "vue";

export default Vue.extend({
  components: { SelectCard },
  props: ["options", "value"],
  data: () => ({
    selectedCard: null,
  }),
  methods: {
    isSelected(option) {
      return this.selectedCard === option.value;
    },
    onCardClick(option) {
      this.selectedCard = option.value;
      this.$emit("cardSelected", option.value);
    },
  },
  mounted() {
    this.selectedCard = this.value;
  },
});
</script>

<style></style>
