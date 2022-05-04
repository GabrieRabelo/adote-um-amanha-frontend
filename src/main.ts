import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { BottomSheetMenuItem } from "./modules/shared/types/BottomSheetMenuItem";

Vue.config.productionTip = false;

new Vue({
  data: () => ({
    isLoading: false,
    toolbarTitle: "",
    isToolbarVisible: false,
    snackbarMessage: "",
    isToolbarButtonVisible: false,
    snackbar: {
      color: "",
      body: "",
      title: "",
      visible: false,
    },
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
    startLoader() {
      this.isLoading = true;
    },
    stopLoader() {
      this.isLoading = false;
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
    showSnackbar({title = "Sucesso", body = "", color = "sucess"}: SnackbarProperties) {
      this.snackbar = {
        color: color,
        body: body,
        title: title,
        visible: true
      };
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

interface SnackbarProperties {
  title: string,
  body: string,
  color: string
}