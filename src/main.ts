import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  data: () => ({
    toolbarTitle: "",
    isToolbarVisible: false,
    snackbarMessage: "",
    isToolbarButtonVisible: false,
    snackbar: {
      color: "",
      body: "",
      title: "",
      visible: false,
    }
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
    showSnackbar({title = "Sucesso", body = "", color = "sucess"}: SnackbarProperties) {
      this.snackbar = {
        color: color,
        body: body,
        title: title,
        visible: true
      };
    }
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