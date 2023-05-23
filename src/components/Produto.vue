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
      <v-toolbar-title class="tableTitle">Produto</v-toolbar-title> <!-- Titulo do Tabela -->

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
          @click:clear="loadProduto()"
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
          <th class="text-left"><div class="tableColumns">Fornecedor</div></th>
          <th class="text-left"><div class="tableColumns">Volume</div></th>
          <th class="text-left"><div class="tableColumns">Un. Medida</div></th>
          <th class="text-left"><div class="tableColumns">Valor</div></th>
          <th class="text-left"><div class="tableColumns">Ação</div></th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr v-for="item in Produto" :key="item.id">
          <td>{{ item.Nome }}</td>
          <td>{{ item.Fornecedor }}</td>
          <td>{{ item.Volume }}</td>
          <td>{{ item.UnMedida }}</td>
          <td> {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(item.Valor))
            }}</td>
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
              @click="deleteProduto(item.id)"
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
                class="textField" 
                v-model="produtoDialog.nome"
                label="Nome"
                :rules="[value => !!value || 'Campo Obrigatório']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5">
              <v-select
                  v-model="select"
                  label="Fornecedor"
                  :items="Fornecedores"
                  item-title="Empresa"
                  item-value="Descricao"
                  DescricaoFornecedor="Descricao"
                  :rules="[value => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select>
            </v-col>
            <v-col cols="12" md="7">
                <v-textarea
                  counter
                  label="Descrição Fornecedor"
                  :model-value="select.Descricao"
                  rows="2"
                  ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                class="textField" 
                v-model="produtoDialog.volume"
                label="Volume"
                :rules="[value => !!value || 'Campo Obrigatório']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="textField" 
                v-model="produtoDialog.unMedida"
                label="Unidade De Medida"
                :rules="[value => !!value || 'Campo Obrigatório']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="textField" 
                v-model="produtoDialog.valor"
                prefix="R$"
                type="number"
                step="0.01"
                label="Valor"

                :rules="[value => !!value || 'Campo Obrigatório']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
    this.loadProduto();
  },
  data: () => ({
    select: {id: '0',
        Empresa: 'Fornecedor 1',
        CNPJ: '',
        Endereco: '',
        Descricao: 'Fornecedor de alguma coisa',
        Telefone: '',
        Email: "",},
    DescricaoFornecedor: '',
    Fornecedores: [{id: '0',
        Empresa: 'Fornecedor 1',
        CNPJ: '',
        Endereco: '',
        Descricao: 'Fornecedor de Outra coisa',
        Telefone: '',
        Email: "",},
        {id: '1',
        Empresa: 'Fornecedor 2',
        CNPJ: '',
        Endereco: '',
        Descricao: 'Fornecedor de Outra coisa',
        Telefone: '',
        Email: "",}
      ],
    Produto: [{id: '0',
        Nome: '',
        Fornecedor: '',
        Volume: '',
        UnMedida: '',
        Valor: '',
      }],
    text: "",
    loading: {
      searchable: false,
      tableData: false,
      creating: false,
    },
    dialogCreate: false,
    produtoDialog: {
      id: null,
      nome: "",
      fornecedor: "",
      volume: "",
      unMedida: "",
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
        this.loadProduto();
      } else {
        fetch(`http://localhost:3000/v1/produto?nome=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;

            this.Produto = data;
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }
      this.loading.searchable = true;
    },
    loadProduto() {
      this.loading.searchable = false;
      // this.Fornecedor = [
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
      
      fetch("http://localhost:3000/v1/produto")
        .then((response) => response.json())
        .then((data) => {
          this.Produto = data;
        });
        
    },

    // },
    submit() {
      if (
        this.produtoDialog.nome &&
        this.produtoDialog.fornecedor &&
        this.produtoDialog.volume &&
        this.produtoDialog.unMedida &&
        this.produtoDialog.valor
      ) {
        this.loading.creating = true;
        const url =
          "http://localhost:3000/v1/produto" +
          (this.produtoDialog.id ? "/" + this.produtoDialog.id : "");
        const method = this.produtoDialog.id ? "PUT" : "POST";
        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: this.produtoDialog.nome,
            cnpj: this.produtoDialog.fornecedor,
            endereco: this.produtoDialog.volume,
            linha: this.produtoDialog.unMedida,
            telefone: this.produtoDialog.valor,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            this.alert.message = "Produto salvo com sucesso!";
            this.alert.isActive = true;
          })
          .catch((error) => {
            this.alert.message = "Erro ao salvar Produto! Tente novamente.";
            this.alert.isActive = true;
          })
          .finally(() => {
            this.loading.creating = false;
            this.dialogCreate = false;
            this.produtoDialog = {
              id: null,
              nome: "",
              fornecedor: "",
              volume: "",
              unMedida: "",
              valor: "",
            };
            this.loadProduto();
          });
      } else {
        this.dialogCreate = true;
      }
    },
    deleteProduto(produtoId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/produto/" + produtoId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Produto excluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao excluir Produto! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadProduto();
        });
    },
    openEditDialog(produtoInfo: any) {
      this.produtoDialog = produtoInfo;
      this.dialogCreate = true;
    },
  },
};
</script>

<style scoped>
.textField{
  background-color:rgb(83, 83, 83); 
  border-radius: 5px;
  color:white;
  
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
</style>
