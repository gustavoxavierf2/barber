<template>
  <!-- <form>
      <v-text-field
        v-model="state.name"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        :counter="10"
        label="Name"
        required
        @input="v$.name.$touch"
        @blur="v$.name.$touch"
      ></v-text-field>

      <v-text-field
        v-model="state.email"
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        label="E-mail"
        required
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
        colo
      ></v-text-field>

      <v-select
        v-model="state.select"
        :items="items"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        label="Item"
        required
        @change="v$.select.$touch"
        @blur="v$.select.$touch"
      ></v-select>

      <v-checkbox
        v-model="state.checkbox"
        :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
        label="Do you agree?"
        required
        @change="v$.checkbox.$touch"
        @blur="v$.checkbox.$touch"
      ></v-checkbox>

      <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form> -->

  centrilize in the middle of the screen
  <v-card class="w-50 mx-auto mt-12">
    <v-form v-model="valid" class="w-100">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="Nome"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Sobrenome"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Celular"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import App from "../App.vue";
import Vue from "vue";

import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

export default {
  setup() {
    const initialState = {
      name: "",
      email: "",
      select: null,
      checkbox: null,
    };

    const state = reactive({
      ...initialState,
    });

    const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

    const rules = {
      name: { required },
      email: { required, email },
      select: { required },
      items: { required },
      checkbox: { required },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    return { state, items, clear, v$ };
  },
};
</script>

<style scoped></style>
