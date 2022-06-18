<template>
  <v-container class="px-0 d-flex justify-center" style="height: 100%">
    <div class="main" v-if="isPageReady">
      <div class="header mb-12">
        <div class="header__img d-flex justify-center pt-6">
          <img
            width="130"
            src="../../../assets/img/logo.svg"
            alt="logo-image"
          />
        </div>
        <div class="header__title mt-2">Esqueceu sua senha?</div>
        <div class="header__subtitle mt-4 px-2">
          Não se preocupe, isso pode acontecer com todo mundo :)
        </div>
      </div>

      <div class="body pt-2">
        <div class="body__title mt-4">
          Crie uma nova senha para entrar na plataforma.
        </div>

        <v-form v-model="isFormValid">
          <div class="d-flex mx-6 justify-center mt-8">
            <PasswordInput
              label="Nova Senha"
              :rules="[inputValidations.required]"
              v-model="password"
              @keyup.enter="onConfirmClick"
              tabindex="0"
              autofocus
            />
          </div>

          <div class="d-flex mx-6 justify-center">
            <PasswordInput
              label="Confirmar Senha"
              :rules="[inputValidations.required]"
              v-model="confirmPassword"
              @keyup.enter="onConfirmClick"
              tabindex="0"
            />
          </div>
        </v-form>

        <v-expand-transition>
          <div
            v-if="shouldShowWarning"
            class="warning-text d-flex justify-center"
          >
            As senhas devem ser iguais.
          </div>
        </v-expand-transition>
        <div class="d-flex mt-4 mx-6 justify-center">
          <Button
            title="Confirmar"
            color="primary"
            :disabled="!isFormValid || !equalPasswords"
            @click="onConfirmClick"
            :loading="isButtonLoading"
          />
        </div>
      </div>
    </div>

    <div v-else class="main--error">
      <div class="header__title mb-12">Alterar Senha</div>
      <EmptyListError
        title="Esta página não existe!"
        body="A página que você está tentando acessar não está mais disponível."
      />
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import PasswordInput from "../components/PasswordInput.vue";
import Button from "../components/Button.vue";
import InputValidations from "../utils/InputValidations";
import LoginService from "@/modules/institution/services/LoginService";
import EmptyListError from "../components/EmptyListError.vue";

export default Vue.extend({
  components: { PasswordInput, Button, EmptyListError },
  data: () => ({
    password: "",
    confirmPassword: "",
    isFormValid: false,
    isButtonLoading: false,
    email: null,
    token: null,
    isPageReady: false,
  }),
  mounted() {
    this.loadDataFromQueryParams();
  },
  computed: {
    inputValidations() {
      return InputValidations;
    },
    equalPasswords() {
      return this.confirmPassword === this.password;
    },
    shouldShowWarning() {
      return !!this.password && !!this.confirmPassword && !this.equalPasswords;
    },
  },
  methods: {
    loadDataFromQueryParams() {
      const { email, token } = this.$route.query;
      this.email = email;
      this.token = token;
      if (this.email && this.token) {
        this.isPageReady = true;
      }
    },
    equalPassword() {
      return (
        this.confirmPassword === this.password || "As senhas devem ser iguais."
      );
    },
    onConfirmClick() {
      this.isButtonLoading = true;
      LoginService.changePassword({
        email: this.email,
        password: this.password,
        token: this.token,
      })
        .then(() => {
          this.$root.showSnackbar({
            title: "Senha alterada com sucesso!",
          });
        })
        .catch(() => {
          this.$root.showSnackbar({
            title: "Erro Inesperado.",
            color: "error",
          });
        })
        .finally(() => {
          this.isButtonLoading = false;
        });
    },
  },
});
</script>

<style lang="scss">
.header {
  &__title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    z-index: 100;
    position: relative;
  }

  &__subtitle {
    @extend .body__title;
    color: #777;
  }
}

.body {
  &__title {
    text-align: center;
  }
}

.warning-text {
  color: #b71c1c;
  font-size: 14px;
}

.main--error {
  margin: auto 0;
}
</style>
