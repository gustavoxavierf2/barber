<template>
  <v-card
    color="grey-lighten-4"
    flat
    rounded="0"
    width="80%"
    class="mx-auto mt-5"
  >
    <v-toolbar density="compact" class="table">
      <v-toolbar-title class="tableTitle">Cliente</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-card-text>
        <v-text-field
          :loading="loading.searchable"
          v-model="text"
          density="compact"
          variant="underlined"
          label="Pesquisar"
          append-inner-icon="mdi-magnify"
          single-line
          clearable
          hide-details
          @click:clear="loadClientes"
          @click:append-inner="searchInput(text)"
        ></v-text-field>
      </v-card-text>

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
          <th class="text-left"><div class="tableColumns">Sobrenome</div></th>
          <th class="text-left"><div class="tableColumns">Celular</div></th>
          <th class="text-left"><div class="tableColumns">Ação</div></th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr v-for="item in clientes" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.sobrenome }}</td>
          <td>{{ item.celular }}</td>
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
    <v-card class="w-50 mx-auto mt-12 table" >
      <v-form class="w-100" fast-fail @submit.prevent>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="clientDialog.nome"
                label="Nome"
                :rules="nomeRule"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="clientDialog.sobrenome"
                label="Sobrenome"
                :rules="sobrenomeRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="clientDialog.celular"
                label="Celular"
                :rules="celularRule"
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
    this.loadClientes();
  },
  data: () => ({
  nomeRule: [
        value => {
          if (value) return true

          return 'Campo Obrigatório'}
  ],
        sobrenomeRule: [
        value => {
          if (value) return true

          return 'Campo Obrigatório'}
        ],
        celularRule: [
        value => {
          if (value) return true

          return 'Campo Obrigatório'}
        ],
    clientes: [] as any,
    text: "",
    loading: {
      searchable: false,
      tableData: false,
      creating: false,
    },
    dialogCreate: false,
    clientDialog: {
      id: null,
      nome: "",
      sobrenome: "",
      celular: "",
    },
    alert: {
      message: "",
      isActive: false,
    },
  }),
  methods: {
    searchInput(text: string) {
      //if (text.length > 3) {
        console.log(text);
        if(text.length == 0 || text == null){
          this.loadClientes();
        }else{
          
          fetch(`http://localhost:3000/v1/client?nome=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.clientes = data;
          })
          .finally(() => {
            this.loading.searchable = true;
          });
        }
        //this.loading.searchable = true;
    },
    loadClientes() {
      this.loading.searchable = false;
      // this.clientes = [
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
      fetch("http://localhost:3000/v1/client")
        .then((response) => response.json())
        .then((data) => {
          this.clientes = data;
        });
    },

    // },
    submit() {
      if(this.clientDialog.nome && this.clientDialog.sobrenome && this.clientDialog.celular){
        this.loading.creating = true;
      const url =
        "http://localhost:3000/v1/client" +
        (this.clientDialog.id ? "/" + this.clientDialog.id : "");
      const method = this.clientDialog.id ? "PUT" : "POST";
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: this.clientDialog.nome,
          sobrenome: this.clientDialog.sobrenome,
          celular: this.clientDialog.celular,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.alert.message = "Cliente salvo com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          this.alert.message = "Erro ao salvar cliente! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.creating = false;
          this.dialogCreate = false;
          this.clientDialog = {
            id: null,
            nome: "",
            sobrenome: "",
            celular: "",
          };
          this.loadClientes();
        });
      }

      
    },
    deleteClient(clientId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/client/" + clientId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Cliente excluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao excluir cliente! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadClientes();
        });
    },
    openEditDialog(clientInfo: any) {
      this.clientDialog = clientInfo;
      this.dialogCreate = true;
    },
  },
};
</script>

<style scoped>
.table{
  background-color:#434342; 
  background-size: cover;
  font-family: "Eczar SemiBold";
  color:white;
}

.tableTitle{
  font-size: 25px;
  font-weight: bold;
}

.tableColumns{
  color:white;
  font-family: "Eczar SemiBold";
  opacity:80%;
  font-weight: bold;
  font-size: 17px
}

.tableHead{
  background-color:#1C1C1C
}

.tableBody{
  background-color:#1C1C1C;
  color:white
}
</style>