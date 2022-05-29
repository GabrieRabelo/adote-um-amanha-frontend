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
      v-for="donation in donations"
      :key="donation.id"
      class="justify-center mx-2 mb-2"
    >
      <NecessityCard :necessity="donation" @click="onDonationClick(donation)" />
    </v-row>
    <v-row fluid>
      <EmptyListError
        :title="emptyListTitleText"
        :body="emptyListBodyText"
        class="mt-12 mx-2"
        v-if="isListEmpty"
      />
    </v-row>
    <Button
      class="a-fab"
      title="Doar"
      prependIcon="mdi-plus"
      color="primary"
      elevation="4"
      @click="$router.push('/necessities/create')"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Input from "./Input.vue";
import NecessityCard from "./NecessityCard.vue";
import Button from "./Button.vue";
import {
  getUserData,
  isUserInstitution,
  isUserDonator,
  isUserAdmin,
} from "../utils/LoggedUserManager";

import { UserRole } from "../enums/UserRole";
import ToolbarMenuMixin from "../mixins/ToolbarMenuMixin";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
import InputChips from "./InputChips.vue";
import lodash from "lodash";
import { getDonations } from "@/modules/donator/services/DonationService";
import EmptyListError from "./EmptyListError.vue";

export default Vue.extend({
  mixins: [ToolbarMenuMixin, ToolbarNavigationMixin],
  components: { Input, NecessityCard, Button, InputChips, EmptyListError },
  props: {
    filters: Object,
  },
  model: {
    prop: "filters",
    event: "change",
  },
  data: () => ({
    donations: [],
    loaded: false,
  }),
  created() {
    this.onInputChange = lodash.debounce(this.onInputChange, 500);
  },
  async mounted() {
    this.$root.showToolbar("DOAÇÕES");
    this.$root.startLoader();
    this.donations = await this.getDonations();
    this.$root.stopLoader();
    this.loaded = true;
  },
  methods: {
    onDonationClick(donation) {
      var route = ``;
      if (isUserInstitution()) {
        route = `/donation/${donation.id}`;
      } else if (isUserDonator()) {
        route = `/donationDescription/${donation.id}`;
      } else if (isUserAdmin()) {
        route = `/admin/donations/${donation.id}`;
      }
      this.$router.push(route);
    },
    async getDonations() {
      this.$root.startLoader();
      const params = {
        direcao: "DESC",
        ordenacao: "dataHora",
        categorias: this.filters.categories.join(","),
        subcategorias: this.filters.subcategories.join(","),
        status: this.filters.status.join(","),
        textoBusca: this.filters.name,
        mesesCorte: this.filters.startDate.value,
      };
      const response = await getDonations(params);
      this.$root.stopLoader();
      return response;
    },
    async onInputChange() {
      this.donations = await this.getDonations();
    },
    onToolbarNavButtonClick() {
      this.$router.push("/home");
    },
  },
  computed: {
    isListEmpty() {
      return this.loaded && !this.donations.length;
    },
    emptyListTitleText() {
      return `Nenhuma doação encontrada!`;
    },
    emptyListBodyText() {
      return `Quando criadas, as doações aparecerão aqui.`;
    },
    shouldShowCreateButton() {
      return getUserData().role === UserRole.donator;
    },
    isUserInstitution() {
      return getUserData().role == UserRole.institution;
    },
    isUserDonator() {
      return getUserData().role == UserRole.donator;
    },
  },
});
</script>

<style scoped>
.a-fab {
  position: fixed;
  max-width: 120px;
  right: 36px;
  bottom: 48px;
}
.container {
  height: 100%;
}
</style>
