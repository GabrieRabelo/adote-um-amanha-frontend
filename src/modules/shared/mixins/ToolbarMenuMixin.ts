import Vue from "vue";
import BottomSheetDefaultItems from "../utils/BottomSheetDefaultItems";

export default Vue.extend({
  data: () => ({
    menuBottomSheetItems: [BottomSheetDefaultItems.logoutMenuItem],
  }),
  mounted() {
    this.setItems(this.menuBottomSheetItems as never);
  },
  destroyed() {
    this.setItems([]);
  },
  methods: {
    setItems(items = []) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const root = this.$root as any;
      root.setBottomSheetItems(items);
    },
  },
});
