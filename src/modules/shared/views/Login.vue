<template>
  <v-container fill-height class="align-start">
    <v-container class="align-start">
      <div class="a-text__title">Adote um Amanhã</div>
    </v-container>
    <v-container class="align-center justify-center">
      <div class="d-flex justify-center">
        <img width="200px" src="../../../assets/img/logo.svg" />
      </div>
      <div class="a-text__subtitle mt-6">Bem-vindo!</div>
      <div class="inputs mt-6">
        <v-form v-model="isFormValid">
          <Input
            class="mx-6"
            label="E-mail"
            v-model="login"
            type="email"
            required
            :rules="[inputValidations.email, inputValidations.required]"
          />
          <PasswordInput
            @keyup.enter="onLoginButtonClick"
            class="mx-6"
            label="Senha"
            v-model="password"
            required
            :rules="[inputValidations.required]"
          />
        </v-form>
        <div class="d-flex justify-center">
          <Button
            title="Entrar"
            color="primary"
            @click="onLoginButtonClick"
            :loading="loginButtonLoading"
            :disabled="!isLoginDataValid"
          />
        </div>
      </div>
    </v-container>
    <v-container class="align-end">
      <v-row class="justify-center mb-2">
        <div class="link" @click="onForgotPasswordClick">
          Esqueci minha senha
        </div>
      </v-row>
      <v-row class="justify-center">
        <span>Ainda não tem conta?</span>&nbsp;
        <Link url="/donator/create">Cadastre-se!</Link>
      </v-row>
    </v-container>

    <div v-if="isForgotPasswordOpen">
      <ForgotPasswordModal
        v-model="isForgotPasswordOpen"
        :email="login"
        @close="isForgotPasswordOpen = false"
      />
    </div>
  </v-container>
</template>

<script>
import Input from "../components/Input.vue";
import Vue from "vue";
import PasswordInput from "../components/PasswordInput.vue";
import Button from "../components/Button.vue";
import loginService from "../../institution/services/LoginService";
import InputValidations from "../utils/InputValidations";
import Link from "../components/Link.vue";
import { clearAccessToken } from "../utils/AuthenticationManager";
import ForgotPasswordModal from "../components/ForgotPassword/ForgotPasswordModal.vue";

export default Vue.extend({
  components: {
    PasswordInput,
    Input,
    Button,
    Link,
    ForgotPasswordModal,
  },
  data: () => ({
    login: "",
    password: "",
    loginButtonLoading: false,
    isFormValid: false,
    isForgotPasswordOpen: false,
  }),
  mounted() {
    this.$root.hideToolbar();
    clearAccessToken();
  },
  computed: {
    inputValidations() {
      return InputValidations;
    },
    isLoginDataValid() {
      return this.isFormValid;
    },
  },
  methods: {
    onForgotPasswordClick() {
      this.isForgotPasswordOpen = true;
    },

    async onLoginButtonClick() {
      this.loginButtonLoading = true;
      const result = await loginService.login(this.login, this.password);
      this.handleLoginResult(result);
      this.loginButtonLoading = false;
    },

    handleLoginResult(result) {
      switch (result.status) {
        case 200:
          this.onLoginSuccess();
          break;
        case 500:
          this.onLoginUnauthorized();
          break;
      }
    },
    onLoginSuccess() {
      this.$router.push("home");
    },
    onLoginUnauthorized() {
      this.$root.showSnackbar({
        title: "Usuário e/ou senha incorretos.",
        color: "error",
      });
    },
  },
});
</script>

<style lang="scss">
.a-text__title,
.a-text__subtitle {
  text-align: center;
}

.inputs {
  max-width: 500px;
  margin: 0 auto;
}

.img {
  &-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
