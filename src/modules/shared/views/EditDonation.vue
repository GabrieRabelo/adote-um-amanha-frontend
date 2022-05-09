<template>
  <v-container
    class="px-8 px-sm-4 d-flex align-start"
    v-if="newDonation"
    fill-height
  >
    <v-container class="px-0">
      <v-form v-model="isFormValid">
        <v-row class="mt-8">
          <Input
            label="Assunto"
            v-model="newDonation.title"
            :rules="[inputValidations.required]"
          />
        </v-row>
        <v-row>
          <Select
            :items="allCategories"
            label="Categoria"
            v-model="currentCategoryObject"
            item-text="name"
            item-value="value"
            :rules="[inputValidations.required]"
            :return-object="false"
          />
        </v-row>
        <v-row>
          <Select
            :items="allSubcategories"
            label="Subcategoria"
            v-model="currentSubcategoryObject"
            item-text="name"
            item-value="value"
            :rules="[inputValidations.required]"
            :return-object="false"
          />
        </v-row>
        <v-row>
          <TextArea
            name="input-descricao"
            label="Descrição"
            v-model="newDonation.description"
            maxlength="255"
          ></TextArea>
        </v-row>
      </v-form>
    </v-container>
    <v-container class="px-0">
      <v-row class="justify-center">
        <Button
          title="Excluir"
          class="mr-6"
          compact
          color="error"
          outlined
          @click="onDeleteClick"
          prependIcon="mdi-delete"
        />
        <Button
          title="Salvar"
          color="primary"
          :disabled="!isSaveButtonDisabled"
          prependIcon="mdi-content-save"
          compact
          @click="onSaveButtonClick"
          :loading="isSaveButtonLoading"
        />
      </v-row>
    </v-container>

    <ConfirmationModal
      v-model="isModalOpen"
      :title="confirmationTitle"
      :message="confirmationMessage"
      @cancel="isModalOpen = false"
      @confirm="onDeleteConfirmed"
      :loading="isModalLoading"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Input from "../../shared/components/Input.vue";
import Button from "../../shared/components/Button.vue";
import Select from "../../shared/components/Select.vue";
import {
  deleteDonation,
  getDonation,
  updateDonation,
} from "../../donator/services/DonationService";
import TextArea from "../../shared/components/TextArea.vue";
import CategoryUtils from "../../shared/enums/Category";
import SubcategoriesUtils from "../../shared/enums/Subcategory";
import InputValidations from "../../shared/utils/InputValidations";
import ConfirmationModal from "../../shared/components/ConfirmationModal.vue";
import { areEqual } from "../../shared/utils/ObjectComparator";
import ToolbarMenuMixin from "../mixins/ToolbarMenuMixin";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
import BottomSheetDefaultItems from "../utils/BottomSheetDefaultItems";

export default Vue.extend({
  mixins: [ToolbarMenuMixin, ToolbarNavigationMixin],
  components: {
    Input,
    Button,
    Select,
    TextArea,
    ConfirmationModal,
  },
  data() {
    return {
      donation: {},
      newDonation: null,
      isFormValid: true,
      confirmationTitle: "",
      confirmationMessage: "",
      isModalOpen: false,
      isModalLoading: false,
      isSaveButtonLoading: false,
      menuBottomSheetItems: [
        {
          title: "Excluir",
          icon: "mdi-delete",
          onClick: this.onDeleteClick.bind(this),
        },
        BottomSheetDefaultItems.logoutMenuItem,
      ],
    };
  },
  async mounted() {
    this.$root.showToolbar("EDITAR DOAÇÃO");
    this.$root.startLoader();
    this.donation = await getDonation(this.$route.params.id);
    this.$root.stopLoader();
    this.newDonation = { ...this.donation };
  },
  computed: {
    allSubcategories() {
      return SubcategoriesUtils.allObjects();
    },
    allCategories() {
      return CategoryUtils.allSingularObjects();
    },
    currentSubcategoryObject: {
      get() {
        return SubcategoriesUtils.toObject(this.newDonation.subcategory);
      },
      set(value) {
        this.newDonation.subcategory = value;
      },
    },
    currentCategoryObject: {
      get() {
        return CategoryUtils.toSingularObject(this.newDonation.category);
      },
      set(value) {
        this.newDonation.category = value;
      },
    },
    isSaveButtonDisabled() {
      return this.donationHasChanged && this.isFormValid;
    },
    donationHasChanged() {
      return !areEqual(this.donation, this.newDonation);
    },
    inputValidations() {
      return InputValidations;
    },
  },
  methods: {
    onDeleteClick() {
      this.confirmationTitle = "EXCLUIR NECESSIDADE";
      this.confirmationMessage =
        "Tem certeza que deseja excluir esta necessidade?";
      this.isModalOpen = true;
    },
    onDeleteConfirmed() {
      this.isModalLoading = true;
      deleteDonation(this.donation.id)
        .then(() => {
          this.isModalOpen = false;
          this.isModalLoading = false;
          this.$root.showSnackbar({
            title: "DOAÇÃO EXCLUÍDA!",
            body: "Sua necessidade foi excluída da lista de necessidades.",
            color: "success",
          });
          this.$router.push("/home");
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "ERRO INESPERADO!",
            body: "Ocorreu um erro inesperado ao tentar realizar sua solicitação... Tente novamente!",
            color: "error",
          });
          this.isModalLoading = false;
        });
    },
    onSaveButtonClick() {
      this.isSaveButtonLoading = true;
      updateDonation(this.newDonation)
        .then(() => {
          this.isSaveButtonLoading = false;
          this.$root.showSnackbar({
            title: "ALTERAÇÕES SALVAS!",
            body: "Alterações salvas com sucesso.",
            color: "success",
          });
          this.$router.go(-1);
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "ERRO INESPERADO",
            body: "Ocorreu um erro inesperado ao tentar realizar sua solicitação... Tente novamente!",
            color: "error",
          });
          this.isSaveButtonLoading = false;
        });
    },
  },
});
</script>
