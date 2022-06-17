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
      <v-row class="justify-space-between mb-3">
        <div class="a-text">Status</div>
        <div>
          <v-icon :color="statusIconColor">{{ statusIcon }}</v-icon>
          <span class="a-text light ml-2">{{ statusText }}</span>
        </div>
      </v-row>
      <v-row>
        <div class="a-text">Descrição</div>
      </v-row>
      <v-row>
        <div class="a-text light">{{ necessity.description }}</div>
      </v-row>
    </v-container>

    <v-container>
      <MotiveCard></MotiveCard>
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
          title="Doar"
          color="primary"
          prependIcon="mdi-hand-heart-outline"
          compact
          v-if="canDonate"
          @click="onDonateButtonClick"
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
import moment from "moment";
import MotiveCard from "../../shared/components/MotiveCard.vue";
import ConfirmationModal from "../../shared/components/ConfirmationModal.vue";
import DonationDoneModal from "../../shared/components/DonationDoneModal.vue";
import Button from "../../shared/components/Button.vue";
import EmbeddedVideo from "../../shared/components/EmbeddedVideo.vue";
import { Status } from "@/modules/shared/enums/Status";
import StatusUtils from "../../shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import { matchDonation } from "@/modules/donator/services/DonationService";
import { getNecessity } from "../../shared/services/NecessityService";
export default Vue.extend({
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    necessity: null,
    donatedTitle: "Sua doação foi enviada, muito obrigado!",
    donatedMessage:
      "Assim que sua doação for avaliada, entraremos em contato para mais informações.",
    confirmationTitle: "",
    confirmationMessage: "",
    isModalOpen: false,
    isModalLoading: false,
    isDonationDoneOpen: false,
    isDonationDoneLoading: false,
    isSaveButtonLoading: false,
  }),
  async mounted() {
    this.$root.showToolbar("NECESSIDADES");
    this.$root.startLoader();
    this.necessity = await getNecessity(this.$route.params.id)
      .catch(({ response }) => {
        if (response.status === 404) {
          this.onNotFound();
        }
      })
      .finally(() => {
        this.$root.stopLoader();
      });
  },
  components: {
    EmbeddedVideo,
    Button,
    ConfirmationModal,
    DonationDoneModal,
    MotiveCard,
  },
  computed: {
    statusText() {
      return StatusUtils.toString(this.necessity.status);
    },
    statusIcon() {
      return StatusUtils.getIcon(this.necessity.status);
    },
    statusIconColor() {
      return StatusUtils.getIconColor(this.necessity.status);
    },
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
        this.necessity.status === Status.pending &&
        getUserData().role == UserRole.institution
      );
    },
    canDonate() {
      return (
        this.necessity.status === Status.pending &&
        getUserData().role == UserRole.donator
      );
    },
  },
  methods: {
    onNotFound() {
      this.$router.push("/home");
    },
    onConfirmButtonClick() {
      this.isModalLoading = true;
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
    onConfirmMessage() {
      this.isDonationDoneOpen = false;
      this.$router.push("/donations");
    },
    onEditButtonClick() {
      this.$router.push(`/necessity/${this.necessity.id}/edit`);
    },
    onDonateButtonClick() {
      this.confirmationTitle = "CONFIRMAR DOAÇÃO";
      this.confirmationMessage = `Deseja confirmar a doação para <b>${this.necessity.user.name}</b>? <br/> <br/> <i>${this.necessity.description}</i>`;
      this.isModalOpen = true;
    },
  },
});
</script>

<style>
.a-text {
  color: #000000;
}
</style>
