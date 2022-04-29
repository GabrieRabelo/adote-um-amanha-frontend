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
      text: "",
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
    showSnackbar(title: string, text: string, color: string) {
      this.snackbar = {
        color: color,
        text: text,
        title: title,
        visible: true
      };
    }
  },
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
