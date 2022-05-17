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
import NecessitiesFilter from "../components/NecessitiesFilter.vue";
import NecessitiesContent from "../components/NecessitiesContent.vue";
import { getNecessitiesFilters } from "../utils/UserPreferences";

export default Vue.extend({
  components: { NecessitiesFilter, NecessitiesContent },
  data: () => ({
    filterActive: false,
    filters: getNecessitiesFilters(),
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
      return this.filterActive ? "NecessitiesFilter" : "NecessitiesContent";
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
