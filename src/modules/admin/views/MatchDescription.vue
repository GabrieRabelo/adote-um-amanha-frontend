<template>
  <v-container class="align-start" fill-height v-if="match">
    <v-container class="align-start px-7">
      <v-row class="mt-3 mb-4">
        <div class="a-text__bold-title">{{ match.necessity.title }}</div>
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
        <div class="a-text light mt-1">{{ match.description }}</div>
      </v-row>
    </v-container>

    <UserCard
      :userRole="userRoleInstitution"
      :userName="match.necessity.user.name"
      :userId="match.necessity.user.id"
    />
    <UserCard
      :userRole="userRoleDonator"
      :userName="match.donation.user.name"
      :userId="match.donation.user.id"
    />

    <v-container class="align-end" v-if="match">
      <v-row class="justify-center">
        <Button
          class="mr-4"
          title="Recusar"
          color="primary"
          prependIcon="mdi-thumb-down-outline"
          outlined
          compact
          @click="onRefuseButtonClick"
        />
        <Button
          title="Aprovar"
          color="primary"
          prependIcon="mdi-thumb-up"
          compact
          @click="onApproveButtonClick"
        />
      </v-row>
    </v-container>
    <ConfirmationModal
      v-model="isModalOpen"
      :title="confirmationTitle"
      :message="confirmationMessage"
      @cancel="isModalOpen = false"
      @confirm="onConfirmButtonClick()"
      :loading="isModalLoading"
      :isCancelButtonOn="true"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Category from "../../shared/enums/Category";
import Subcategory from "../../shared/enums/Subcategory";
import moment from "moment";
import Button from "../../shared/components/Button.vue";
import { Status } from "@/modules/shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import UserCard from "../../shared/components/UserCard.vue";
import ConfirmationModal from "../../shared/components/ConfirmationModal.vue";
import {
  getMatchMock,
  refuseMatch,
  approveMatch,
} from "../services/MatchesService";

export default Vue.extend({
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    match: null,
    userRoleInstitution: UserRole.institution,
    userRoleDonator: UserRole.donator,
    isModalOpen: false,
    isModalLoading: false,
    isDonationDoneOpen: false,
    isDonationDoneLoading: false,
    confirmationTitle: "",
    confirmationMessage: "",
    donatedTitle: "A avaliação foi enviada, muito obrigado!",
  }),
  async mounted() {
    this.$root.showToolbar("MATCH");
    this.match = await getMatchMock(9999).catch(({ response }) => {
      if (response.status === 404) {
        this.onNotFound();
      }
    });
    console.log(this.match);
  },
  components: {
    Button,
    UserCard,
    ConfirmationModal,
  },
  computed: {
    attributes() {
      return [
        {
          key: "Data cadastro",
          value: moment(this.match.necessity.createdDate).format("DD/MM/yyyy"),
        },
        {
          key: "Categoria",
          value: Category.toSingularString(this.match.necessity.category),
        },
        {
          key: "Subcategoria",
          value: Subcategory.toString(this.match.necessity.subcategory),
        },
      ];
    },
    canDonate() {
      return (
        this.match.status === Status.pending &&
        getUserData().role == UserRole.donator
      );
    },
  },
  methods: {
    onNotFound() {
      this.$router.push("/home");
    },
    onRefuseButtonClick() {
      this.confirmationTitle = "RECUSAR MATCH";
      this.confirmationMessage =
        "Tem certeza de que deseja recusar este match?";
      this.isModalOpen = true;
    },
    onApproveButtonClick() {
      this.isModelLoading = true;
      approveMatch(this.match)
        .then(() => {
          this.$router.push("/admin/matches");
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "ERRO INESPERADO!",
            body: "Ocorreu um erro inesperado ao tentar aprovar o match... Tente novamente!",
            color: "error",
          });
          this.isModalLoading = false;
        });
    },
    onConfirmButtonClick() {
      this.isModelLoading = true;
      refuseMatch(this.match)
        .then(() => {
          this.isModalOpen = false;
          this.isModalLoading = false;
          this.$router.push("/admin/matches");
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "ERRO INESPERADO!",
            body: "Ocorreu um erro inesperado ao tentar recusar o match... Tente novamente!",
            color: "error",
          });
          this.isModalLoading = false;
        });
    },
  },
});
</script>

<style>
.a-text {
  color: #000000;
}
</style>
