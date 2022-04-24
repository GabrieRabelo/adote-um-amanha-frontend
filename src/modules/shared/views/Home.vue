<template>
  <component :is="currentComponent" />
</template>

<script>
import Vue from "vue";
import Necessities from "./Necessities.vue";
import { UserRole } from "../enums/UserRole";
import { getUserData } from "../utils/LoggedUserManager";

export default Vue.extend({
  components: {
    Necessities,
    // HomeScreenDonator,
  },
  data: () => ({
    currentComponent: null,
  }),
  mounted() {
    this.currentComponent = this.getCurrentComponent();
    this.$root.hideToolbarButton();
  },
  destroyed() {
    this.$root.showToolbarButton();
  },
  methods: {
    getCurrentComponent() {
      const viewMap = {
        [UserRole.institution]: "Necessities",
        [UserRole.donator]: "HomeScreenDonator",
        [UserRole.admin]: "",
      };
      const currentUser = getUserData();
      const role = currentUser.role;
      return viewMap[role];
    },
  },
});
</script>

<style></style>
