<template>
  <v-container class="pa-0">
    <div class="a-text__title pt-4">Criar Conta</div>
    <v-stepper vertical v-model="step" class="elevation-0">
      <v-stepper-step :complete="step > 1" step="1" @click="step = 1">
        Dados Pessoais
      </v-stepper-step>
      <v-stepper-content step="1" class="py-2">
        <div class="ma-2">
          <Input
            label="Nome Completo"
            placeholder="Exemplo de Souza"
            required
            v-model="donator.name"
          />
          <Input
            label="CPF/CNPJ"
            placeholder="123.456.789-01"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            required
            v-model="donator.cpf_cnpj"
          />
        </div>
        <Button
          color="primary"
          @click="step++"
          title="Continuar"
          compact
          appendIcon="mdi-chevron-right"
          outlined
          class="mb-3"
        />
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2" @click="step = 2">
        Endereço
      </v-stepper-step>
      <v-stepper-content step="2">
        <div class="ma-2">
          <Input
            label="CEP"
            placeholder="98765-123"
            v-mask="['#####-###', '#####-##']"
            required
            v-model="donator.addressDTO.cep"
          />
          <Input
            label="Logradouro"
            placeholder="Av. Ipiranga"
            required
            v-model="donator.addressDTO.rua"
          />
          <v-row>
            <v-col cols="3" class="pr-0">
              <Input
                label="Nº"
                placeholder="100"
                required
                v-model="donator.addressDTO.numero"
              />
            </v-col>
            <v-col>
              <Input
                label="Complemento"
                placeholder="Apto 101"
                required
                v-model="donator.addressDTO.complemento"
              />
            </v-col>
          </v-row>
          <Input
            label="Cidade"
            placeholder="Porto Alegre"
            required
            v-model="donator.addressDTO.cidade"
          />
          <InputStates
            class="pa-0 mt-0"
            placeholder="SP"
            v-model="donator.addressDTO.estado"
          />
        </div>
        <Button
          color="primary"
          @click="step++"
          title="Continuar"
          compact
          appendIcon="mdi-chevron-right"
          outlined
          class="mb-3"
        />
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3" @click="step = 3">
        Conta
      </v-stepper-step>
      <v-stepper-content step="3" class="py-2">
        <div class="ma-2">
          <Input
            label="E-mail"
            placeholder="exemplo@gmail.com"
            required
            v-model="donator.email"
          />
          <Input
            label="Telefone"
            placeholder="(51) 99720-0096"
            v-mask="['(##) ####-####', '(##) #####-####']"
            required
            v-model="donator.phone"
          />
          <PasswordInput label="Senha" required v-model="donator.password" />
        </div>
        <Button
          color="primary"
          @click="step++"
          title="Continuar"
          compact
          appendIcon="mdi-chevron-right"
          outlined
          class="mb-3"
        />
      </v-stepper-content>

      <v-stepper-step :complete="step > 4" step="4" @click="step = 4">
        Termos e Condições
      </v-stepper-step>
      <v-stepper-content step="4" class="py-2">
        <div class="ma-2">
          <v-checkbox
            v-model="acceptsTerms"
            label="Li e aceito os Termos e Condições"
          ></v-checkbox>
        </div>
        <Button
          color="primary"
          @click="step++"
          title="Continuar"
          compact
          appendIcon="mdi-chevron-right"
          outlined
          class="mb-3"
        />
      </v-stepper-content>
    </v-stepper>
    <v-row class="justify-center">
      <v-slide-x-transition hide-on-leave>
        <Button
          v-if="step > 4"
          color="primary"
          @click="onConfirmButtonClick"
          title="Cadastrar"
          prependIcon="mdi-check"
          compact
        />
      </v-slide-x-transition>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Input from "../../shared/components/Input.vue";
import InputStates from "../../shared/components/InputStates.vue";
import PasswordInput from "../../shared/components/PasswordInput.vue";
import Button from "../../shared/components/Button.vue";

export default Vue.extend({
  components: { Input, InputStates, PasswordInput, Button },
  props: { donator: Object },
  model: {
    prop: "donator",
    event: "change",
  },
  data: () => ({
    acceptsTerms: false,
    step: 1,
  }),
  methods: {
    onConfirmButtonClick() {
      console.log(this.donator);
    },
  },
});
</script>

<style lang="scss"></style>
