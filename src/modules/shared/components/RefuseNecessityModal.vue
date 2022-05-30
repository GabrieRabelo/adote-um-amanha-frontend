<template>
  <v-dialog max-width="330" v-bind="$attrs" v-on="$listeners">
    <v-card class="py-6 px-4">
      <div class="d-flex justify-center pb-8">
        <span class="dialog--title">
          {{ title }}
        </span>
      </div>
      <div class="d-flex justify-center pb-8">
        <span class="dialog--body" v-html="message"> </span>
      </div>
      <v-form v-model="isValid" v-if="!hideReasonInput">
        <TextArea
          name="input-reason"
          v-model="refusalReason"
          label="Motivo"
          required
          :rules="[inputValidations.required]"
          maxlength="255"
        ></TextArea>
      </v-form>
      <v-card-actions class="justify-center">
        <Button
          class="button--confirm mr-2"
          title="Cancelar"
          color="primary"
          @click="onCancelClick"
          v-if="isCancelButtonOn"
          outlined
        />
        <Button
          class="button--confirm"
          title="Confirmar"
          color="primary"
          @click="onConfirmClick"
          :loading="loading"
          :disabled="!canConfirm"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import Button from "./Button.vue";
import TextArea from "../../shared/components/TextArea.vue";
import InputValidations from "../../shared/utils/InputValidations";

export default Vue.extend({
  props: {
    title: String,
    message: String,
    loading: Boolean,
    isCancelButtonOn: Boolean,
    hideReasonInput: Boolean,
  },
  data: () => ({
    refusalReason: "",
    isValid: false,
  }),
  components: {
    Button,
    TextArea,
  },
  computed: {
    inputValidations() {
      return InputValidations;
    },
    canConfirm() {
      return this.isValid || this.hideReasonInput;
    },
  },
  methods: {
    onCancelClick() {
      this.$emit("cancel");
    },
    onConfirmClick() {
      this.$emit("confirm", this.refusalReason);
    },
  },
});
</script>

<style scoped lang="scss">
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

.button--confirm {
  max-width: 120px;
}
</style>
