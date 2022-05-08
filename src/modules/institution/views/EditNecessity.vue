<template>
  <v-container
    class="px-8 px-sm-4 d-flex align-start"
    v-if="newNecessity"
    fill-height
  >
    <v-container class="px-0">
      <v-form v-model="isFormValid">
        <v-row class="mt-8">
          <Input
            label="Assunto"
            v-model="newNecessity.title"
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
            v-model="newNecessity.description"
            maxlength="255"
          ></TextArea>
        </v-row>
        <v-row>
          <Input
            prepend-inner-icon="mdi-link"
            label="URL"
            placeholder="youtube.com/watch"
            v-model="necessityVideoURL"
          />
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
      :isButtonOn="true"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Input from "../../shared/components/Input.vue";
import Button from "../../shared/components/Button.vue";
import Select from "../../shared/components/Select.vue";
import {
  deleteNecessity,
  getNecessity,
  updateNecessity,
} from "../../shared/services/necessityService";
import TextArea from "../../shared/components/TextArea.vue";
import CategoryUtils from "../../shared/enums/Category";
import SubcategoriesUtils from "../../shared/enums/Subcategory";
import InputValidations from "../../shared/utils/InputValidations";
import ConfirmationModal from "../../shared/components/ConfirmationModal.vue";
import { areEqual } from "../../shared/utils/ObjectComparator";
import YoutubeVideoParser from "../../shared/utils/YoutubeVideoParser";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";

export default Vue.extend({
  components: {
    Input,
    Button,
    Select,
    TextArea,
    ConfirmationModal,
  },
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    necessity: {},
    newNecessity: null,
    isFormValid: true,
    confirmationTitle: "",
    confirmationMessage: "",
    isModalOpen: false,
    isModalLoading: false,
    isSaveButtonLoading: false,
  }),
  async mounted() {
    this.$root.showToolbar("EDITAR");
    this.necessity = await getNecessity(this.$route.params.id);
    this.newNecessity = { ...this.necessity };
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
        return SubcategoriesUtils.toObject(this.newNecessity.subcategory);
      },
      set(value) {
        this.newNecessity.subcategory = value;
      },
    },
    currentCategoryObject: {
      get() {
        return CategoryUtils.toSingularObject(this.newNecessity.category);
      },
      set(value) {
        this.newNecessity.category = value;
      },
    },
    isSaveButtonDisabled() {
      return this.necessityHasChanged && this.isFormValid;
    },
    necessityHasChanged() {
      return !areEqual(this.necessity, this.newNecessity);
    },
    inputValidations() {
      return InputValidations;
    },
    necessityVideoURL: {
      get() {
        return YoutubeVideoParser.toEmbeddedVideo(this.newNecessity.url);
      },
      set(val) {
        this.newNecessity.url = YoutubeVideoParser.toEmbeddedVideo(val);
      },
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
      deleteNecessity(this.necessity.id)
        .then(() => {
          this.isModalOpen = false;
          this.isModalLoading = false;
          this.$root.showSnackbar({title:"NECESSIDADE EXCLUÍDA!", body:"Sua necessidade foi excluída da lista de necessidades.", color:"success"});
          this.$router.push("/home");
        })
        .catch(() => {
          this.$root.showSnackbar({title:"ERRO INESPERADO!", body:"Ocorreu um erro inesperado ao tentar realizar sua solicitação... Tente novamente!", color:"error"});
          this.isModalLoading = false;
        });
    },
    onSaveButtonClick() {
      this.isSaveButtonLoading = true;
      updateNecessity(this.newNecessity)
        .then(() => {
          this.isSaveButtonLoading = false;
          this.$root.showSnackbar({title:"ALTERAÇÕES SALVAS!", body:"Alterações salvas com sucesso.", color:"success"});
          this.$router.go(-1);
        })
        .catch(() => {
          this.$root.showSnackbar({title:"ERRO INESPERADO", body:"Ocorreu um erro inesperado ao tentar realizar sua solicitação... Tente novamente!", color:"error"});
          this.isSaveButtonLoading = false;
        });
    },
  },
});
</script>
