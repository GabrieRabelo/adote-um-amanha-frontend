<template>
  <v-app-bar app class="toolbar" v-if="visible">
    <v-col class="px-0" cols="2"
      ><v-app-bar-nav-icon @click="$router.go(-1)" v-if="buttonVisible">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon></v-col
    >
    <v-toolbar-title class="font-weight-black flex text-center">
      {{ title }}
    </v-toolbar-title>
    <v-col class="px-0" cols="2"></v-col>
  </v-app-bar>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    visible: Boolean,
    buttonVisible: Boolean,
  },
});
</script>
<style lang="scss" scoped>
.toolbar {
  background-image: linear-gradient(90deg, #fff05a, #ffc700);
}
.toolbar-title {
  text-align: center;
  margin: auto 0;
}
</style>
