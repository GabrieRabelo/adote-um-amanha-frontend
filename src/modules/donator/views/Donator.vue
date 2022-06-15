<template>
  <v-container class="align-start" fill-height>
    <v-container class="align-start px-7" v-if="donator">
      <v-row class="mt-3 mb-4">
        <div class="header">
          <img width="65px" src="../../../assets/img/donator-logo.png" />
          <div class="a-text__bold-title py-0">{{ donator.name }}</div>
        </div>
      </v-row>
      <v-row
        class="justify-space-between mb-3"
        v-for="attribute in attributes"
        :key="attribute.key"
      >
        <div class="a-text">{{ attribute.key }}</div>
        <div class="a-text light">{{ attribute.value }}</div>
      </v-row>
      <v-row>
        <v-col class="px-0 py-0">
          Endereço
          <v-btn icon v-bind:href="getUrlAddress" target="_blank">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <div class="">{{ donator.address }}</div>
        </v-col>
      </v-row>
      <DonationScore
        :approved="donator.approvedDonations"
        :refused="donator.refusedDonations"
      />
    </v-container>
    <v-container class="align-self-end mb-8">
      <v-row class="justify-center">
        <Button
          class="mr-4"
          title="Voltar"
          color="primary"
          prependIcon="mdi-arrow-left"
          outlined
          @click="$router.go(-1)"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import { getDonatorInformation } from "../services/DonatorService";
import Button from "../../shared/components/Button.vue";
import DonationScore from "../../shared/components/DonationScore.vue";

export default Vue.extend({
  data: () => ({
    donator: null,
  }),
  async mounted() {
    this.$root.showToolbar("DOADOR");
    this.donator = await getDonatorInformation(this.$route.params.id);
  },
  components: {
    Button,
    DonationScore,
  },
  computed: {
    attributes() {
      return [
        {
          key: "Telefone",
          value: this.donator.phone,
        },
        {
          key: "Email",
          value: this.donator.email,
        },
        {
          key: "CPF/CNPJ",
          value: this.donator.document,
        },
      ];
    },
    getUrlAddress() {
      return "https://www.google.com/maps/search/" + this.donator.address;
    },
  },
});
</script>

<style scoped>
.a-text {
  color: #000000;
}

.header {
  display: flex;
  align-items: center;
}

.a-text__bold-title {
  padding: 30px;
}
</style>
