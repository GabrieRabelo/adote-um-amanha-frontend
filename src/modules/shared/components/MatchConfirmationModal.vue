<template>
  <v-dialog max-width="330" v-bind="$attrs" v-on="$listeners">
    <v-card class="py-6 px-4">
      <div class="d-flex justify-center pb-8">
        <span class="dialog--title" v-html="title"></span>
      </div>
      <div class="d-flex justify-center pb-8 my-1">
        <img width="25px" :src="firstPath" alt="user logo" />
        <span class="dialog--title" v-html="firstTitle"></span>
        <span class="dialog--body" v-html="firstDescription"></span>
        <span icon="mdi-chevron-double-down"> </span>
        <img width="25px" :src="secondPath" alt="user logo" />
        <span class="dialog--title" v-html="secondTitle"></span>
        <span class="dialog--body" v-html="secondDescription"></span>
      </div>
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
          :disabled="!isValid"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import Button from "./Button.vue";

export default Vue.extend({
  props: {
    title: String,
    firstpath: String,
    firstTitle: String,
    firstDescription: String,
    secondPath: String,
    secondTitle: String,
    secondDescription: String,
    loading: Boolean,
    isCancelButtonOn: Boolean,
  },
  data: () => ({
    isValid: false,
  }),
  components: {
    Button,
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
