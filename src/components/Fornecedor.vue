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
        <v-toolbar-title class="tableTitle">Fornecedor</v-toolbar-title>
        <!-- Titulo do Tabela -->

        <v-spacer></v-spacer>

        <v-card-text>
          <!-- Botao de pesquisa :loading="loading.searchable" -->
          <v-text-field
            v-model="text"
            density="compact"
            variant="underlined"
            label="Pesquisar"
            append-inner-icon="mdi-magnify"
            single-line
            clearable
            hide-details
            @click:clear="loadFornecedor()"
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
            <th class="text-left"><div class="tableColumns">Empresa</div></th>
            <th class="text-left"><div class="tableColumns">CNPJ</div></th>
            <th class="text-left"><div class="tableColumns">Endereço</div></th>
            <th class="text-left"><div class="tableColumns">Descrição</div></th>
            <th class="text-left"><div class="tableColumns">Telefone</div></th>
            <th class="text-left"><div class="tableColumns">Email</div></th>
            <th class="text-left"><div class="tableColumns">Ação</div></th>
          </tr>
        </thead>
        <tbody class="tableBody">
          <tr v-for="item in Fornecedor" :key="item.id">
            <td>{{ item.empresa }}</td>
            <td>{{ item.cnpj }}</td>
            <td>{{ item.endereco }}</td>
            <td>{{ item.descricao }}</td>
            <td>{{ item.telefone }}</td>
            <td>{{ item.email }}</td>
            <td>
              <v-btn
                icon
                variant="text"
                density="compact"
                @click="openEditDialog(item)"
              >
                <v-icon>mdi-pencil-outline</v-icon>
                <v-tooltip activator="parent" location="bottom"
                  >Editar</v-tooltip
                >
              </v-btn>
              <v-btn
                icon
                variant="text"
                density="compact"
                @click="openConfirmExclusion(item.id)"
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
        <v-toolbar-title class="titleDialog">
          <div class="spaceBetween">
            <div>Criar Fornecedor</div>

            <v-btn
              color="red-darken-1"
              variant="text"
              @click="
                () => {
                  dialogCreate = !dialogCreate;
                }
              "
            >
              Fechar
            </v-btn>
          </div>
        </v-toolbar-title>
        <v-form class="w-100" @submit.prevent>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="textField"
                  v-model="fornecedorDialog.empresa"
                  label="Empresa"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  class="textField"
                  v-model="fornecedorDialog.cnpj"
                  label="CNPJ"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="textField"
                  v-model="fornecedorDialog.endereco"
                  label="Endereço"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="textField"
                  v-model="fornecedorDialog.descricao"
                  label="Descrição"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  class="textField"
                  v-model="fornecedorDialog.telefone"
                  label="Telefone"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="textField"
                  v-model="fornecedorDialog.email"
                  label="Email"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" mx="auto">
                <v-btn
                  type="submit"
                  @click="submit()"
                  block
                  class="mt-2 mx-auto"
                  >Salvar</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogExclusion"
      style="width: 100vh"
      d-flex
      justify-center
      persistent
    >
      <v-card class="table">
        <v-card-title class="text-h5">
          <div class="table">Cadastro de Fornecedor</div>
        </v-card-title>
        <v-card-text
          >Deseja confirmar a exclusão do cadastro selecionado?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialogExclusion = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red-darken-1"
            variant="text"
            @click="deleteFornecedor(exclusionId)"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
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
    this.loadFornecedor();
  },
  data: () => ({
    Fornecedor: [
      {
        id: "0",
        empresa: "",
        cnpj: "",
        endereco: "",
        descricao: "",
        telefone: "",
        email: "",
      },
    ],
    FornecedorAux: [] as any,
    text: "",
    loading: {
      searchable: false,
      tableData: false,
      creating: false,
    },
    dialogCreate: false,
    dialogExclusion: false,
    confirmExclusion: false,
    exclusionId: "",
    fornecedorDialog: {
      id: null,
      empresa: "",
      cnpj: "",
      endereco: "",
      descricao: "",
      telefone: "",
      email: "",
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
        this.loadFornecedor();
      } else {
        fetch(`http://localhost:3000/v1/fornecedor?empresa=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.Fornecedor = data;
            if (data.length == 0) {
              this.loadFornecedorBYId(text);
            }
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }
      this.loading.searchable = true;
    },
    loadFornecedorBYId(input: String) {
      if (this.Fornecedor.length === 0) {
        fetch(`http://localhost:3000/v1/fornecedor?cnpj=${input}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.Fornecedor = data;
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }
    },

    loadFornecedor() {
      this.loading.searchable = false;

      fetch("http://localhost:3000/v1/fornecedor")
        .then((response) => response.json())
        .then((data) => {
          this.Fornecedor = data;
        });
    },
    submit() {
      if (
        this.fornecedorDialog.empresa &&
        this.fornecedorDialog.cnpj &&
        this.fornecedorDialog.descricao &&
        this.fornecedorDialog.endereco &&
        this.fornecedorDialog.email &&
        this.fornecedorDialog.telefone
      ) {
        this.loading.creating = true;
        const url =
          "http://localhost:3000/v1/fornecedor" +
          (this.fornecedorDialog.id ? "/" + this.fornecedorDialog.id : "");
        const method = this.fornecedorDialog.id ? "PUT" : "POST";
        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            empresa: this.fornecedorDialog.empresa,
            cnpj: this.fornecedorDialog.cnpj,
            endereco: this.fornecedorDialog.endereco,
            descricao: this.fornecedorDialog.descricao,
            telefone: this.fornecedorDialog.telefone,
            email: this.fornecedorDialog.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            this.alert.message = "Fornecedor salvo com sucesso!";
            this.alert.isActive = true;
          })
          .catch((error) => {
            this.alert.message = "Erro ao salvar Fornecedor! Tente novamente.";
            this.alert.isActive = true;
          })
          .finally(() => {
            this.loading.creating = false;
            this.dialogCreate = false;
            this.fornecedorDialog = {
              id: null,
              empresa: "",
              cnpj: "",
              endereco: "",
              descricao: "",
              telefone: "",
              email: "",
            };
            this.loadFornecedor();
          });
      } else {
        this.dialogCreate = true;
      }
    },
    deleteFornecedor(fornecedorId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/fornecedor/" + fornecedorId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Fornecedor excluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao excluir Fornecedor! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadFornecedor();
          this.dialogExclusion = false;
        });
    },
    openEditDialog(fornecedorInfo: any) {
      this.fornecedorDialog = fornecedorInfo;
      this.dialogCreate = true;
    },
    openConfirmExclusion(servicoId: string) {
      this.exclusionId = servicoId;
      this.dialogExclusion = true;
    },
  },
};
</script>

<style scoped>
.textField {
  background-color: rgb(83, 83, 83);
  border-radius: 5px;
  color: white;
}

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

.dataHora {
  display: flex;
  justify-content: center;
  margin: 8px;
}

.titleDialog {
  font-size: 25px;
  font-weight: bold;
  background-color: #2c2c2c;
  padding: 10px;
}

.spaceBetween {
  display: flex;
  justify-content: space-between;
}
</style>
