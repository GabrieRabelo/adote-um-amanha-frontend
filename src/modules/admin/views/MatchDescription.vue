<template>
  <v-container class="align-start" fill-height v-if="match">
    <v-container class="align-start px-7">
      <v-row class="mt-3 mb-4">
        <div class="a-text__bold-title">{{ match.title }}</div>
      </v-row>
      <v-row
        class="justify-space-between mb-3"
        v-for="attribute in attributes"
        :key="attribute.key"
      >
        <div class="a-text">{{ attribute.key }}</div>
        <div class="a-text light">{{ attribute.value }}</div>
      </v-row>
      <v-row class="justify-space-between mb-3">
        <div class="a-text">Status</div>
        <div>
          <v-icon :color="statusIconColor">{{ statusIcon }}</v-icon>
          <span class="a-text light ml-2">{{ statusText }}</span>
        </div>
      </v-row>
      <v-row class="mt-10">
        <div class="a-text">Descrição</div>
      </v-row>
      <v-row>
        <div class="a-text light mt-1">{{ match.description }}</div>
      </v-row>
    </v-container>

    <div>
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
    </div>

    <v-container class="align-end" v-if="canManage">
      <v-row class="justify-center">
        <Button
          class="mr-4"
          title="Recusar"
          color="error"
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
    <RefuseNecessityModal
      v-model="isModalOpen"
      :title="confirmationTitle"
      :message="confirmationMessage"
      @cancel="isModalOpen = false"
      @confirm="onConfirmButtonClick($event)"
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
import StatusUtils from "../../shared/enums/Status";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import UserCard from "../../shared/components/UserCard.vue";
import {
  getMatch,
  refuseMatch,
  approveMatch,
} from "../services/MatchesService";
import RefuseNecessityModal from "@/modules/shared/components/RefuseNecessityModal.vue";

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
    motivoRecusa: ""
  }),
  async mounted() {
    this.$root.startLoader();
    this.$root.showToolbar("MATCH");
    const id = this.$route.params.id;
    this.match = await getMatch(id).catch(({ response }) => {
      if (response.status === 404) {
        this.onNotFound();
      }
    });
    this.$root.stopLoader();
  },
  components: {
    Button,
    UserCard,
    RefuseNecessityModal,
  },
  computed: {
    attributes() {
      return [
        {
          key: "Data cadastro",
          value: moment(this.createdDate).format("DD/MM/yyyy"),
        },
        {
          key: "Categoria",
          value: Category.toSingularString(this.match.category),
        },
        {
          key: "Subcategoria",
          value: Subcategory.toString(this.match.subcategory),
        },
      ];
    },
    statusText() {
      switch (this.match.status) {
        case Status.pending:
          return "Pendente";
        case Status.resolved:
          return "Atendido";
        case Status.match:
          return "Correspondido";
        case Status.refused:
          return "Recusado";
        default:
          return "";
      }
    },
    statusIcon() {
      return StatusUtils.getIcon(this.match.status);
    },
    statusIconColor() {
      return StatusUtils.getIconColor(this.match.status);
    },
    canManage() {
      return this.match && this.match.status === Status.match
    }
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
      approveMatch(this.match.id)
        .then(() => {
          this.$router.push("/admin/matches");
          this.$root.showSnackbar({
            title: "MATCH APROVADO!",
            color: "success",
          });
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
    onConfirmButtonClick(refusalReason) {
      this.isModelLoading = true;
      refuseMatch(this.match.id, refusalReason)
        .then(() => {
          this.isModalOpen = false;
          this.isModalLoading = false;
          this.$router.push("/admin/matches");
          this.$root.showSnackbar({
            title: "MATCH RECUSADO!",
            color: "success",
          });
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
