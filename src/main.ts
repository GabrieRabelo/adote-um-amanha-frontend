import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { BottomSheetMenuItem } from "./modules/shared/types/BottomSheetMenuItem";

Vue.config.productionTip = false;

new Vue({
  data: () => ({
    toolbarTitle: "",
    isToolbarVisible: false,
    snackbarMessage: "",
    isSnackbarVisible: false,
    isToolbarButtonVisible: false,
    isBottomSheetVisible: false,
    bottomSheetItems: [] as BottomSheetMenuItem[],
  }),
  methods: {
    showToolbar(title?: string) {
      this.isToolbarVisible = true;
      if (title) {
        this.toolbarTitle = title;
      }
    },
    hideToolbar() {
      this.isToolbarVisible = false;
    },
    showToolbarButton() {
      this.isToolbarButtonVisible = true;
    },
    hideToolbarButton() {
      this.isToolbarButtonVisible = false;
    },
    showSnackbar(message: string) {
      this.snackbarMessage = message;
      this.isSnackbarVisible = true;
    },
    showBottomSheet() {
      this.isBottomSheetVisible = true;
    },
    hideBottomSheet() {
      this.isBottomSheetVisible = false;
    },
    setBottomSheetItems(items: BottomSheetMenuItem[]) {
      this.bottomSheetItems = items;
    },
  },
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
