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
      v-for="match in matches"
      :key="match.id"
      class="justify-center mx-2 mb-2"
    >
      <MatchCard :match="match" @click="onMatchClick(match)" />
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
import MatchCard from "../../components/MatchCard.vue";
import {
  getUserData,
  isUserDonator,
  isUserInstitution,
} from "../../../shared/utils/LoggedUserManager";
import { UserRole } from "../../../shared/enums/UserRole";
import ToolbarMenuMixin from "../../../shared/mixins/ToolbarMenuMixin";
import ToolbarNavigationMixin from "../../../shared/mixins/ToolbarNavigationMixin";
import InputChips from "../../../shared/components/InputChips.vue";
import lodash from "lodash";
import { getMatches } from "../../services/MatchesService";
import { getMatchesMock } from "../../services/MatchesService";
import EmptyListError from "../../../shared/components/EmptyListError.vue";

export default Vue.extend({
  mixins: [ToolbarMenuMixin, ToolbarNavigationMixin],
  components: { Input, MatchCard, InputChips, EmptyListError },
  props: {
    filters: Object,
  },
  model: {
    prop: "filters",
    event: "change",
  },
  data: () => ({
    matches: [],
    loaded: false,
  }),
  created() {
    this.onInputChange = lodash.debounce(this.onInputChange, 500);
  },
  async mounted() {
    this.$root.showToolbar("MATCHES");
    this.$root.startLoader();
    this.matches = await this.getMatches();
    this.$root.stopLoader();
    this.loaded = true;
  },
  methods: {
    onMatchClick(match) {
      this.$router.push(`/admin/matches/${match.id}`);
    },
    async getMatches() {
      const params = {
        direcao: "DESC",
        ordenacao: "dataHora",
        categorias: this.filters.categories.join(","),
        subcategorias: this.filters.subcategories.join(","),
        status: this.filters.status.join(","),
        textoBusca: this.filters.name,
        mesesCorte: this.filters.startDate.value,
      };
      const response = await getMatchesMock(params);
      return response;
    },
    async onInputChange() {
      this.matches = await this.getMatches();
    },
    onToolbarNavButtonClick() {
      this.$router.push("/home");
    },
  },
  computed: {
    isListEmpty() {
      return this.loaded && !this.matches.length;
    },
    emptyListTitleText() {
      return `Nenhum match encontrado!`;
    },
    emptyListBodyText() {
      return `Quando criados, os matches aparecerão aqui.`;
    },
    shouldShowCreateButton() {
      return getUserData().role === UserRole.donator;
    },
    isUserInstitution() {
      return isUserInstitution();
    },
    isUserDonator() {
      return isUserDonator();
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
