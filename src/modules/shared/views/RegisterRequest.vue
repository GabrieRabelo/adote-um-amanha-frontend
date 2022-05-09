<template>
  <v-container class="align-start" fill-height>
    <v-tabs v-model="tab" hide-slider>
      <v-tabs-items v-model="tab">
        <v-tab-item key="1">
          <div class="a-text__subtitle">
            Sua {{ tab1 }} refere-se a um bem ou a um serviço?
          </div>
          <v-container class="card-group mt-8">
            <SelectCardGroup
              :options="step1Options"
              :value="request.category"
              @cardSelected="onCategorySelected"
            />
          </v-container>
        </v-tab-item>
        <v-tab-item key="2">
          <div class="a-text__subtitle">No que você {{ tab2 }}?</div>
          <v-container class="card-group mt-2">
            <SelectCardGroup
              :options="step2Options"
              :value="request.subcategory"
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
              v-model="request.title"
              required
              :rules="[inputValidations.required]"
            />
            <TextArea
              label="Descrição"
              v-model="request.description"
              required
              :rules="[inputValidations.required]"
              maxlength="255"
            />
            <Input
              v-if="isURLVisible"
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
          compact
        />
        <Button
          :loading="isLoading"
          :disabled="!isButtonValid"
          class="a-button"
          :title="buttonTitle"
          color="primary"
          :appendIcon="buttonIcon"
          @click="onNextButtonClick"
          compact
        />
      </v-row>
    </v-col>
    <ConfirmationModal
      v-model="isModalOpen"
      :title="confirmationTitle"
      :message="confirmationMessage"
      @confirm="onCreationConfirmed"
      :loading="isModalLoading"
      :isButtonOn="false"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "../components/Button.vue";
import Stepper from "../components/Stepper.vue";
import SelectCardGroup from "../components/SelectCards/SelectCardGroup.vue";
import CategoryUtils from "../enums/Category";
import { Category } from "../enums/Category";
import SubcategoryUtils from "../enums/Subcategory";
import Input from "../components/Input.vue";
import TextArea from "../components/TextArea.vue";
import InputValidations from "../utils/InputValidations";
import { Subcategory } from "../enums/Subcategory";
import { createNecessity } from "../services/necessityService";
import YoutubeVideoParser from "@/modules/shared/utils/YoutubeVideoParser";
import { UserRole } from "@/modules/shared/enums/UserRole";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import { createDonation } from "../../donationService";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
export default Vue.extend({
  components: {
    Button,
    Stepper,
    SelectCardGroup,
    Input,
    TextArea,
    ConfirmationModal,
  },
  mixins: [ToolbarNavigationMixin],
  data: () => ({
    isLoading: false,
    tab: 0,
    validForm: false,
    step1Options: [
      CategoryUtils.toSingularObject(Category.asset),
      CategoryUtils.toSingularObject(Category.service),
    ],
    step2Options: SubcategoryUtils.allObjects(),
    request: {
      category: Category.asset,
      subcategory: Subcategory.health,
      url: "",
    },
    confirmationTitle: "",
    confirmationMessage: "",
    isModalOpen: false,
    isModalLoading: false,
  }),
  mounted() {
    this.$root.showToolbar(`Cadastrar ${this.toolbarRole}`);
  },
  methods: {
    onNextButtonClick() {
      if (this.tab < 2) {
        this.tab++;
      } else {
        const currentUser = getUserData();
        this.isLoading = true;
        if (currentUser.role === UserRole.institution) {
          createNecessity(this.request)
            .then(() => {
              this.$root.showSnackbar({
                title: "NECESSIDADE CRIADA!",
                body: "Sua necessidade foi criada e adicionada na lista de necessidades!",
                color: "success",
              });
              this.$router.push("/home");
              this.isLoading = false;
            })
            .catch(() => {
              this.isLoading = false;
              this.$root.showSnackbar({
                title: "ERRO INESPERADO",
                body: "Ocorreu um erro inesperado ao tentar realizar sua solicitação... Tente novamente!",
                color: "error",
              });
            });
        } else {
          createDonation(this.request)
            .then(() => {
              this.confirmationTitle = "Sua doação foi enviada, obrigado!";
              this.confirmationMessage =
                "Assim que sua doação for avaliada, entraremos em contato para mais informações.";
              this.isModalOpen = true;
              this.isLoading = false;
            })
            .catch(() => {
              this.isLoading = false;
              this.$root.showSnackbar({
                title: "ERRO INESPERADO",
                body: "Ocorreu um erro inesperado ao tentar realizar sua solicitação... Tente novamente!",
                color: "error",
              });
            });
        }
      }
    },
    onBackButtonClick() {
      if (this.tab > 0) this.tab--;
      else this.$router.push("/home");
    },
    onCategorySelected(category) {
      this.request.category = category;
    },
    onSubcategorySelected(subcategory) {
      this.request.subcategory = subcategory;
    },
    onConfirmClick() {
      this.confirmationTitle = "Sua doação foi enviada, obrigado!";
      this.confirmationMessage =
        "Assim que sua doação for avaliada, entraremos em contato para mais informações.";
      this.isModalOpen = true;
    },
    onCreationConfirmed() {
      this.isModalOpen = false;
      this.isModalLoading = false;
      this.$root.showSnackbar({
        title: "DOAÇÃO CRIADA!",
        body: "Sua doação foi criada e adicionada na lista de doações!",
        color: "success",
      });
      this.$router.push("/donations");
    },
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
        return YoutubeVideoParser.toEmbeddedVideo(this.request.url || "");
      },
      set(val) {
        this.request.url = YoutubeVideoParser.toEmbeddedVideo(val);
      },
    },
    tab1() {
      const user = {
        [UserRole.institution]: "necessidade",
        [UserRole.donator]: "doação",
      };
      const currentUser = getUserData();
      const role = currentUser.role;
      return user[role];
    },
    tab2() {
      const user = {
        [UserRole.institution]: "precisa de ajuda",
        [UserRole.donator]: "gostaria de ajudar",
      };
      const currentUser = getUserData();
      const role = currentUser.role;
      return user[role];
    },
    toolbarRole() {
      const user = {
        [UserRole.institution]: "Necessidade",
        [UserRole.donator]: "Doação",
      };
      const currentUser = getUserData();
      const role = currentUser.role;
      return user[role];
    },
    isURLVisible() {
      const user = {
        [UserRole.institution]: true,
        [UserRole.donator]: false,
      };
      const currentUser = getUserData();
      const role = currentUser.role;
      return user[role];
    },
  },
});
</script>

<style scoped>
.a-text {
  color: #0000;
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
