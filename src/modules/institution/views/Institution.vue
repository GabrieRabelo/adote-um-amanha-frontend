<template>
  <v-container class="align-start" fill-height>
    <v-container class="align-start px-7" v-if="institution">
      <v-row class="mt-3 mb-4">
        <div class="header">
          <img width="65px" src="../../../assets/img/institution-logo.png" />
          <div class="a-text__bold-title py-0">{{ institution.name }}</div>
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
          Site
          <v-btn icon v-bind:href="getUrlSite" target="_blank">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <div class="">{{ institution.site }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-0 py-0">
          Endereço
          <v-btn icon v-bind:href="getUrlAddress" target="_blank">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <div class="">{{ institution.address }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="align-self-end mb-8">
      <v-row class="justify-center">
        <Button
          class="mr-4"
          title="Voltar"
          color="primary"
          prependIcon="mdi-arrow-left"
          outlined
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import { getinstitution } from "../services/InstitutionService";
import Button from "../../shared/components/Button.vue";

export default Vue.extend({
  data: () => ({
    institution: null,
  }),
  async mounted() {
    this.$root.showToolbar("Perfil da instituição");
    this.institution = await getinstitution(this.$route.params.id);
  },
  components: {
    Button,
  },
  computed: {
    attributes() {
      return [
        {
          key: "Telefone",
          value: this.institution.phone,
        },
        {
          key: "Email",
          value: this.institution.email,
        },
      ];
    },
    getUrlSite() {
      return "https://" + this.institution.site;
    },
    getUrlAddress() {
      return "https://www.google.com/maps/search/" + this.institution.address;
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
