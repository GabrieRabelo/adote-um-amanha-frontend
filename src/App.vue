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
    <v-snackbar v-model="$root.snackbar.visible" :color="$root.snackbar.color">
      <v-layout align-center @click="$root.snackbar.visible=false">
        <v-layout column>
          <div>
            <strong>{{ $root.snackbar.title }}</strong>
          </div>
          <div>
            {{ $root.snackbar.body }}
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
    <BottomSheetMenu
      :items="$root.bottomSheetItems"
      v-model="$root.isBottomSheetVisible"
      @wantsToClose="$root.hideBottomSheet"
    />
  </v-app>
</template>

<script>
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
