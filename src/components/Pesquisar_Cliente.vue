<template>
  <v-table class="w-75 mx-auto mt-12">
    <thead>
      <tr>
        <th class="text-left">Nome</th>
        <th class="text-left">Sobrenome</th>
        <th class="text-left">Celular</th>
        <th class="text-left">Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in clientes" :key="item.id">
        <td>{{ item.nome }}</td>
        <td>{{ item.sobrenome }}</td>
        <td>{{ item.celular }}</td>
        <td>
          <v-btn>Editar</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  mounted() {
    this.loadClientes();
  },
  data: () => ({
    clientes: [],
  }),
  methods: {
    loadClientes() {
      fetch("http://localhost:3000/v1/client")
        .then((response) => response.json())
        .then((data) => {
          this.clientes = data;
        });
    },
  },
};
</script>
