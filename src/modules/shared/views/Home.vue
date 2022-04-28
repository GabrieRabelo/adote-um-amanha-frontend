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
  },
  computed: {
    currentComponent() {
      const viewMap = {
        [UserRole.institution]: "Necessities",
        [UserRole.donator]: "Necessities",
        [UserRole.admin]: "Necessities",
      };
      const currentUser = getUserData();
      const role = currentUser.role;
      return viewMap[role];
    },
  },
});
</script>

<style></style>
