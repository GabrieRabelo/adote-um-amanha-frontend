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
import MatchesContent from "./MatchesContent.vue";
import MatchesFilter from "./MatchesFilter.vue";
import { getMatchesFilters } from "@/modules/shared/utils/UserPreferences";

export default Vue.extend({
  components: { MatchesFilter, MatchesContent },
  data: () => ({
    filterActive: false,
    filters: { ...getMatchesFilters(), page: 0 },
  }),
  methods: {
    onNecessityClick(necessity) {
      this.$router.push(`/admin/necessities/${necessity.id}`);
    },
    onFilterToggle(active) {
      this.filterActive = active;
    },
  },
  computed: {
    currentContent() {
      return this.filterActive ? "MatchesFilter" : "MatchesContent";
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
