<template>
  <v-dialog content-class="dialog" v-bind="$attrs" v-on="$listeners">
    <v-card class="py-6 px-4">
      <div class="d-flex justify-center pb-8">
        <span class="dialog--title" v-html="title"></span>
      </div>
      <div class="d-flex flex-column justify-center pb-8 my-1">
        <OrderInfo :order="baseOrder" />
        <div class="d-flex justify-center">
          <v-icon class="my-3">mdi-chevron-double-down</v-icon>
        </div>
        <OrderInfo :order="targetOrder" v-if="targetOrder" />
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
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import { RequestType } from "../models/RequestEntity";
import { getNecessity } from "../services/NecessityService";
import Button from "./Button.vue";
import OrderInfo from "./OrderInfo.vue";

export default Vue.extend({
  components: { OrderInfo, Button },
  props: {
    loading: Boolean,
    isCancelButtonOn: Boolean,
    baseOrder: Object,
    targetOrderID: Number,
  },
  data: () => ({
    targetOrder: {},
  }),
  methods: {
    onCancelClick() {
      this.$emit("cancel");
    },
    onConfirmClick() {
      this.$emit("confirm", this.refusalReason);
    },
  },
  mounted() {
    setTimeout(async () => {
      this.targetOrder = await getNecessity(this.targetOrderID);
    }, 1500);
  },
  computed: {
    isNecessity() {
      return this.orderType === RequestType.necessity;
    },
    title() {
      return this.isNecessity ? "Vincular Doação" : "Vincular Necessidade";
    },
    attributes() {
      if (this.isNecessity) {
        return {
          title: "Vincular Doação",
          firstPath: "",
        };
      }
      return {
        title: "Vincular Necessidade",
      };
    },
  },
});
</script>

<style scoped lang="scss">
.dialog {
  overflow-x: hidden !important;

  &--title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
}

.button--confirm {
  max-width: 120px;
}
</style>
