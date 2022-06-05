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
    <v-row
      v-for="donator in donators"
      :key="donator.id"
      class="justify-center mx-2 mb-2"
    >
      <DonatorCard :donator="donator" @click="onDonatorClick(donator)" />
    </v-row>
    <v-row fluid>
      <EmptyListError
        :title="emptyListTitleText"
        :body="emptyListBodyText"
        class="mt-12 mx-2"
        v-if="isListEmpty"
      />
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import Input from "../../../shared/components/Input.vue";
import ToolbarMenuMixin from "../../../shared/mixins/ToolbarMenuMixin";
import ToolbarNavigationMixin from "../../../shared/mixins/ToolbarNavigationMixin";
import lodash from "lodash";
import EmptyListError from "../../../shared/components/EmptyListError.vue";
import { getDonators } from "../../services/DonatorsService";
import DonatorCard from "./DonatorCard.vue";

export default Vue.extend({
  mixins: [ToolbarMenuMixin, ToolbarNavigationMixin],
  components: { Input, DonatorCard, EmptyListError },
  props: {
    filters: Object,
  },
  model: {
    prop: "filters",
    event: "change",
  },
  data: () => ({
    donators: [],
    loaded: false,
  }),
  created() {
    this.onInputChange = lodash.debounce(this.onInputChange, 500);
  },
  async mounted() {
    this.$root.showToolbar("DOAÇÕES");
    this.donators = await this.getDonators();
    this.loaded = true;
  },
  methods: {
    onDonatorClick(donator) {
      this.$router.push(donator.id);
    },
    async getDonators() {
      this.$root.startLoader();
      const params = {
        nome: this.filters.name,
        doacoesAprovadas: this.filters.donationsApproved,
        doacoesRecusadas: this.filters.donationsRefused,
      };
      const response = await getDonators(params);
      this.$root.stopLoader();
      return response;
    },
    async onInputChange() {
      this.donators = await this.getDonators();
    },
    onToolbarNavButtonClick() {
      this.$router.push("/home");
    },
  },
  computed: {
    isListEmpty() {
      return this.loaded && !this.donators.length;
    },
    emptyListTitleText() {
      return `Nenhum doador encontrado!`;
    },
    emptyListBodyText() {
      return `Quando existentes, os doadores aparecerão aqui.`;
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
