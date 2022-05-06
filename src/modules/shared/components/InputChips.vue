<template>
  <v-chip-group class="py-0" v-bind="$attrs" v-on="$listeners">
    <v-chip
      v-for="(chip, index) in parsedChips"
      :key="index"
      class="input-chips__chip my-0"
      small
      color="primary"
      @click="$emit('click')"
    >
      {{ chip.name }}
    </v-chip>
  </v-chip-group>
</template>

<script lang="ts">
import Vue from "vue";
import Category from "../enums/Category";
import Status from "../enums/Status";
import Subcategory from "../enums/Subcategory";
export default Vue.extend({
  props: ["filters"],
  inheritAttrs: false,
  computed: {
    parsedChips() {
      const categories = Category.allPluralObjects().filter((cat) =>
        this.filters.categories.includes(cat.value)
      );
      const subcategories = Subcategory.allObjects().filter((sub) =>
        this.filters.subcategories.includes(sub.value)
      );
      const status = Status.allObjects().filter((status) =>
        this.filters.status.includes(status.value)
      );

      return [...categories, ...subcategories, ...status];
    },
  },
});
</script>

<style lang="scss" scoped>
.input-chips {
  &__chip {
    color: black !important;
  }
}
</style>
