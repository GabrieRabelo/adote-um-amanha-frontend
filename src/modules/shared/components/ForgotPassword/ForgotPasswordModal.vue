<template>
  <v-dialog v-bind="$attrs" v-on="$listeners">
    <v-card class="py-6 px-4">
      <div class="d-flex justify-center pb-6">
        <span class="dialog--title"> Recuperar Senha </span>
      </div>
      <div class="dialog--body">
        <div class="">
          Informe seu e-mail, em seguida enviaremos um link para trocar a sua
          senha.
        </div>

        <v-form v-model="isFormValid" class="mt-4">
          <Input
            label="E-mail"
            type="email"
            v-model="currentEmail"
            :rules="[inputValidations.required]"
          />
        </v-form>
      </div>

      <div class="d-flex justify-center">
        <Button
          compact
          outlined
          title="Cancelar"
          @click="$emit('close')"
          class="mr-4"
        />
        <Button
          title="Enviar"
          color="primary"
          :loading="isSendButtonLoading"
          @click="onSendButtonClick"
          :disabled="!isFormValid"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import Input from "../Input.vue";
import Button from "../Button.vue";
import LoginService from "../../../institution/services/LoginService";
import InputValidations from "../../utils/InputValidations";

export default Vue.extend({
  props: ["email"],
  components: { Input, Button },
  data: () => ({
    isSendButtonLoading: false,
    currentEmail: "",
    isFormValid: false,
  }),
  mounted() {
    this.currentEmail = this.email || "";
  },
  methods: {
    onSendButtonClick() {
      this.isSendButtonLoading = true;
      LoginService.recoverPassword(this.currentEmail)
        .then(() => {
          this.$emit("close");
          this.$root.showSnackbar({
            title: "E-mail enviado!",
            body: "Verifique seu e-mail e acesse o link enviado para alterar a sua senha.",
          });
        })
        .finally(() => {
          this.isSendButtonLoading = false;
        });
    },
  },
  computed: {
    inputValidations() {
      return InputValidations;
    },
  },
});
</script>

<style lang="scss">
.dialog {
  &--container {
    min-height: 180px;
  }

  &--title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  &--body {
    text-align: center;
  }
}
</style>
