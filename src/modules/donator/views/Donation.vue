<template>
  <v-container class="main-container d-flex-column">
    <v-container class="align-start px-7" v-if="donation">
      <v-row class="mt-3 mb-4">
        <div class="a-text__bold-title">{{ donation.title }}</div>
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
        <div class="a-text light">{{ donation.description }}</div>
      </v-row>

      <v-row class="py-4">
        <UserCard
          :userRole="donatorRole"
          :userName="donation.user.name"
          :userId="donation.user.id"
        />
      </v-row>
      <v-row class="justify-center mt-5">
        <VinculateButton
          @click="onVinculateClick"
          v-if="canManage"
          title="Vincular Instituição"
        />
      </v-row>
    </v-container>

    <v-container class="align-self-end" v-if="donation">
      <v-row class="justify-center mb-2">
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
          class="mr-2"
          title="Recusar"
          color="error"
          prependIcon="mdi-thumb-down-outline"
          outlined
          compact
          v-if="canManage"
          @click="onRefuseButtonClick"
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

    <RefuseNecessityModal
      title="Recusar Doação"
      message="Tem certeza que deseja recusar esta doação?"
      v-model="isRefuseModalOpen"
      hideReasonInput
      isCancelButtonOn
      @cancel="isRefuseModalOpen = false"
      @confirm="onRefusalConfirm"
      :loading="isModalLoading"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Category from "../../shared/enums/Category";
import Subcategory from "../../shared/enums/Subcategory";
import {
  getDonation,
  refuseDonation,
} from "../../donator/services/DonationService";
import moment from "moment";
import Button from "../../shared/components/Button.vue";
import { Status } from "@/modules/shared/enums/Status";
import StatusUtils from "../../shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import ToolbarMenuMixin from "@/modules/shared/mixins/ToolbarMenuMixin";
import UserCard from "../../shared/components/UserCard.vue";
import VinculateButton from "@/modules/shared/components/VinculateButton.vue";
import { RequestType } from "@/modules/shared/models/RequestEntity";
import RefuseNecessityModal from "../../shared/components/RefuseNecessityModal.vue";

export default Vue.extend({
  mixins: [ToolbarNavigationMixin, ToolbarMenuMixin],
  components: { UserCard, Button, VinculateButton, RefuseNecessityModal },
  data: () => ({
    donation: null,
    isRefuseModalOpen: false,
    isModalLoading: false,
  }),
  async mounted() {
    this.$root.showToolbar("DOAÇÃO");
    this.$root.startLoader();
    this.donation = await getDonation(this.$route.params.id)
      .catch(({ response }) => {
        if (response.status === 404) {
          this.onNotFound();
        }
      })
      .finally(() => {
        this.$root.stopLoader();
      });
  },
  computed: {
    isDonationPending() {
      return this.donation.status === Status.pending;
    },
    attributes() {
      return [
        {
          key: "Data cadastro",
          value: moment(this.donation.createdDate).format("DD/MM/yyyy"),
        },
        {
          key: "Categoria",
          value: Category.toSingularString(this.donation.category),
        },
        {
          key: "Subcategoria",
          value: Subcategory.toString(this.donation.subcategory),
        },
      ];
    },
    statusText() {
      return StatusUtils.toString(this.donation.status);
    },
    statusIcon() {
      return StatusUtils.getIcon(this.donation.status);
    },
    statusIconColor() {
      return StatusUtils.getIconColor(this.donation.status);
    },
    canEdit() {
      return (
        this.donation.status === Status.pending &&
        getUserData().role == UserRole.donator
      );
    },
    donatorRole() {
      return UserRole.donator;
    },
    canManage() {
      return (
        this.donation &&
        this.donation.status == Status.pending &&
        getUserData().role == UserRole.admin
      );
    },
  },
  methods: {
    onRefusalConfirm() {
      this.isModalLoading = true;
      refuseDonation(this.donation.id)
        .then(() => {
          this.$root.showSnackbar({
            title: "Doação Recusada",
            body: "Doação recusada com sucesso.",
          });
          this.$router.push("/admin/donations");
        })
        .catch(() => {
          this.$root.showSnackbar({ title: "Erro Inesperado." });
        })
        .finally(() => {
          this.isModalLoading = false;
        });
    },
    onRefuseButtonClick() {
      this.isRefuseModalOpen = true;
    },
    onNotFound() {
      this.$router.push("/home");
    },
    onEditButtonClick() {
      this.$router.push(`/donations/${this.donation.id}/edit/`);
    },
    onVinculateClick() {
      const query = {
        orderType: RequestType.donation,
        orderID: this.donation.id,
      };
      this.$router.push({ path: "/admin/create-match", query });
    },
  },
});
</script>

<style scoped>
.align-button {
  justify-content: end;
}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
