<template>
  <v-container class="container align-start">
    <v-col class="pa-0">
      <div class="mx-2 my-6">
        <div class="font-weight-bold">Categoria</div>
        <v-row align="center">
          <div class="mt-4 align-left">
            <v-chip
              v-for="subcategory in allSubcategories"
              :key="subcategory.value"
              class="ma-2"
              :color="getColor(subcategory.value, filters.subcategories)"
              @click="onSubcategoryChange(subcategory.value)"
            >
              {{ subcategory.name }}
            </v-chip>
          </div>
        </v-row>
      </div>

      <v-divider></v-divider>

      <div class="mx-2 my-6">
        <div class="font-weight-bold">Tipo</div>
        <v-row align="center">
          <div class="mt-4 align-left">
            <v-chip
              v-for="category in allCategories"
              :key="category.value"
              class="ma-2"
              :color="getColor(category.value, filters.categories)"
              @click="onCategoryChange(category.value)"
            >
              {{ category.name }}
            </v-chip>
          </div>
        </v-row>
      </div>

      <v-divider></v-divider>

      <div class="mx-2 my-6">
        <div class="font-weight-bold">Status</div>
        <v-row align="center">
          <div class="mt-4 align-left">
            <v-chip
              v-for="status in allStatus"
              :key="status.value"
              class="ma-2"
              :color="getColor(status.value, filters.status)"
              @click="onStatusChange(status.value)"
            >
              {{ status.name }}
            </v-chip>
          </div>
        </v-row>
      </div>
    </v-col>

    <v-divider></v-divider>

    <v-row class="ml-0 mt-4">
      <v-col class="py-0">
        <div class="font-weight-bold">Data</div>
        <v-col class="px-0" cols="6" sm="6">
          <Select
            :items="allDates"
            label="Data"
            outlined
            :item-text="'name'"
            :item-value="'value'"
            @change="onDateChange"
            v-model="filters.startDate"
          />
        </v-col>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <Button
        class="apply-filter"
        title="Aplicar Filtros"
        color="primary"
        elevation="2"
        @click="onConfirmClick"
      ></Button>
    </v-row>
  </v-container>
</template>

<script>
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import { setMatchesFilters } from "@/modules/shared/utils/UserPreferences";
import Vue from "vue";
import Button from "../../../shared/components/Button.vue";
import Select from "../../../shared/components/Select.vue";
import CategoryUtils from "../../../shared/enums/Category";
import SubcategoryUtils from "../../../shared/enums/Subcategory";
import StatusUtils from "../../../shared/enums/Status";
import DateFilter from "@/modules/shared/enums/DateFilter";

export default Vue.extend({
  components: { Button, Select },
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
      setMatchesFilters(this.filters);
      this.$emit("change", this.filters);
    },
  },
  async mounted() {
    this.$root.showToolbar("FILTRO DE PESQUISA");
    this.$root.showToolbarButton();
  },
  computed: {
    allCategories() {
      return CategoryUtils.allPluralObjects();
    },
    allSubcategories() {
      return SubcategoryUtils.allObjects();
    },
    allStatus() {
      return StatusUtils.allObjects();
    },
    allDates() {
      return DateFilter.allObjects();
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.title {
  font-weight: bold;
}
.a-fab {
  max-width: 120px;
  position: fixed;
  bottom: 12px;
}
</style>
