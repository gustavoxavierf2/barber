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
        <v-toolbar-title class="tableTitle">Compra</v-toolbar-title>
        <!-- Titulo do Tabela -->

        <v-spacer></v-spacer>

        <v-card-text>
          <!-- Botao de pesquisa :loading="loading.searchable" -->
          <v-text-field
            v-model="text"
            density="compact"
            variant="underlined"
            label="Pesquisar Compra"
            append-inner-icon="mdi-magnify"
            single-line
            clearable
            hide-details
            @click:clear="loadCompras()"
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
            <th class="text-left"><div class="tableColumns">Produto</div></th>
            <th class="text-left"><div class="tableColumns">Fornecedor</div></th>
            <th class="text-left"><div class="tableColumns">Quantidade</div></th>
            <th class="text-left"><div class="tableColumns">Data/Hora</div></th>
            <th class="text-left"><div class="tableColumns">Valor</div></th>
            <th class="text-left"><div class="tableColumns">Ação</div></th>
          </tr>
        </thead>
        <tbody class="tableBody">
          <tr v-for="item in Compras" :key="item.id">
            <td>{{ item.produto.nome }}</td>
            <td>{{ item.produto.fornecedor.empresa }}</td>
            <td>{{ item.quantidade }}</td>
            <td>{{ formateDate(item.dataCompra)}}</td>
            <td>{{ item.valor }}</td>
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
            <div>Criar Compra</div>

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
              <v-col cols="8">
                <v-select
                  v-model="selectProduto"
                  label="Produto"
                  :items="Produtos"
                  item-title="nome"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-textarea
                  counter
                  label="Nome Fornecedor"
                  :model-value="selectProduto.fornecedor.empresa"
                  rows="2"
                ></v-textarea>
                <!--/<v-select
                  v-model="selectFornecedor"
                  label= "Fornecedor" 
                  :items= "Fornecedores"
                  item-title="empresa"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="compraDialog.quantidade"
                  label="Quantidade (*)"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                  :counter="10"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="compraDialog.valor"
                  label="Valor (*)"
                  :rules="[(value) => !!value || 'Campo Obrigatório']"
                  :counter="10"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-card class="textField">
                  <div class="dataHora">
                    <input
                      type="date"
                      name="Data"
                      class="textField"
                      v-model="compraDialog.data"
                      min="2018-06-01"
                      max="2023-12-31"
                    />
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="4" mx="auto">
                <v-btn
                  type="submit"
                  @click="submit()"
                  block
                  class="mt-1 mx-auto"
                  >Salvar</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
             
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
          <div class="table">Cadastro de Compra</div>
        </v-card-title>
        <v-card-text
          >Deseja confirmar a exclusão do compra realizada?</v-card-text
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
import { DateTime } from "luxon";
export default {
  mounted() {
    this.loadCompras();
    this.loadProdutos();
    //this.loadFuncionarios();
    //this.loadServicos();
    //console.log(this.Fornecedores)
  },
  data: () => ({
    selectFornecedor: {
      id: "0",
      empresa: "Selecione o Fornecedor",
      cnpj: "",
      endereco: "",
      descricao: "",
      telefone: "",
      email: "",
    },
    selectProduto:{
      id: null,
      nome: "Selecione o Produto",
      volume: "",
      unMedida: "",
      valor: "",
      fornecedor: {
          id: "0",
          empresa: "Fornecedor X",
          cnpj: "000.000.00/0001-01",
          endereco: "Rua a",
          descricao: "Fornecedor de Outra coisa",
          telefone: "77 00000000",
          email: "venda@fornecedor.com.br",
        }
    },

    Produtos: [
      {
      id:"0",
      volume: "",
      unMedida: "",
      valor: "",
      fornecedor: {
        id: "0",
        empresa: "",
        cnpj: "",
        endereco: "",
        descricao: "",
        telefone: "",
        email: "",
      },
      },
    ],
    Fornecedores: [
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

    Compras: [
      {
        id: "0",
        data: null,
        valor: null,
        quantidade: null,
        dataCompra: null,
        produto: {
          id: null,
          nome: "Selecione o Produto",
          volume: "",
          unMedida: "",
          valor: "",
          fornecedor: {
            id: "0",
            empresa: "Fornecedor X",
            cnpj: "000.000.00/0001-01",
            endereco: "Rua a",
            descricao: "Fornecedor de Outra coisa",
            telefone: "77 00000000",
            email: "venda@fornecedor.com.br",
           }
        },
      },
    ],

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

    compraDialog: {
      id: null,
      data: null,
      quantidade: "",
      valor: "",
      produto_id: null,
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
        this.loadCompras();
      } else {
        fetch(`http://localhost:3000/v1/compra?nome=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.Compras = data;
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }
      this.loading.searchable = true;
    },
    loadCompras() {
      this.loading.searchable = false;
      fetch("http://localhost:3000/v1/Compra")
        .then((response) => response.json())
        .then((data) => {
          this.Compras = data;
        });
    },
    loadFornecedores() {
      //this.loading.searchable = false;
      fetch("http://localhost:3000/v1/fornecedor")
        .then((response) => response.json())
        .then((data) => {
          this.Clientes = data;
        });
    },
    loadProdutos() {
      this.loading.searchable = false;
      fetch("http://localhost:3000/v1/produto")
        .then((response) => response.json())
        .then((data) => {
          this.Produtos = data;
        });
    },



    submit() {
      //console.log("Pronto para enviar os dados!")
      if (this.agendamentoDialog.data && this.agendamentoDialog.horario) {
        this.loading.creating = true;
        const url =
          "http://localhost:3000/v1/agendamento" +
          (this.agendamentoDialog.id ? "/" + this.agendamentoDialog.id : "");
        const method = this.agendamentoDialog.id ? "PUT" : "POST";
        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: this.agendamentoDialog.descricao,
            horario: this.agendamentoDialog.horario,
            cliente_id: this.selectCliente.id,
            funcionario_id: this.selectFuncionario.id,
            servico_id: this.selectServico.id,
            data: DateTime.fromISO(this.agendamentoDialog.data).toFormat(
              "MM-dd-yyyy"
            ),
            status: "Agendado",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.alert.message = "Agendamento salvo com sucesso!";
            this.alert.isActive = true;
          })
          .catch((error) => {
            this.alert.message = "Erro ao salvar Agendamento! Tente novamente.";
            this.alert.isActive = true;
          })
          .finally(() => {
            this.loading.creating = false;
            this.dialogCreate = false;
            this.agendamentoDialog = {
              id: null,
              data: null,
              descricao: "",
              horario: "",
              cliente_id: null,
              funcionario_id: null,
              servico_id: null,
            };
            this.loadAgendamentos();
          });
      } else {
        this.dialogCreate = true;
        console.log("Operacao não executada!");
      }
    },
    deleteProduto(agendamentoId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/agendamento/" + agendamentoId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Agendamento excluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao excluir Agendamento! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadAgendamentos();
          this.dialogExclusion = false;
        });
    },
    concluirAgendamento(agendamento) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/agendamento/" + agendamento.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: agendamento.descricao,
          horario: agendamento.horario,
          cliente_id: agendamento.cliente_id,
          funcionario_id: agendamento.funcionario_id,
          servico_id: this.selectServico.servico_id,
          data: DateTime.fromISO(agendamento.data).toFormat("MM-dd-yyyy"),
          status: "Concluido",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Agendamento concluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao concluir Agendamento! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadAgendamentos();
        });
    },
    openEditDialog(agendamentoInfo: any) {
      this.agendamentoDialog = agendamentoInfo;
      this.agendamentoDialog.data = DateTime.fromISO(
        agendamentoInfo.data
      ).toFormat("yyyy-MM-dd");
      this.selectServico = agendamentoInfo.servico;
      this.selectFuncionario = agendamentoInfo.funcionario;
      this.selectCliente = agendamentoInfo.cliente;
      this.dialogCreate = true;
    },
    openConfirmExclusion(agendamentoId: string) {
      this.exclusionId = agendamentoId;
      this.dialogExclusion = true;
    },
    formateDate(data: string) {
      return DateTime.fromISO(data).toFormat("dd/MM/yyyy");
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
