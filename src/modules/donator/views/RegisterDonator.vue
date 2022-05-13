<template>
  <v-container fill-height class="align-start">
    <v-container class="align-start">
      <div class="a-text__title">Cadastro</div>
    </v-container>
    <v-form v-model="isFormValid" class="fill-width">
      <v-col>
        <Input
          label="Nome Completo"
          placeholder="Exemplo de Souza"
          v-model="donator.name"
          required
          :rules="[inputValidations.required]"
        />
        <v-row>
          <v-col cols="6" class="mb-0 pb-0">
            <Input
              label="CPF/CNPJ"
              placeholder="123.456.789-01"
              v-mask="['###.###.###-##', '##.###.###/####-##']"
              v-model="donator.cpf_cnpj"
              required
              :rules="[inputValidations.cpf_cnpj, inputValidations.required]"
            />
          </v-col>
          <v-col class="mb-0 pb-0">
            <Input
              label="CEP"
              placeholder="98765-123"
              v-mask="['#####-###', '#####-##']"
              v-model="donator.addressDTO.cep"
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
              v-model="donator.addressDTO.cidade"
              required
              :rules="[inputValidations.required]"
            />
          </v-col>
          <v-col cols="4" class="mt-0 pt-0">
            <InputStates
              class="pa-0 mt-0"
              v-model="donator.addressDTO.estado"
              placeholder="SP"
            >
            </InputStates>
          </v-col>
        </v-row>

        <Input
          label="Bairro"
          placeholder="Partenon"
          v-model="donator.addressDTO.bairro"
          required
          :rules="[inputValidations.required]"
        />
        <Input
          label="Rua"
          placeholder="Av. Ipiranga"
          v-model="donator.addressDTO.rua"
          required
          :rules="[inputValidations.required]"
        />
        <v-row>
          <v-col cols="3">
            <Input
              label="Nº"
              placeholder="100"
              v-model="donator.addressDTO.numero"
              required
              :rules="[inputValidations.numero, inputValidations.required]"
            />
          </v-col>
          <v-col>
            <Input
              label="Complemento"
              placeholder="Apto 101"
              v-model="donator.addressDTO.complemento"
              required
            />
          </v-col>
        </v-row>
        <Input
          label="E-mail"
          placeholder="exemplo@gmail.com"
          v-model="donator.email"
          required
          :rules="[inputValidations.email, inputValidations.required]"
        />
        <Input
          label="Telefone"
          placeholder="(51) 99720-0096"
          v-mask="['(##) ####-####', '(##) #####-####']"
          v-model="donator.phone"
          required
          :rules="[inputValidations.telefone, inputValidations.required]"
        />
        <PasswordInput
          label="Senha"
          v-model="donator.password"
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

    <v-container class="align-end">
      <v-col align-self="stretch">
        <v-row class="d-flex justify-center">
          <span>Já possuí uma conta?</span>&nbsp;
          <Link url="/auth">Fazer login</Link>
        </v-row>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import Button from "../../shared/components/Button.vue";
import Link from "../../shared/components/Link.vue";
import Input from "../../shared/components/Input.vue";
import PasswordInput from "../../shared/components/PasswordInput.vue";
import InputValidations from "../../shared/utils/InputValidations";
import { createDonator } from "../services/DonatorService";
import InputStates from "../../shared/components/InputStates.vue";
import VueTheMask from "vue-the-mask";
import LoginService from "@/modules/institution/services/LoginService";

Vue.use(VueTheMask);

export default Vue.extend({
  components: { Button, Link, Input, PasswordInput, InputStates },
  data: () => ({
    isFormValid: false,
    signUpButtonLoading: false,
    donator: {
      addressDTO: {},
    },
  }),
  methods: {
    onSignUpButtonClick() {
      this.signUpButtonLoading = true;
      createDonator(this.donator)
        .then(() => {
          this.$root.showSnackbar({ title: "Cadastro realizado com sucesso!" });
          LoginService.login(this.donator.email, this.donator.password)
            .then(() => {
              this.$router.push("/home");
              this.isLoading = false;
            })
            .catch(() => {
              this.$router.push("/auth");
            })
            .finally(() => {
              this.signUpButtonLoading = false;
            });
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
