<template>
  <v-container @click="onClick()">
    <v-row class="align-start ml-1 mt-1 align-center">
      <img
        width="60px"
        src="../../../assets/img/institution-logo.png"
        v-if="isInstitution"
      />
      <img width="60px" src="../../../assets/img/donator-logo.png" v-else />
      <div class="a-text ml-3 text-decoration-underline">
        {{ userName }}
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import { UserRole } from "../enums/UserRole";
export default Vue.extend({
  props: {
    userRole: String,
    userName: String,
    userId: Number,
  },
  computed: {
    isInstitution() {
      return this.userRole == UserRole.institution;
    },
  },
  methods: {
    onClick() {
      const route =
        this.userRole === UserRole.donator ? "donator" : "institution";
      this.$router.push(`/${route}/${this.userId}`);
    },
  },
});
</script>

<style scoped></style>
