<template>
  <v-container class="align-start" fill-height v-if="admin">
    <v-container class="align-start px-7">
      <v-row class="mt-3 mb-4">
        <div class="a-text__bold-title">{{ admin.title }}</div>
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
        <div class="a-text light mt-1">{{ admin.description }}</div>
      </v-row>
    </v-container>

    <UserCard
      :userRole="userRole"
      :userName="donator.user.name"
      :userId="donator.user.id"
    />
    <UserCard
      :userRole="userRole"
      :userName="admin.user.name"
      :userId="admin.user.id"
    />

    <v-container class="align-end" v-if="admin">
      <v-row class="justify-center">
        <Button
          class="mr-4"
          title="Recusar"
          color="primary"
          prependIcon="mdi-thumb-down-outline"
          outlined
          compact
          @click="$router.go(-1)"
        />
        <Button
          title="Aprovar"
          color="primary"
          prependIcon="mdi-thumb-up"
          compact
          @click="onDonateButtonClick"
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
    <DonationDoneModal
      v-model="isDonationDoneOpen"
      :title="donatedTitle"
      :message="donatedMessage"
      @confirm="onConfirmMessage()"
      :loading="isDonationDoneLoading"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Category from "../shared/enums/Category";
import Subcategory from "../shared/enums/Subcategory";
import { getNecessity } from "../shared/services/NecessityService";
import moment from "moment";
import Button from "../shared/components/Button.vue";
import { Status } from "@/modules/shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import UserCard from "../shared/components/UserCard.vue";
import { matchDonation } from "../donator/services/DonatorService";
import ConfirmationModal from "../shared/components/ConfirmationModal.vue";
import DonationDoneModal from "../shared/components/DonationDoneModal.vue";

export default Vue.extend({
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    admin: null,
    userRole: UserRole.institution,
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
    this.admin = await getNecessity(this.$route.params.id).catch(
      ({ response }) => {
        if (response.status === 404) {
          this.onNotFound();
        }
      }
    );
  },
  components: {
    Button,
    UserCard,
    ConfirmationModal,
    DonationDoneModal,
  },
  computed: {
    attributes() {
      return [
        {
          key: "Data cadastro",
          value: moment(this.admin.createdDate).format("DD/MM/yyyy"),
        },
        {
          key: "Categoria",
          value: Category.toSingularString(this.admin.category),
        },
        {
          key: "Subcategoria",
          value: Subcategory.toString(this.admin.subcategory),
        },
      ];
    },
    canDonate() {
      return (
        this.admin.status === Status.pending &&
        getUserData().role == UserRole.donator
      );
    },
  },
  methods: {
    onNotFound() {
      this.$router.push("/home");
    },
    onDonateButtonClick() {
      this.confirmationTitle = "CONFIRMAR DOAÇÃO";
      this.confirmationMessage = `Deseja confirmar a doação para <b>${this.admin.user.name}</b>? <br/> <br/> <i>${this.admin.description}</i>`;
      this.isModalOpen = true;
    },
    onConfirmMessage() {
      this.isDonationDoneOpen = false;
      this.$router.push("/donations");
    },
    onConfirmButtonClick() {
      this.isModelLoading = true;
      matchDonation(this.admin)
        .then(() => {
          this.isModalOpen = false;
          this.isModalLoading = false;
          this.isDonationDoneOpen = true;
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "ERRO INESPERADO!",
            body: "Ocorreu um erro inesperado ao tentar realizar sua doação... Tente novamente!",
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
