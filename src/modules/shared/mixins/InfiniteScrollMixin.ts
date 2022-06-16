import Vue from "vue";

export default Vue.extend({
  data: () => ({
    isRequestLoading: false,
  }),
  mounted() {
    window.onscroll = () => {
      this.checkScrollPosition();
    };
  },
  methods: {
    checkScrollPosition() {
      const scrollOffset = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      const scrollYPosition = window.innerHeight + scrollOffset;
      const reachedBottom = scrollYPosition === document.body.offsetHeight;
      if (reachedBottom) {
        this.onBottomReached();
      }
    },
    onBottomReached() {
      throw new Error("onBottomReached() must be implemented");
    },
  },
});
