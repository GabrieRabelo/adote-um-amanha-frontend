<template>
  <v-container fill-height class="align-start">
    <v-container class="align-center justify-center">
      <div class="d-flex justify-center mt-4">
        <img class="logoImage" src="../../../assets/img/logo.svg" />
      </div>
      <div class="flex-column align-center mt-16">
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Necessidades das Casas"
            color="primary"
            outlined
            @click="onNecessitiesButtonClick"
          />
        </div>
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Doação personalizada"
            color="primary"
            outlined
            @click="onPersonalizedDonationButtonClick"
          />
        </div>
        <div class="d-flex justify-center mb-4">
          <Button
            class="extended-button font-weight-medium"
            title="Minhas doações"
            color="primary"
            outlined
            @click="onMyDonationsButtonClick"
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
      this.$router.push("/necessities");
    },
    onPersonalizedDonationButtonClick() {
      this.$router.push("/necessities/create");
    },
    onMyDonationsButtonClick() {
      this.$router.push("/donations");
    },
    onLogoutButtonClick() {
      this.$router.push("/auth");
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
