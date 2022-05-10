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
    <v-row class="justify-end mr-6" v-if="shouldShowCreateButton">
      <Button
        class="a-fab"
        :title="shouldLoadNecessities ? 'Criar' : 'Doar'"
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
import { getNecessities } from "../services/NecessityService";
import { getUserData } from "../utils/LoggedUserManager";
import { UserRole } from "../enums/UserRole";
import ToolbarMenuMixin from "../mixins/ToolbarMenuMixin";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
import InputChips from "./InputChips.vue";
import { getNecessitiesFilters } from "../utils/UserPreferences";
import lodash from "lodash";
import { RequestType } from "../models/RequestEntity";
import { getDonations } from "@/modules/donator/services/DonationService";

export default Vue.extend({
  mixins: [ToolbarMenuMixin, ToolbarNavigationMixin],
  components: { Input, NecessityCard, Button, InputChips },
  props: {
    filters: Object,
    requestType: String,
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
    this.$root.showToolbar(
      this.shouldLoadNecessities ? "NECESSIDADES" : "DOAÇÕES"
    );
    this.$root.startLoader();
    this.loadFilters();
    this.necessities = await this.getNecessities();
    this.$root.stopLoader();
  },
  methods: {
    onNecessityClick(necessity) {
      var route = ``;
      if (this.isUserInstitution) {
        route = `/necessity/${necessity.id}`;
      } else if(this.isUserDonator) {
        route = this.shouldLoadNecessities
        ? `/necessityDescription/${necessity.id}`
        : `/donations/${necessity.id}`;
      }
      this.$router.push(route);
    },
    async getNecessities() {
      this.$root.startLoader();
      const params = {
        direcao: "DESC",
        ordenacao: "dataHora",
        categorias: this.filters.categories.join(","),
        subcategorias: this.filters.subcategories.join(","),
        status: this.filters.status.join(","),
        textoBusca: this.filters.name,
      };
      const getter = this.shouldLoadNecessities ? getNecessities : getDonations;
      const response = await getter(params);
      this.$root.stopLoader();
      return response;
    },
    loadFilters() {
      const filters = getNecessitiesFilters();
      if (filters) {
        this.$emit("change", filters);
      }
    },
    async onInputChange() {
      this.necessities = await this.getNecessities();
    },
  },
  computed: {
    shouldShowCreateButton() {
      return (
        (getUserData().role == UserRole.institution &&
          this.shouldLoadNecessities) ||
        (getUserData().role === UserRole.donator && !this.shouldLoadNecessities)
      );
    },
    shouldLoadNecessities() {
      return this.requestType === RequestType.necessity;
    },
    isUserInstitution() {
      return getUserData().role == UserRole.institution && this.shouldLoadNecessities
    },
    isUserDonator() {
      console.log(getUserData())
      return getUserData().role == UserRole.donator
    }
  },
});
</script>

<style scoped>
.a-fab {
  position: fixed;
  bottom: 12px;
  max-width: 120px;
}
.container {
  height: 100%;
}
</style>
