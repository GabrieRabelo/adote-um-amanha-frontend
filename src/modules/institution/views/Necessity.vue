<template>
  <v-container class="align-start" fill-height>
    <v-container class="align-start px-7" v-if="necessity">
      <v-row class="mt-3 mb-4">
        <div class="a-text__bold-title">{{ necessity.title }}</div>
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
        <div class="a-text">Descrição</div>
      </v-row>
      <v-row>
        <div class="a-text light">{{ necessity.description }}</div>
      </v-row>
    </v-container>

    <v-container v-if="necessity">
      <v-row class="justify-center">
        <EmbeddedVideo :src="necessity.url" />
      </v-row>
    </v-container>

    <v-container class="align-end" v-if="necessity">
      <v-row class="justify-center">
        <Button
          class="mr-4"
          title="Voltar"
          color="primary"
          prependIcon="mdi-arrow-left"
          outlined
          compact
          @click="$router.go(-1)"
        />
        <Button
          title="Editar"
          color="primary"
          prependIcon="mdi-pencil"
          compact
          v-if="canEdit"
          @click="onEditButtonClick"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import Category from "../../shared/enums/Category";
import Subcategory from "../../shared/enums/Subcategory";
import { getNecessity } from "../services/necessityService";
import moment from "moment";
import Button from "../../shared/components/Button.vue";
import EmbeddedVideo from "../../shared/components/EmbeddedVideo.vue";
import { Status } from "@/modules/shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
export default Vue.extend({
  data: () => ({
    necessity: null,
  }),
  async mounted() {
    this.$root.showToolbar("NECESSIDADES");
    this.necessity = await getNecessity(this.$route.params.id);
    this.$root.showToolbarButton();
  },
  components: {
    EmbeddedVideo,
    Button,
  },
  computed: {
    attributes() {
      return [
        {
          key: "Data cadastro",
          value: moment(this.necessity.createdDate).format("DD/MM/yyyy"),
        },
        {
          key: "Categoria",
          value: Category.toSingularString(this.necessity.category),
        },
        {
          key: "Subcategoria",
          value: Subcategory.toString(this.necessity.subcategory),
        },
      ];
    },
    canEdit() {
      return (
        this.necessity.status === Status.peding &&
        getUserData().role == UserRole.institution
      );
    },
  },
  methods: {
    onEditButtonClick() {
      this.$router.push(`/necessity/${this.necessity.id}/edit`);
    },
  },
});
</script>

<style>
.a-text {
  color: #000000;
}
</style>
