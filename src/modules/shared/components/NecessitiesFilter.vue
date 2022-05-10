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

      <div class="mx-2 my-6" v-if="shouldShowStatusFilter">
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

    <v-divider v-if="shouldShowStatusFilter"></v-divider>

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
import Vue from "vue";
import Button from "./Button.vue";
import CategoryUtils from "../enums/Category";
import SubcategoryUtils from "../enums/Subcategory";
import StatusUtils from "../enums/Status";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
import Select from "./Select.vue";
import DateFilter from "../enums/DateFilter";
import {
  setNecessitiesFilters,
  setDonationsFilters,
} from "../utils/UserPreferences";
import { UserRole } from "../enums/UserRole";
import { RequestType } from "../models/RequestEntity";
import { getUserData } from "../utils/LoggedUserManager";

export default Vue.extend({
  components: { Button, Select },
  mixins: [ToolbarNavigationMixin],
  props: ["filters", "requestType"],
  model: {
    prop: "filters",
    event: "change",
  },
  data: () => ({}),
  methods: {
    buttonClick() {
      console.log("Click");
    },
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
      const setter =
        this.requestType === RequestType.necessity
          ? setNecessitiesFilters
          : setDonationsFilters;
      setter(this.filters);
      this.$emit("change", this.filters);
    },
  },
  async mounted() {
    this.$root.showToolbar("FILTRO DE PESQUISA");
  },
  computed: {
    allCategories() {
      return CategoryUtils.allPluralObjects();
    },
    allSubcategories() {
      return SubcategoryUtils.allObjects();
    },
    allStatus() {
      const currentUser = getUserData();
      if (currentUser.role === UserRole.admin) {
        return StatusUtils.allObjects();
      }
      if (
        currentUser.role === UserRole.institution &&
        this.requestType === RequestType.necessity
      ) {
        return StatusUtils.allObjects();
      }
      if (
        currentUser.role === UserRole.donator &&
        this.requestType === RequestType.donation
      ) {
        return StatusUtils.allObjects();
      }
      return StatusUtils.allObjects().slice(0, -1);
    },
    allDates() {
      return DateFilter.allObjects();
    },
    shouldShowStatusFilter() {
      const currentUser = getUserData();
      return !(
        currentUser.role === UserRole.donator &&
        this.requestType === RequestType.necessity
      );
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
