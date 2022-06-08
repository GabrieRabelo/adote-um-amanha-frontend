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
import { getDonatorsFilters } from "../../shared/utils/UserPreferences";
import DonatorsFilter from "../components/donators/DonatorsFilter.vue";
import DonatorsContent from "../components/donators/DonatorsContent.vue";

export default Vue.extend({
  components: { DonatorsFilter, DonatorsContent },
  data: () => ({
    filterActive: false,
    filters: getDonatorsFilters(),
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
      return this.filterActive ? "DonatorsFilter" : "DonatorsContent";
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
