<template>
<div>  
  <v-card
    color="grey-lighten-4"
    flat
    rounded="0"
    width="80%"
    class="mx-auto mt-5"
  >
    <v-toolbar density="compact" class="table">
      <v-toolbar-title class="tableTitle">Serviço</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-card-text>
        <!-- Botao de pesquisa -->
        <v-text-field
          v-model="text"
          :loading="loading.searchable"
          density="compact"
          variant="underlined"
          label="Pesquisar"
          append-inner-icon="mdi-magnify"
          single-line
          clearable
          hide-details
          @click:clear="loadServicos()"
          @click:append-inner="searchInput(text)"
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
    <v-table class="contentTable">
      <thead class="tableHead">
        <tr>
          <th class="text-left"><div class="tableColumns">Nome</div></th>
          <th class="text-left"><div class="tableColumns">Descricao</div></th>
          <th class="text-left"><div class="tableColumns">Valor</div></th>
          <th class="text-left"><div class="tableColumns">Ação</div></th>
        </tr>
      </thead>
      <tbody class="tableBody">
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
    <v-card class="w-50 mx-auto mt-12 table">
      <v-form class="w-100" @submit.prevent>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="servicoDialog.nome"
                label="Nome"
                :rules="[value => !!value || 'Campo Obrigatório']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="servicoDialog.descricao"
                label="Descricao"
                :rules="[value => !!value || 'Campo Obrigatório']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="servicoDialog.valor"
                label="Valor"
                :rules="[value => !!value || 'Campo Obrigatório']"
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
    {{ alert.message }}
  </v-snackbar>
</div>
</template>

<script lang="ts">
export default {
  mounted() {
    this.loadServicos();
  },
  data: () => ({
    /*
    nomeRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],
    descricaoRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],
    valorRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],
    */
    servicos: [{
        id: "0",
        nome: '',
        valor: 0,
        descricao: ''
        }],
    text: "",
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
      if (text.length == 0 || text == null) {
        this.loadServicos();
      } else {
        fetch(`http://localhost:3000/v1/servico?nome=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;

            this.servicos = data;
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }
      this.loading.searchable = true;
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
      if (
        this.servicoDialog.nome &&
        this.servicoDialog.descricao &&
        this.servicoDialog.valor
      ) {
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
      } else {
        this.dialogCreate = true;
      }
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

<style scoped>
.table {
  background-color: #434342;
  background-size: cover;
  font-family: "Eczar SemiBold";
  color: white;
}

.tableTitle {
  font-size: 25px;
  font-weight: bold;
}

.tableColumns {
  color: white;
  font-family: "Eczar SemiBold";
  opacity: 80%;
  font-weight: bold;
  font-size: 17px;
}

.tableHead {
  background-color: #1c1c1c;
}

.tableBody {
  background-color: #1c1c1c;
  color: white;
}
</style>
