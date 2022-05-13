<template>
  <v-slide-x-transition leave-absolute>
    <component
      :is="currentContent"
      @filterToggle="onFilterToggle"
      v-model="filters"
      :requestType="requestType"
    />
  </v-slide-x-transition>
</template>

<script>
import Vue from "vue";
import NecessitiesFilter from "../../shared/components/NecessitiesFilter.vue";
import NecessitiesContent from "../../shared/components/NecessitiesContent.vue";
import { getDonationsFilters } from "../../shared/utils/UserPreferences";
import { RequestType } from "@/modules/shared/models/RequestEntity";

export default Vue.extend({
  components: { NecessitiesFilter, NecessitiesContent },
  data: () => ({
    filterActive: false,
    filters: getDonationsFilters(),
    requestType: RequestType.donation,
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
