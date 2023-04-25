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
    clientes: [
      {
        id: 1,
        nome: "nome_1",
        sobrenome: "sobrenome_1",
        celular: "10000000000",
        created_at: "2023-04-16T12:22:37.534Z",
        updated_at: "2023-04-16T12:30:40.374Z",
      },
      {
        id: 2,
        nome: "Teste_1",
        sobrenome: "Teste",
        celular: "10000000001",
        created_at: "2023-04-16T14:55:44.864Z",
        updated_at: "2023-04-16T14:55:44.864Z",
      },
    ],
  }),
  methods: {
    // loadClientes() {
    //   fetch("http://localhost:3000/v1/client")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       this.clientes = data;
    //     });
    // },
  },
};
</script>
<style></style>
