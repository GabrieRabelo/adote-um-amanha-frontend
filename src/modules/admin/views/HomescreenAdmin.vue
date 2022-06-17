<template>
  <v-container fill-height class="align-start">
    <v-snackbar v-model="snackbar">
      Rota em Implementação

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>

    <v-container class="align-center justify-center">
      <div class="d-flex justify-center mt-4">
        <img class="logoImage" src="../../../assets/img/logo.svg" />
      </div>
      <div class="flex-column align-center mt-16">
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Necessidades"
            color="primary"
            outlined
            @click="onNecessitiesButtonClick"
          />
        </div>
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Doações"
            color="primary"
            outlined
            @click="onPersonalizedDonationButtonClick"
          />
        </div>
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Solicitações de Match"
            color="primary"
            outlined
            @click="onMatchRequestsClick"
          />
        </div>
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Doadores"
            color="primary"
            outlined
            @click="onDonatorsClick"
          />
        </div>
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Registrar Instituição"
            color="primary"
            outlined
            @click="onRegisterInstitutionsButtonClick"
          />
        </div>
      </div>
      <div class="mx-12">
        <v-divider inline />
      </div>
      <div class="logout">
        <div class="d-flex justify-center mt-6">
          <Button
            class="font-weight-medium"
            title="Sair"
            color="primary"
            outlined
            @click="onLogoutButtonClick"
          />
        </div>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "@/modules/shared/components/Button.vue";
import "@/modules/shared/views/Necessities";
import ToolbarMenuMixin from "../../shared/mixins/ToolbarMenuMixin";

export default Vue.extend({
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
  }),

  mixins: [ToolbarMenuMixin],
  components: {
    Button,
  },
  mounted() {
    this.$root.showToolbar("MENU PRINCIPAL");
    this.$root.stopLoader();
  },
  methods: {
    onNecessitiesButtonClick() {
      this.$router.push("/admin/necessities");
    },
    onPersonalizedDonationButtonClick() {
      this.$router.push("/admin/donations");
    },
    onMatchRequestsClick() {
      this.$router.push("/admin/matches");
    },
    onDonatorsClick() {
      this.$router.push("/admin/donators");
    },
    onLogoutButtonClick() {
      this.$router.push("/auth");
    },
    onRegisterInstitutionsButtonClick() {
      this.$router.push("/admin/institution/create");
    },
  },
});
</script>

<style lang="scss">
.extended-button {
  width: 270px;
}

.logoImage {
  width: 120px;
}

.img {
  &-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
