<template>
  <v-container fluid>
    <v-row
      align="center"
      class="a-input"
      outlined
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-col class="d-flex">
        <v-select
          outlined
          v-bind="$attrs"
          v-on="$listeners"
          class="input-state"
          :items="items"
          label="Estado"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
  }),
};
</script>

<style lang="scss" scoped>
.v-text-field {
  border-radius: 10px;

  &--outlined {
    ::v-deep fieldset {
      border-color: var(--v-primary-base);
    }
  }
}

.round {
  border-radius: 25px;
  ::v-deep fieldset {
    border: none;
  }
}
</style>
