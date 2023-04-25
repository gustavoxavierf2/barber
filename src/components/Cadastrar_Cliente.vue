<template>
  <v-card class="w-50 mx-auto mt-12">
    <v-form class="w-100">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="nome"
              :rules="nameRules"
              label="Nome"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="sobrenome"
              :rules="nameRules"
              label="Sobrenome"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="celular"
              label="Celular"
              required
              :counter="11"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" mx="auto">
            <v-btn type="submit" @click="submit()" block class="mt-2 mx-auto"
              >Salvar</v-btn
            >
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
import { vMaska } from "maska";

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
  data: () => {
    return {
      nome: "",
      sobrenome: "",
      celular: "",
    };
  },
  methods: {
    submit() {
      fetch("http://localhost:3000/v1/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: this.nome,
          sobrenome: this.sobrenome,
          celular: this.celular,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped></style>
