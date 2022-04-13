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
        <v-row>
          <v-radio-group v-model="newNecessity.category">
            <v-radio
              v-for="category of allCategories"
              :key="category.value"
              :value="category.value"
              :label="category.name"
            >
            </v-radio>
          </v-radio-group>
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
  deleteNecessity,
  getNecessity,
  updateNecessity,
} from "../services/necessityService";
import TextArea from "../../shared/components/TextArea.vue";
import CategoryUtils from "../../shared/enums/Category";
import SubcategoriesUtils from "../../shared/enums/Subcategory";
import InputValidations from "../../shared/utils/InputValidations";
import ConfirmationModal from "../../shared/components/ConfirmationModal.vue";
import { areEqual } from "../../shared/utils/ObjectComparator";
import YoutubeVideoParser from "../../shared/utils/YoutubeVideoParser";

export default Vue.extend({
  components: {
    Input,
    Button,
    Select,
    TextArea,
    ConfirmationModal,
  },
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
      return CategoryUtils.allPluralObjects();
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
          this.$root.showSnackbar("Necessidade Excluída.");
          this.$router.push("/home");
        })
        .catch(() => {
          this.$root.showSnackbar("Erro Inesperado.");
          this.isModalLoading = false;
        });
    },
    onSaveButtonClick() {
      this.isSaveButtonLoading = true;
      updateNecessity(this.newNecessity)
        .then(() => {
          this.isSaveButtonLoading = false;
          this.$root.showSnackbar("Alterações salvas!.");
          this.$router.go(-1);
        })
        .catch(() => {
          this.$root.showSnackbar("Erro Inesperado.");
          this.isSaveButtonLoading = false;
        });
    },
  },
});
</script>
