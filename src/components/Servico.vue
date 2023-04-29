<template>
  <v-card
    color="grey-lighten-4"
    flat
    rounded="0"
    width="80%"
    class="mx-auto mt-5"
  >
    <v-toolbar density="compact">
      <v-toolbar-title>Serviço</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-card-text>
        <!-- Botao de pesquisa -->
        <v-text-field
          :loading="loading.searchable"
          density="compact"
          variant="underlined"
          label="Pesquisar"
          append-inner-icon="mdi-magnify"
          single-line
          clearable
          hide-details
          @click:clear="loadServicos"
          @input="(event: any) => searchInput(event.target.value)"
        ></v-text-field>
      </v-card-text>
      <!-- Botão de criar -->
      <v-btn
        icon
        @click="
          () => {
            dialogCreate = !dialogCreate;
          }
        "
      >
        <v-icon>mdi-plus-box-outline</v-icon>
        <v-tooltip activator="parent" location="bottom">Adicionar</v-tooltip>
      </v-btn>
    </v-toolbar>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Descricao</th>
          <th class="text-left">Valor</th>
          <th class="text-left">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in servicos" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.descricao }}</td>
          <td>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(item.valor))
            }}
          </td>
          <td>
            <v-btn
              icon
              variant="text"
              density="compact"
              @click="openEditDialog(item)"
            >
              <v-icon>mdi-pencil-outline</v-icon>
              <v-tooltip activator="parent" location="bottom">Editar</v-tooltip>
            </v-btn>
            <v-btn
              icon
              variant="text"
              density="compact"
              @click="deleteClient(item.id)"
            >
              <v-icon>mdi-delete-outline</v-icon>
              <v-tooltip activator="parent" location="bottom"
                >Excluir</v-tooltip
              >
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-dialog v-model="dialogCreate">
    <v-card class="w-50 mx-auto mt-12">
      <v-form class="w-100">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="servicoDialog.nome"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="servicoDialog.descricao"
                label="Descricao"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="servicoDialog.valor"
                label="Valor"
                required
                prefix="R$"
                type="number"
                step="0.01"
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
  </v-dialog>
  <v-snackbar v-model="alert.isActive" :timeout="2000" location="top right">
    <!-- <template >
        <v-btn class="ma-2" v-bind="props">open</v-btn>
      </template> -->

    {{ alert.message }}
  </v-snackbar>
</template>

<script lang="ts">
export default {
  mounted() {
    this.loadServicos();
  },
  data: () => ({
    servicos: [] as any,
    loading: {
      searchable: false,
      tableData: false,
      creating: false,
    },
    dialogCreate: false,
    servicoDialog: {
      id: null,
      nome: "",
      descricao: "",
      valor: "",
    },
    alert: {
      message: "",
      isActive: false,
    },
  }),
  methods: {
    //Função para pesquisar no backend
    searchInput(text: string) {
      if (text.length > 3) {
        console.log(text);
        this.loading.searchable = true;
        fetch(`http://localhost:3000/v1/servico?nome=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            console.log("DATA:.....", data);
            this.servicos = data;
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      } else if (text.length == 0) {
        this.loadServicos();
      }
    },
    loadServicos() {
      this.loading.searchable = false;
      // this.servicos = [
      //   {
      //     id: 1,
      //     nome: "nome_1",
      //     sobrenome: "sobrenome_1",
      //     celular: "10000000000",
      //     created_at: "2023-04-16T12:22:37.534Z",
      //     updated_at: "2023-04-16T12:30:40.374Z",
      //   },
      //   {
      //     id: 2,
      //     nome: "Teste_1",
      //     sobrenome: "Teste",
      //     celular: "10000000001",
      //     created_at: "2023-04-16T14:55:44.864Z",
      //     updated_at: "2023-04-16T14:55:44.864Z",
      //   },
      // ];
      fetch("http://localhost:3000/v1/servico")
        .then((response) => response.json())
        .then((data) => {
          this.servicos = data;
        });
    },

    // },
    submit() {
      this.loading.creating = true;
      const url =
        "http://localhost:3000/v1/servico" +
        (this.servicoDialog.id ? "/" + this.servicoDialog.id : "");
      const method = this.servicoDialog.id ? "PUT" : "POST";
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: this.servicoDialog.nome,
          descricao: this.servicoDialog.descricao,
          valor: this.servicoDialog.valor,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.alert.message = "Servico salvo com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          this.alert.message = "Erro ao salvar servico! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.creating = false;
          this.dialogCreate = false;
          this.servicoDialog = {
            id: null,
            nome: "",
            descricao: "",
            valor: "",
          };
          this.loadServicos();
        });
    },
    deleteClient(servicoId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/servico/" + servicoId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Servico excluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao excluir servico! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadServicos();
        });
    },
    openEditDialog(servicoInfo: any) {
      this.servicoDialog = servicoInfo;
      this.dialogCreate = true;
    },
  },
};
</script>
