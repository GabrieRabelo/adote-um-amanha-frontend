<template>
  <v-container class="main-container d-flex-column">
    <v-container class="align-start px-7" v-if="donation">
      <v-row class="mt-3 mb-4">
        <div class="a-text__bold-title">{{ donation.title }}</div>
      </v-row>
      <v-row
        class="justify-space-between mb-3"
        v-for="attribute in attributes"
        :key="attribute.key"
      >
        <div class="a-text">{{ attribute.key }}</div>
        <div class="a-text light">{{ attribute.value }}</div>
      </v-row>
      <v-row class="justify-space-between mb-3">
        <div class="a-text">Status</div>
        <div>
          <v-icon :color="statusIconColor">{{ statusIcon }}</v-icon>
          <span class="a-text light ml-2">{{ statusText }}</span>
        </div>
      </v-row>
      <v-row>
        <div class="a-text">Descrição</div>
      </v-row>
      <v-row>
        <div class="a-text light">{{ donation.description }}</div>
      </v-row>

      <v-row class="py-4">
        <UserCard
          :userRole="donatorRole"
          :userName="donation.user.name"
          :userId="donation.user.id"
        />
      </v-row>
    </v-container>

    <v-container class="align-self-end" v-if="donation">
      <v-row class="justify-center mb-2">
        <Button
          class="mr-4"
          title="Voltar"
          color="primary"
          prependIcon="mdi-arrow-left"
          outlined
          compact
          @click="$router.go(-1)"
        />
        <Button
          title="Editar"
          color="primary"
          prependIcon="mdi-pencil"
          compact
          v-if="canEdit"
          @click="onEditButtonClick"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Vue from "vue";
import Category from "../../shared/enums/Category";
import Subcategory from "../../shared/enums/Subcategory";
import { getDonation } from "../../donator/services/DonationService";
import moment from "moment";
import Button from "../../shared/components/Button.vue";
import { Status } from "@/modules/shared/enums/Status";
import StatusUtils from "../../shared/enums/Status";
import { getUserData } from "@/modules/shared/utils/LoggedUserManager";
import { UserRole } from "@/modules/shared/enums/UserRole";
import ToolbarNavigationMixin from "@/modules/shared/mixins/ToolbarNavigationMixin";
import ToolbarMenuMixin from "@/modules/shared/mixins/ToolbarMenuMixin";
import UserCard from "../../shared/components/UserCard.vue";

export default Vue.extend({
  mixins: [ToolbarNavigationMixin, ToolbarMenuMixin],
  components: { UserCard, Button },
  data: () => ({
    donation: null,
  }),
  async mounted() {
    this.$root.showToolbar("DOAÇÃO");
    this.donation = await getDonation(this.$route.params.id).catch(
      ({ response }) => {
        if (response.status === 404) {
          this.onNotFound();
        }
      }
    );
  },
  computed: {
    attributes() {
      return [
        {
          key: "Data cadastro",
          value: moment(this.donation.createdDate).format("DD/MM/yyyy"),
        },
        {
          key: "Categoria",
          value: Category.toSingularString(this.donation.category),
        },
        {
          key: "Subcategoria",
          value: Subcategory.toString(this.donation.subcategory),
        },
      ];
    },
    statusText() {
      return StatusUtils.toString(this.donation.status);
    },
    statusIcon() {
      return StatusUtils.getIcon(this.donation.status);
    },
    statusIconColor() {
      return StatusUtils.getIconColor(this.donation.status);
    },
    canEdit() {
      return (
        this.donation.status === Status.pending &&
        getUserData().role == UserRole.donator
      );
    },
    donatorRole() {
      return UserRole.donator;
    },
  },
  methods: {
    onNotFound() {
      this.$router.push("/home");
    },
    onEditButtonClick() {
      this.$router.push(`/donations/${this.donation.id}/edit/`);
    },
  },
});
</script>

<style scoped>
.align-button {
  justify-content: end;
}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
