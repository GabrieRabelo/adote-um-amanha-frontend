<template>
  <v-container>
    <v-row class="justify-center align-center my-3 mx-1">
      <v-col class="px-0 py-0">
        <Input
          placeholder="Pesquisar..."
          prepend-inner-icon="mdi-magnify"
          class="mr-2"
          variant="round"
          hide-details
          elevation="3"
          v-model="inputFilter"
          @input="onInputChange"
        />
      </v-col>
    </v-row>
    <v-row class="my-1">
      <span
        class="page-subtitle mx-2"
        v-if="this.orders.length && baseOrder"
        v-html="pageSubtitle"
      ></span>
    </v-row>
    <v-row
      v-for="order in orders"
      :key="order.id"
      class="justify-center mx-2 mb-2"
    >
      <OrderCard :order="order" @click="onOrderClick(order)" />
    </v-row>
    <v-row fluid class="justify-center">
      <EmptyListError
        :title="hasError ? noOrderFoundTitle : emptyListTitleText"
        :body="hasError ? noOrderFoundBody : emptyListBodyText"
        class="mt-12 mx-2"
        v-if="isListEmpty"
      />
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import lodash from "lodash";
import ToolbarNavigationMixin from "../mixins/ToolbarNavigationMixin";
import ToolbarMenuMixin from "../mixins/ToolbarMenuMixin";
import Input from "../components/Input.vue";
import OrderCard from "../components/OrderCard.vue";
import { getNecessities, getNecessity } from "../services/NecessityService";
import { RequestType } from "../models/RequestEntity";
import {
  getDonation,
  getDonations,
} from "@/modules/donator/services/DonationService";
import { Status } from "../enums/Status";
import EmptyListError from "../components/EmptyListError.vue";

export default Vue.extend({
  props: ["order"],
  components: { Input, OrderCard, EmptyListError },
  mixins: [ToolbarNavigationMixin, ToolbarMenuMixin],
  data: () => ({
    loaded: false,
    orders: [],
    baseOrder: {},
    inputFilter: "",
    hasError: false,
  }),
  created() {
    this.onInputChange = lodash.debounce(this.onInputChange, 500);
  },
  async mounted() {
    this.$root.startLoader();
    this.checkForProps();
    this.baseOrder = await this.getBaseOrderInfo();
    this.orders = await this.getOrders();
    this.$root.showToolbar(
      `Vincular ${this.isNecessity ? "Doação" : "Necessidade"}`
    );
    this.$root.stopLoader();
  },
  methods: {
    checkForProps() {
      const { orderID, orderType } = this.$route.query;
      if (orderID && orderType) {
        return;
      }
      this.loaded = true;
      this.$root.stopLoader();
      this.hasError = true;
      this.$root.showToolbar(`Vincular Solicitação`);
      throw new Error('A rota espera os parâmetros "orderID" e "orderType".');
    },
    async getBaseOrderInfo() {
      const orderType = this.$route.query.orderType;
      const orderID = this.$route.query.orderID;
      const getter =
        orderType === RequestType.necessity ? getNecessity : getDonation;

      const response = await getter(orderID);
      return response;
    },
    async onInputChange() {
      this.$root.startLoader();
      this.orders = await this.getOrders();
      this.$root.stopLoader();
    },
    onOrderClick() {
      this.$root.showSnackbar({
        title: "Modal em implementação",
        color: "#555",
      });
    },
    async getOrders() {
      const params = {
        direcao: "DESC",
        ordenacao: "dataHora",
        categorias: this.baseOrder.category,
        subcategorias: this.baseOrder.subcategory,
        status: Status.pending,
        textoBusca: this.inputFilter,
      };
      const getter = this.isNecessity ? getDonations : getNecessities;
      const response = await getter(params);
      this.loaded = true;
      return response;
    },
  },
  computed: {
    pageSubtitle() {
      return `Escolha uma das ${this.inverseTypes.plural} abaixo para vincular à ${this.typeText} <b>${this.baseOrder.title}</b>.`;
    },
    isNecessity() {
      return this.baseOrder.type === RequestType.necessity;
    },
    emptyListTitleText() {
      return `Nenhuma ${this.inverseTypes.singular} encontrada!`;
    },
    emptyListBodyText() {
      return `Não foram encontradas ${this.inverseTypes.plural} que possam ser vinculadas com a ${this.typeText} <b>${this.baseOrder.title}</b>.`;
    },
    isListEmpty() {
      return this.loaded && !this.orders.length;
    },
    inverseTypes() {
      return {
        singular: this.isNecessity ? "doação" : "necessidade",
        plural: this.isNecessity ? "doações" : "necessidades",
      };
    },
    typeText() {
      return this.isNecessity ? "necessidade" : "doação";
    },
    noOrderFoundTitle() {
      return "Nenhuma solicitação encontrada.";
    },
    noOrderFoundBody() {
      return "";
    },
  },
});
</script>

<style>
.page-subtitle {
  text-align: center;
  color: #999;
}
</style>
