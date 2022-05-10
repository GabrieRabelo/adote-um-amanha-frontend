<template>
  <v-dialog max-width="330" v-bind="$attrs" v-on="$listeners">
    <v-card class="py-6 px-4">
      <div class="d-flex justify-center pb-2">
        <span class="dialog--title">
          {{ title }}
        </span>
      </div>

      <div class="d-flex justify-center pb-2">
        <v-icon color="green" x-large>mdi-check-circle-outline</v-icon>
      </div>

      <div class="d-flex justify-center pb-2">
        <span class="dialog--body">
          {{ message }}
        </span>
      </div>

      <v-card-actions class="justify-center">
        <Button
          class="button--confirm"
          title="Ok"
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
