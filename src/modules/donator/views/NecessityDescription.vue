<template>
  <v-container class="align-start" fill-height v-if="necessity">
    <v-container class="align-start px-7">
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
        <div class="a-text light mt-1">{{ necessity.description }}</div>
      </v-row>
    </v-container>

    <UserCard :userRole="userRole" :userName="necessity.user.name" />

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
          title="Doar"
          color="primary"
          prependIcon="mdi-hand-heart-outline"
          compact
          v-if="canDonate"
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
import Category from "../../shared/enums/Category";
import Subcategory from "../../shared/enums/Subcategory";
import { getNecessity } from "../../shared/services/NecessityService";
import moment from "moment";
import Button from "../../shared/components/Button.vue";
import EmbeddedVideo from "../../shared/components/EmbeddedVideo.vue";
import { Status } from "@/modules/shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import UserCard from "../../shared/components/UserCard.vue";
import { matchDonation } from "../services/DonationService";
import ConfirmationModal from "../../shared/components/ConfirmationModal.vue";
import DonationDoneModal from "../../shared/components/DonationDoneModal.vue";

export default Vue.extend({
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    necessity: null,
    userRole: UserRole.institution,
    isModalOpen: false,
    isModalLoading: false,
    isDonationDoneOpen: false,
    isDonationDoneLoading: false,
    confirmationTitle: "",
    confirmationMessage: "",
    donatedTitle: "Sua doação foi enviada, muito obrigado!",
    donatedMessage:
      "Assim que sua doação for avaliada, entraremos em contato para mais informações.",
  }),
  async mounted() {
    this.$root.showToolbar("SOLICITAÇÃO");
    this.necessity = await getNecessity(this.$route.params.id);
  },
  components: {
    EmbeddedVideo,
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
    canDonate() {
      return (
        this.necessity.status === Status.pending &&
        getUserData().role == UserRole.donator
      );
    },
  },
  methods: {
    onDonateButtonClick() {
      this.confirmationTitle = "CONFIRMAR DOAÇÃO";
      this.confirmationMessage = `Deseja confirmar a doação para <b>${this.necessity.user.name}</b>? <br/> <br/> <i>${this.necessity.description}</i>`;
      this.isModalOpen = true;
    },
    onConfirmMessage() {
      this.isDonationDoneOpen = false;
      this.$router.push("/donations");
    },
    onConfirmButtonClick() {
      this.isModelLoading = true;
      matchDonation(this.necessity)
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
