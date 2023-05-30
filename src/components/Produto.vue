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
          <td>{{ item.nome }}</td>
          <td>{{ item.fornecedor.empresa }}</td>
          <td>{{ item.volume }}</td>
          <td>{{ item.unMedida }}</td>
          <td> {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(item.valor))
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
                  v-model="selectFornecedor"
                  label="Fornecedor"
                  :items="Fornecedores"
                  item-title="empresa"
                  item-value="descricao"
                  DescricaoFornecedor="Descricao"
                  :rules="[value => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select>
            </v-col>
            <v-col cols="12" md="7">
              <!--<v-card
                class="mx-auto"
                width="400"
              >
                <template v-slot:title>
                  This is a title
                </template>

                <v-card-text>
                  This is content
                </v-card-text>
              </v-card>
              -->
              
                <v-textarea
                  counter
                  label="Descrição Fornecedor"
                  :model-value="selectFornecedor.descricao"
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
  <v-dialog v-model="dialogExclusion" style="width: 100vh;" d-flex justify-center persistent >
    <v-card class="table">
        <v-card-title class="text-h5 ">
          <div class="table">Cadastro de Serviço</div>
          
        </v-card-title>
        <v-card-text>Deseja confirmar a exclusão do cadastro selecionado?</v-card-text>
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
            @click="deleteProduto(exclusionId)"
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
    this.loadProduto();
    this.loadFornecedor();
    //console.log(this.Fornecedores)
  },
  data: () => ({
    selectFornecedor: {id: '0',
        empresa: 'Selecione O Fornecedor',
        cnpj: '',
        endereco: '',
        descricao: '-',
        telefone: '',
        email: "",},

    DescricaoFornecedor: '',

    Fornecedores: [
      {id: '0',
        empresa: 'Fornecedor 1',
        cnpj: '',
        endereco: '',
        descricao: 'Fornecedor de Alguma coisa',
        telefone: '',
        email: "",},
      {id: '1',
        empresa: 'Fornecedor 2',
        cnpj: '',
        endereco: '',
        descricao: 'Fornecedor de Outra coisa',
        telefone: '',
        email: "",}
      ],
    
    Produto: [
      {id: '0',
        nome: '',
        volume: '',
        unMedida: '',
        valor: '',
        fornecedor: {id: '0',
          empresa: 'Fornecedor X',
          cnpj: '000.000.00/0001-01',
          endereco: 'Rua a',
          descricao: 'Fornecedor de Outra coisa',
          telefone: '77 00000000',
          email: "venda@fornecedor.com.br",}
      }],
    text: "",
    loading: {
      searchable: false,
      tableData: false,
      creating: false,
    },


    dialogCreate: false,
    dialogExclusion: false,
    confirmExclusion:false,
    exclusionId: '',

    produtoDialog: {
      id: null,
      nome: "",
      volume: "",
      unMedida: "",
      valor: "",
      fornecedorId: null,
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
            console.log("Até aqui file")
            console.log(data);
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
      fetch("http://localhost:3000/v1/produto")
        .then((response) => response.json())
        .then((data) => {
          this.Produto = data;
        });
        
    },
    loadFornecedor() {
      //this.loading.searchable = false;
      
      fetch("http://localhost:3000/v1/fornecedor")
        .then((response) => response.json())
        .then((data) => {
          this.Fornecedores = data;
          //item = JSON.parse(JSON.stringify(item))
          //this.Fornecedores = JSON.parse(JSON.stringify(this.Fornecedores));
          //console.log(this.Fornecedores)
          
        });
        
    },
    submit() {
      console.log("Pronto para enviar os dados!")
      if (
        this.produtoDialog.nome &&
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
            volume: this.produtoDialog.volume,
            unMedida: this.produtoDialog.unMedida,
            valor: this.produtoDialog.valor,
            fornecedorID: this.selectFornecedor.id
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
              volume: "",
              unMedida: "",
              valor: "",
              fornecedorId: null,
            };
            this.loadProduto();
          });
      } else {
        this.dialogCreate = true;
        console.log("Operacao não executada!")
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
          this.dialogExclusion = false;
        });
    },
    openEditDialog(produtoInfo: any) {
      this.produtoDialog = produtoInfo;
      this.dialogCreate = true;
    },
    openConfirmExclusion(servicoId: string){
      this.exclusionId = servicoId;
      this.dialogExclusion = true;
    },
  } 
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
