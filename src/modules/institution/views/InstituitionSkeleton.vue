<template>
  <v-container class="align-start" fill-height>
    <v-container class="align-start px-7" v-if="instituition">
      <v-row class="mt-3 mb-4">
        <div class="header">
          <img width="65px" />
          <div class="a-text__bold-title py-0"></div>
        </div>
      </v-row>
      <v-row class="justify-space-between mb-3">
        <div class="a-text"></div>
        <div class="a-text light"></div>
      </v-row>
      <v-row>
        <v-col class="px-0 py-0">
          <v-btn icon>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <div class=""></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-0 py-0">
          Endereço
          <v-btn icon v-bind:href="getUrlAddress" target="_blank">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <div class=""></div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="align-self-end mb-8">
      <v-row class="justify-center">
        <Button />
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.a-text {
  color: #000000;
  animation: pulse-bg 1s infinite;
}

.header {
  display: flex;
  align-items: center;
  animation: pulse-bg 1s infinite;
}

.a-text__bold-title {
  padding: 30px;
  animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
