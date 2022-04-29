<template>
  <v-app>
    <Toolbar
      :title="$root.toolbarTitle"
      :visible="$root.isToolbarVisible"
      :buttonVisible="$root.isToolbarButtonVisible"
    />
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar v-model="$root.snackbar.visible" :color="$root.snackbar.color">
      <v-layout align-center>
        <v-layout column>
          <div>
            <strong>{{ $root.snackbar.title }}</strong>
          </div>
          <div>
            {{ $root.snackbar.text }}
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "./modules/shared/components/Toolbar.vue";

export default Vue.extend({
  name: "App",
  data: () => ({}),
  components: {
    Toolbar,
  },
});
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";

.v-application {
  font-family: $body-font-family, sans-serif !important;
}
</style>
