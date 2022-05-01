<template>
  <v-app>
    <Toolbar
      :title="$root.toolbarTitle"
      :visible="$root.isToolbarVisible"
      :buttonVisible="$root.isToolbarButtonVisible"
    />
    <v-main>
      <v-progress-linear
        height="6"
        indeterminate
        absolute
        v-if="$root.isLoading"
      />
      <router-view />
    </v-main>
    <v-snackbar v-model="$root.isSnackbarVisible">{{
      $root.snackbarMessage
    }}</v-snackbar>
    <BottomSheetMenu
      :items="$root.bottomSheetItems"
      v-model="$root.isBottomSheetVisible"
      @wantsToClose="$root.hideBottomSheet"
    />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BottomSheetMenu from "./modules/shared/components/BottomSheet/BottomSheetMenu.vue";
import Toolbar from "./modules/shared/components/Toolbar.vue";

export default Vue.extend({
  name: "App",
  data: () => ({}),
  components: {
    Toolbar,
    BottomSheetMenu,
  },
});
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";

.v-application {
  font-family: $body-font-family, sans-serif !important;
}
</style>
