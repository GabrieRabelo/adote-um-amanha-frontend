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
        />
      </v-col>
      <v-col cols="3" class="d-flex flex-column align-end px-0 py-0">
        <v-btn fab color="primary"
          ><v-icon color="black">mdi-filter-variant</v-icon></v-btn
        >
      </v-col>
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
    <v-row class="justify-end mr-6">
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
import { getNecessities } from "@/modules/shared/services/necessityService";
import Vue from "vue";
import Input from "../components/Input.vue";
import NecessityCard from "../components/NecessityCard.vue";
import Button from "../components/Button.vue";
import { getUserData } from "../utils/LoggedUserManager";
import { UserRole } from "../enums/UserRole";
import { Status } from "../enums/Status";

export default Vue.extend({
  components: { Input, NecessityCard, Button },
  data: () => ({
    necessities: [],
  }),
  async mounted() {
    this.$root.showToolbar("NECESSIDADES");
    this.necessities = await this.getNecessities();
    this.$root.hideToolbarButton();
  },
  unmounted() {
    this.$root.showToolbarButton();
  },
  methods: {
    async getNecessities() {
      const user = getUserData();
      debugger;
      const params = {
        direcao: "DESC",
        ordenacao: "dataHora",
        status: user.role === UserRole.institution ? null : `${Status.pending}`,
      };
      return getNecessities(params);
    },
    onNecessityClick(necessity) {
      this.$router.push(`/necessity/${necessity.id}`);
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
</style>
