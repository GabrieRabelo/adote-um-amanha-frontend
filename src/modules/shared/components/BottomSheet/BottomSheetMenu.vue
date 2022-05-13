<template>
  <v-bottom-sheet v-bind="$attrs" v-on="$listeners">
    <v-list class="py-0">
      <v-list-item-group>
        <BottomSheetItem
          class="font-weight-medium"
          v-for="item of items"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          @click="onItemClick(item)"
        />
      </v-list-item-group>
    </v-list>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import { BottomSheetMenuItem } from "../../types/BottomSheetMenuItem";
import BottomSheetItem from "./BottomSheetItem.vue";
export default Vue.extend({
  components: { BottomSheetItem },
  props: {
    items: Array,
  },
  methods: {
    onItemClick(item: BottomSheetMenuItem) {
      this.$emit("wantsToClose");
      item.onClick();
    },
  },
});
</script>

<style></style>
