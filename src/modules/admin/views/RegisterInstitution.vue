<template>
  <v-container fill-height class="align-start">
    <!-- <v-container class="align-start"> -->
    <!-- </v-container> -->
    <v-form v-model="isFormValid" class="fill-width">
      <v-col>
        <Input
          label="Nome da Instituição"
          placeholder="Exemplo de Nome"
          v-model="institution.name"
          required
          :rules="[inputValidations.required]"
        />
        <v-row>
          <v-col cols="6" class="mb-0 pb-0">
            <Input
              label="CNPJ"
              placeholder="12.345.678/9999-99"
              v-mask="['##.###.###/####-##']"
              v-model="institution.cpf_cnpj"
              required
              :rules="[inputValidations.cpf_cnpj, inputValidations.required]"
            />
          </v-col>
          <v-col class="mb-0 pb-0">
            <Input
              label="CEP"
              placeholder="98765-123"
              v-mask="['#####-###', '#####-##']"
              v-model="institution.addressDTO.cep"
              required
              :rules="[inputValidations.cep, inputValidations.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="mt-0 pt-0">
            <Input
              label="Cidade"
              placeholder="Porto Alegre"
              v-model="institution.addressDTO.cidade"
              required
              :rules="[inputValidations.required]"
            />
          </v-col>
          <v-col cols="4" class="mt-0 pt-0">
            <InputStates
              class="pa-0 mt-0"
              v-model="institution.addressDTO.estado"
              placeholder="SP"
            >
            </InputStates>
          </v-col>
        </v-row>

        <Input
          label="Bairro"
          placeholder="Partenon"
          v-model="institution.addressDTO.bairro"
          required
          :rules="[inputValidations.required]"
        />
        <Input
          label="Rua"
          placeholder="Av. Ipiranga"
          v-model="institution.addressDTO.rua"
          required
          :rules="[inputValidations.required]"
        />
        <v-row>
          <v-col cols="3">
            <Input
              label="Nº"
              placeholder="100"
              v-model="institution.addressDTO.numero"
              required
              :rules="[inputValidations.numero, inputValidations.required]"
            />
          </v-col>
          <v-col>
            <Input
              label="Complemento"
              placeholder="Apto 101"
              v-model="institution.addressDTO.complemento"
              required
            />
          </v-col>
        </v-row>
        <Input
          label="E-mail"
          placeholder="exemplo@gmail.com"
          v-model="institution.email"
          required
          :rules="[inputValidations.email, inputValidations.required]"
        />
        <Input
          label="Telefone"
          placeholder="(51) 99720-0096"
          v-mask="['(##) ####-####', '(##) #####-####']"
          v-model="institution.phone"
          required
          :rules="[inputValidations.telefone, inputValidations.required]"
        />
        <Input
          prepend-inner-icon="mdi-link"
          label="Vídeo da Instituição (URL)"
          placeholder="youtube.com/watch"
          v-model="institution.site"
        />
        <PasswordInput
          label="Senha"
          v-model="institution.password"
          required
          :rules="[inputValidations.required]"
        />
      </v-col>
    </v-form>

    <v-container class="align-end">
      <div class="d-flex justify-center">
        <Button
          title="Cadastrar"
          color="primary"
          @click="onSignUpButtonClick"
          :loading="signUpButtonLoading"
          :disabled="!isButtonValid"
        />
      </div>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "../../shared/components/Button.vue";
import Input from "../../shared/components/Input.vue";
import PasswordInput from "../../shared/components/PasswordInput.vue";
import InputValidations from "../../shared/utils/InputValidations";
import { createInstitution } from "../../institution/services/InstitutionService";
import InputStates from "../../shared/components/InputStates.vue";
import VueTheMask from "vue-the-mask";
import LoginService from "@/modules/institution/services/LoginService";
import ToolbarNavigationMixin from "../../shared/mixins/ToolbarNavigationMixin";
import ToolbarMenuMixin from "../../shared/mixins/ToolbarMenuMixin";

Vue.use(VueTheMask);

export default Vue.extend({
  components: { Button, Input, PasswordInput, InputStates },
  mixins: [ToolbarNavigationMixin, ToolbarMenuMixin],
  data: () => ({
    isFormValid: false,
    signUpButtonLoading: false,
    institution: {
      addressDTO: {},
    },
  }),
  mounted() {
    this.$root.showToolbar("Cadastro de Instituição");
  },
  methods: {
    onSignUpButtonClick() {
      this.signUpButtonLoading = true;
      createInstitution(this.institution)
        .then(() => {
          this.$root.showSnackbar({ title: "Cadastro realizado com sucesso!" });
          this.$router.push("/home");
        })
        .catch((e) => {
          this.isLoading = false;
          this.$root.showSnackbar({ title: "Erro inesperado", color: "error" });
          console.error(e);
        })
        .finally(() => {
          this.signUpButtonLoading = false;
        });
    },
  },
  computed: {
    inputValidations() {
      return InputValidations;
    },
    isButtonValid() {
      return this.isFormValid;
    },
  },
});
</script>

<style>
.fill-width {
  width: 100%;
}
</style>
