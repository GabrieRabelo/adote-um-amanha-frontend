<template>
  <v-container>
    <div class="filter-title mx-2 mb-4">Doações</div>
    <div class="mx-2">
      <Slider
        track-color="#ccc"
        min="0"
        max="10"
        prependText="0"
        appendText="10+"
        thumb-label
        title="Aprovadas"
        v-model="filters.donationsApproved"
        @change="saveFilterAndEmit"
      />
    </div>
    <div class="mx-2">
      <Slider
        track-color="#ccc"
        min="0"
        max="10"
        prependText="0"
        appendText="10+"
        thumb-label
        title="Recusadas"
        v-model="filters.donationsRefused"
        @change="saveFilterAndEmit"
      />
    </div>
    <v-row class="justify-center">
      <Button
        class="button-container"
        title="Aplicar Filtros"
        color="primary"
        elevation="2"
        @click="onConfirmClick"
      ></Button>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "../../../shared/components/Button.vue";
import Slider from "../../../shared/components/Slider.vue";
import ToolbarNavigationMixin from "../../../shared/mixins/ToolbarNavigationMixin";
import { setDonatorsFilters } from "../../../shared/utils/UserPreferences";

export default Vue.extend({
  components: { Button, Slider },
  mixins: [ToolbarNavigationMixin],
  props: ["filters"],
  model: {
    prop: "filters",
    event: "change",
  },
  data: () => ({}),
  methods: {
    onToolbarNavButtonClick() {
      this.$emit("filterToggle", false);
    },
    onSubcategoryChange(value) {
      this.filters.subcategories = this.getResultFilter(
        value,
        this.filters.subcategories
      );
      this.saveFilterAndEmit();
    },
    onCategoryChange(value) {
      this.filters.categories = this.getResultFilter(
        value,
        this.filters.categories
      );
      this.saveFilterAndEmit();
    },
    onStatusChange(value) {
      this.filters.status = this.getResultFilter(value, this.filters.status);
      this.saveFilterAndEmit();
    },
    getColor(value, filter) {
      return filter.includes(value) ? "#ffc700" : "#E5E5E5";
    },
    getResultFilter(value, filterGroup) {
      if (filterGroup.includes(value)) {
        return filterGroup.filter((subcategory) => subcategory !== value);
      }
      return [...filterGroup, value];
    },
    onConfirmClick() {
      this.$emit("filterToggle", false);
    },
    onDateChange(startDate) {
      this.filters.startDate = this.allDates.find(
        (date) => date.value === startDate
      );
      this.saveFilterAndEmit();
    },
    saveFilterAndEmit() {
      setDonatorsFilters(this.filters);
      this.$emit("change", this.filters);
    },
  },
  async mounted() {
    this.$root.showToolbar("FILTRO DE PESQUISA");
    this.$root.showToolbarButton();
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.filter-title {
  font-weight: normal;
  font-size: 1.2rem;
}
.a-fab {
  max-width: 120px;
  position: fixed;
  bottom: 12px;
}
.button-container {
  position: fixed;
  bottom: 36px;
}
</style>
