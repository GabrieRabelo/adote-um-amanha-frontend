<template>
  <v-container>
    <v-row class="justify-center align-center my-3 mx-1">
      <v-col class="px-0 py-0">
        <Input
          placeholder="Pesquisar..."
          prepend-inner-icon="mdi-magnify"
          class="mr-2"
          variant="round"
          hide-details
          elevation="3"
          v-model="filters.name"
          @input="onInputChange"
        />
      </v-col>
      <v-col cols="3" class="d-flex flex-column align-end px-0 py-0">
        <v-btn fab color="primary" @click="$emit('filterToggle', true)"
          ><v-icon color="black">mdi-filter-variant</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-row class="my-0" justify="space-around">
      <InputChips @click="$emit('filterToggle', true)" :filters="filters" />
    </v-row>
    <v-row
      v-for="necessity in necessities"
      :key="necessity.id"
      class="justify-center mx-2 mb-2"
    >
      <NecessityCard
        :necessity="necessity"
        @click="onNecessityClick(necessity)"
      />
    </v-row>
    <v-row class="justify-end mr-6" v-if="isInstitution">
      <Button
        class="a-fab"
        title="Criar"
        prependIcon="mdi-plus"
        color="primary"
        elevation="4"
        @click="$router.push('/necessities/create')"
      />
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import Input from "./Input.vue";
import NecessityCard from "./NecessityCard.vue";
import Button from "./Button.vue";
import { getNecessities } from "../services/necessityService";
import { getUserData } from "../utils/LoggedUserManager";
import { UserRole } from "../enums/UserRole";
import ToolbarMenuMixin from "../mixins/ToolbarMenuMixin";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
import InputChips from "./InputChips.vue";
import { getNecessitiesFilters } from "../utils/UserPreferences";
import lodash from "lodash";

export default Vue.extend({
  mixins: [ToolbarMenuMixin, ToolbarNavigationMixin],
  components: { Input, NecessityCard, Button, InputChips },
  props: {
    filters: Object,
  },
  model: {
    prop: "filters",
    event: "change",
  },
  data: () => ({
    necessities: [],
  }),
  created() {
    this.onInputChange = lodash.debounce(this.onInputChange, 500);
  },
  async mounted() {
    this.$root.showToolbar("NECESSIDADES");
    this.$root.startLoader();
    this.loadFilters();
    this.necessities = await this.getNecessities();
    this.$root.stopLoader();
  },
  methods: {
    onNecessityClick(necessity) {
      this.$router.push(`/necessity/${necessity.id}`);
    },
    async getNecessities() {
      const params = {
        direcao: "DESC",
        ordenacao: "dataHora",
        categorias: this.filters.categories.join(","),
        subcategorias: this.filters.subcategories.join(","),
        status: this.filters.status.join(","),
        textoBusca: this.filters.name,
      };
      return getNecessities(params);
    },
    loadFilters() {
      const filters = getNecessitiesFilters();
      if (filters) {
        this.$emit("change", filters);
      }
    },
    async onInputChange(text) {
      console.log(text);
      this.necessities = await this.getNecessities();
      console.log(this.filters);
    },
  },
  computed: {
    isInstitution() {
      return getUserData().role == UserRole.institution;
    },
  },
});
</script>

<style scoped>
.a-fab {
  max-width: 120px;
  position: fixed;
  bottom: 12px;
}
.container {
  height: 100%;
}
</style>
