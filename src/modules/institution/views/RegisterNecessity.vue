<template>
  <v-container class="align-start" fill-height>
    <v-tabs v-model="tab" hide-slider>
      <v-tabs-items v-model="tab">
        <v-tab-item key="1">
          <div class="a-text__subtitle">
            Sua solicitação refere-se a um bem ou a um serviço?
          </div>
          <v-container class="card-group mt-8">
            <SelectCardGroup
              :options="step1Options"
              :value="necessity.category"
              @cardSelected="onCategorySelected"
            />
          </v-container>
        </v-tab-item>
        <v-tab-item key="2">
          <div class="a-text__subtitle">No que você precisa de ajuda?</div>
          <v-container class="card-group mt-2">
            <SelectCardGroup
              :options="step2Options"
              :value="necessity.subcategory"
              @cardSelected="onSubcategorySelected"
            />
          </v-container>
        </v-tab-item>
        <v-tab-item key="3">
          <div class="a-text__subtitle">
            Para finalizar, conte um pouco mais sobre a sua solicitação.
          </div>
          <v-form v-model="validForm" class="mx-4 mt-4">
            <Input
              label="Assunto"
              v-model="necessity.title"
              required
              :rules="[inputValidations.required]"
            />
            <TextArea
              label="Descrição"
              v-model="necessity.description"
              required
              :rules="[inputValidations.required]"
            />
            <Input
              label="URL"
              prepend-inner-icon="mdi-link"
              placeholder="youtube.com/watch"
              v-model="necessityVideoURL"
            />
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <v-col class="justify-center align-self-end">
      <v-row class="justify-center mb-5">
        <Stepper :number="tab + 1" class="align-center"></Stepper>
      </v-row>
      <v-row class="justify-center mb-4 align-self-end">
        <Button
          class="mr-2 a-button"
          title="Voltar"
          color="primary"
          prependIcon="mdi-arrow-left"
          outlined
          @click="onBackButtonClick"
        />
        <Button
          :loading="isLoading"
          :disabled="!isButtonValid"
          class="a-button"
          :title="buttonTitle"
          color="primary"
          :appendIcon="buttonIcon"
          @click="onNextButtonClick"
        />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "../../shared/components/Button.vue";
import Stepper from "../../shared/components/Stepper.vue";
import SelectCardGroup from "../../shared/components/SelectCards/SelectCardGroup.vue";
import CategoryUtils from "../../shared/enums/Category";
import { Category } from "../../shared/enums/Category";
import SubcategoryUtils from "../../shared/enums/Subcategory";
import Input from "../../shared/components/Input.vue";
import TextArea from "../../shared/components/TextArea.vue";
import InputValidations from "../../shared/utils/InputValidations";
import { Subcategory } from "../../shared/enums/Subcategory";
import { createNecessity } from "../services/necessityService";
import YoutubeVideoParser from "@/modules/shared/utils/YoutubeVideoParser";
export default Vue.extend({
  components: { Button, Stepper, SelectCardGroup, Input, TextArea },
  data: () => ({
    isLoading: false,
    tab: 0,
    validForm: false,
    step1Options: [
      CategoryUtils.toSingularObject(Category.asset),
      CategoryUtils.toSingularObject(Category.service),
    ],
    step2Options: SubcategoryUtils.allObjects(),
    necessity: {
      category: Category.asset,
      subcategory: Subcategory.health,
      url: "",
    },
  }),
  methods: {
    onNextButtonClick() {
      if (this.tab < 2) {
        this.tab++;
      } else {
        this.isLoading = true;
        createNecessity(this.necessity)
          .then(() => {
            this.$root.showSnackbar("Necessidade criada");
            this.$router.push("/home");
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            this.$root.showSnackbar("Erro inesperado");
          });
      }
    },
    onBackButtonClick() {
      if (this.tab > 0) this.tab--;
      else this.$router.push("/home");
    },
    onCategorySelected(category) {
      this.necessity.category = category;
    },
    onSubcategorySelected(subcategory) {
      this.necessity.subcategory = subcategory;
    },
  },
  mounted() {
    this.$root.showToolbar("CADASTRAR NECESSIDADE");
  },
  computed: {
    buttonTitle() {
      if (this.tab == 2) return "Confirmar";
      return "Continuar";
    },
    buttonIcon() {
      if (this.tab == 2) return "mdi-check";
      else return "mdi-arrow-right";
    },
    inputValidations() {
      return InputValidations;
    },
    isButtonValid() {
      if (this.tab < 2) {
        return true;
      }
      return this.validForm;
    },
    necessityVideoURL: {
      get() {
        return YoutubeVideoParser.toEmbeddedVideo(this.necessity.url || "");
      },
      set(val) {
        this.necessity.url = YoutubeVideoParser.toEmbeddedVideo(val);
      },
    },
  },
});
</script>

<style scoped>
.a-text {
  color: #0000;
}
.a-button {
  max-width: 160px;
}
.align-center {
  align-items: center;
}
.card-group {
  width: 85%;
}
div[role="tablist"] {
  display: none !important;
}
</style>
