/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    showToolbarNavButton: true,
  }),
  mounted() {
    const root = this.$root as any;
    this.showToolbarNavButton
      ? root.showToolbarButton()
      : root.hideToolbarButton();

    root.onToolbarNavButtonClick = () => {
      this.onToolbarNavButtonClick();
    };
  },
  methods: {
    onToolbarNavButtonClick() {
      this.$router.go(-1);
    },
  },
});
