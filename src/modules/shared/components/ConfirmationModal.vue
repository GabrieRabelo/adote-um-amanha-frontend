<template>
  <v-dialog max-width="330" v-bind="$attrs" v-on="$listeners">
    <v-card class="py-6 px-4">
      <div class="d-flex justify-center pb-8">
        <span class="dialog--title">
          {{ title }}
        </span>
      </div>

      <div class="d-flex justify-center pb-8">
        <span class="dialog--body">
          {{ message }}
        </span>
      </div>

      <v-card-actions class="justify-center">
        <Button
          class="button--confirm mr-2"
          title="Cancelar"
          color="primary"
          @click="onCancelClick"
          outlined
        />
        <Button
          class="button--confirm"
          title="Confirmar"
          color="primary"
          @click="onConfirmClick"
          :loading="loading"
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
    message: String,
    loading: Boolean,
  },
  components: {
    Button,
  },
  methods: {
    onCancelClick() {
      this.$emit("cancel");
    },
    onConfirmClick() {
      this.$emit("confirm");
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
  }

  &--body {
    text-align: center;
  }
}

.button--confirm {
  max-width: 120px;
}
</style>
