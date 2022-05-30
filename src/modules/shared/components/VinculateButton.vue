<template>
  <Button
          class="vinculate-button"
          color="primary"
          prependIcon="mdi-plus"
          outlined
          v-bind="$attrs"
          v-on="$listeners"
        />
</template>

<script>
import Vue from "vue";
import Button from "./Button.vue"


export default Vue.extend({
 components:{
     Button,
 }
});

</script>

<style>

.vinculate-button {
  width: 313px;
  min-height: 75px;
  border: 2px dotted #ffd25a !important;
  border-radius: 7px;
}

</style>
