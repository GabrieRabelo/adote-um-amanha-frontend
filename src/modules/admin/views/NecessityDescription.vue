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
      <v-row class="mt-10">
        <div class="a-text">Descrição</div>
      </v-row>
      <v-row>
        <div class="a-text light mt-1">{{ necessity.description }}</div>
      </v-row>
    </v-container>

    <UserCard
      :userRole="institutionRole"
      :userName="necessity.user.name"
      :userId="necessity.user.id"
    />

    <v-container v-if="necessity">
      <v-row class="justify-center">
        <Button
          class="vinculate-button"
          title="Vincular Doador"
          color="primary"
          prependIcon="mdi-plus"
          outlined
          @click="onVinculateClick"
        />
      </v-row>
    </v-container>

    <v-container class="align-end" v-if="necessity">
      <v-row class="justify-center">
        <Button
          class="mr-4 refuse-button"
          title="Recusar"
          color="primary"
          prependIcon="mdi-thumb-down"
          outlined
          compact
          v-if="canRefuse"
          @click="onRefuseButtonClick"
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
import {
  getNecessity,
  refuseNecessity,
} from "../../shared/services/NecessityService";
import moment from "moment";
import Button from "../../shared/components/Button.vue";
import { Status } from "@/modules/shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import UserCard from "../../shared/components/UserCard.vue";
import RefuseNecessityModal from "../../shared/components/RefuseNecessityModal.vue";
import { RequestType } from "@/modules/shared/models/RequestEntity";

export default Vue.extend({
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    necessity: null,
    userRole: UserRole.admin,
    isModalOpen: false,
    isModalLoading: false,
    confirmationTitle: "",
    confirmationMessage: "",
    loaded: false,
  }),
  async mounted() {
    this.$root.showToolbar("NECESSIDADE");
    this.$root.startLoader();
    this.necessity = await getNecessity(this.$route.params.id).catch(
      ({ response }) => {
        if (response.status === 404) {
          this.onNotFound();
        }
      }
    );
    this.$root.stopLoader();
    this.loaded = true;
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
    canRefuse() {
      return (
        this.necessity.status === Status.pending &&
        getUserData().role == UserRole.admin
      );
    },
    institutionRole() {
      return UserRole.institution;
    },
  },
  methods: {
    onVinculateClick() {
      const query = {
        orderType: RequestType.necessity,
        orderID: this.necessity.id,
      };
      this.$router.push({ path: "/admin/create-match", query });
    },
    onNotFound() {
      this.$router.push("/home");
    },
    onRefuseButtonClick() {
      this.confirmationTitle = "RECUSAR NECESSIDADE";
      this.confirmationMessage =
        "Tem certeza de que deseja recusar esta necessidade?";
      this.isModalOpen = true;
    },
    onConfirmButtonClick(refusalReason) {
      this.isModelLoading = true;
      refuseNecessity(this.necessity, refusalReason)
        .then(() => {
          this.isModalOpen = false;
          this.isModalLoading = false;
          this.isDonationDoneOpen = true;
          this.$root.showSnackbar({
            title: "NECESSIDADE REJEITADA!",
            body: "A necessidade foi excluída da lista de necessidades.",
            color: "success",
          });
          this.$router.push("/necessities");
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "ERRO INESPERADO!",
            body: "Ocorreu um erro inesperado ao tentar recusar a necessidade... Tente novamente!",
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

.vinculate-button {
  width: 313px;
  min-height: 75px;
  border: 2px dotted #ffd25a !important;
  border-radius: 7px;
}

.refuse-button {
  width: 135px;
}
</style>
