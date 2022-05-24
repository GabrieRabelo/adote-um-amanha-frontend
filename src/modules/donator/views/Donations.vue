<template>
  <v-slide-x-transition leave-absolute>
    <component
      :is="currentContent"
      @filterToggle="onFilterToggle"
      v-model="filters"
    />
  </v-slide-x-transition>
</template>

<script>
import Vue from "vue";
import { getDonationsFilters } from "../../shared/utils/UserPreferences";
import DonationsFilter from "../../shared/components/DonationsFilter.vue";
import DonationsContent from "../../shared/components/DonationsContent.vue";

export default Vue.extend({
  components: { DonationsFilter, DonationsContent },
  data: () => ({
    filterActive: false,
    filters: getDonationsFilters(),
  }),
  methods: {
    onNecessityClick(necessity) {
      this.$router.push(`/necessity/${necessity.id}`);
    },
    onFilterToggle(active) {
      this.filterActive = active;
    },
  },
  computed: {
    currentContent() {
      return this.filterActive ? "DonationsFilter" : "DonationsContent";
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
