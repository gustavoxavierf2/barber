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
      <v-toolbar-title class="tableTitle">Agendamento</v-toolbar-title> <!-- Titulo do Tabela -->

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
          @click:clear="loadAgendamentos()"
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
          <th class="text-left"><div class="tableColumns">Cliente</div></th>
          <th class="text-left"><div class="tableColumns">Telefone</div></th>
          <th class="text-left"><div class="tableColumns">Funcionario</div></th>
          <th class="text-left"><div class="tableColumns">Serviço</div></th>
          <th class="text-left"><div class="tableColumns">Data/Hora</div></th>
          <th class="text-left"><div class="tableColumns">Status</div></th>
          <th class="text-left"><div class="tableColumns">Ação</div></th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr v-for="item in Agendamentos" :key="item.id">
          <td>{{ item.cliente.nome }}</td>
          <td>{{ item.cliente.celular}}</td>
          <td>{{ item.funcionario.nome}}</td>
          <td>{{ item.servico.nome}}</td>
          <td>{{ item.data }}</td>
          <td>{{ item.status }}</td>
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
            <v-col cols="8">
                <v-select
                  v-model="selectCliente"
                  label="Cliente"
                  :items="Clientes"
                  item-title="nome"
                  :rules="[value => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-select
                  v-model="selectFuncionario"
                  label="Funcionario"
                  :items="Funcionarios"
                  item-title="nome"
                  :rules="[value => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-select
                  v-model="selectServico"
                  label="Serviço"
                  :items="Servicos"
                  item-title="nome"
                  :rules="[value => !!value || 'Campo Obrigatório']"
                  variant="outlined"
                  return-object
                ></v-select>
            </v-col>
          </v-row>
          <v-row>

            <v-col cols="12" md="4"  >
                <v-card class="textField" >
                  <input type="date" name="Data" class="textField" v-model="agendamentoDialog.data"
                   min="2018-06-01" max="2023-12-31">
                </v-card>
                
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="textField">
                <input type="time" id="appt" name="appt" class="textField"
                    min="08:00" max="19:00" required v-model="agendamentoDialog.horario">
              </v-card>
              
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
  <v-dialog v-model="dialogExclusion" style="width: 100vh;" d-flex justify-center persistent >
    <v-card class="table">
        <v-card-title class="text-h5 ">
          <div class="table">Cadastro de agendamento</div>
          
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
    this.loadAgendamentos();
    this.loadClientes();
    this.loadFuncionarios();
    this.loadServicos();
    //console.log(this.Fornecedores)
  },
  data: () => ({
    selectCliente: {
      id: "0",
      nome: "Selecione o Cliente",
      sobrenome: "",
      celular: "",
    },

    selectFuncionario: {
        id: '0',
        nome: 'Selecione o Funcionario',
        sobrenome: '',
        celular: '',
        cpf: '',
        endereco: '',
        rg: "",
        salario: 0,
        setor: '',
    },

    selectServico: {
      id: "0",
      nome: 'Selecione o Serviço',
      valor: 0,
      descricao: ''
      },

    Clientes: [
      { 
      id: "0",
      nome: "Selecione o Cliente",
      sobrenome: "",
      celular: "",
        },
      ],
    Funcionarios: [
      {
        id: '0',
        nome: 'Selecione o Funcionario',
        sobrenome: '',
        celular: '',
        cpf: '',
        endereco: '',
        rg: "",
        salario: 0,
        setor: '',
      }
    ],
    Servicos: [
      {
      id: "0",
      nome: 'Selecione o Serviço',
      valor: 0,
      descricao: ''
      }
    ],
    
    Agendamentos: [
      {id: '0',
        data: null,
        descricao: "",
        horario: "",
        status: "",
        cliente: {
          id: "0",
          nome: "",
          sobrenome: "",
          celular: "",
        },
        funcionario: {
          id: '0',
          nome: '',
          sobrenome: '',
          celular: '',
          cpf: '',
          endereco: '',
          rg: "",
          salario: 0,
          setor: '',
        },
        servico: {
          id: "0",
          nome: '',
          valor: 0,
          descricao: ''
        },
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

    agendamentoDialog: {
      id: null,
      data: null,
      descricao: "",
      horario: "",
      cliente_id: null,
      funcionario_id: null,
      servico_id: null,
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
        this.loadAgendamentos();
      } else {
        fetch(`http://localhost:3000/v1/agendamento?nome=${text}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.Agendamentos = data;
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }
      this.loading.searchable = true;
    },
    loadAgendamentos() {
      this.loading.searchable = false;
      fetch("http://localhost:3000/v1/agendamento")
        .then((response) => response.json())
        .then((data) => {
          this.Agendamentos = data;
        });
        
    },
    loadClientes() {
      //this.loading.searchable = false;
      fetch("http://localhost:3000/v1/client")
        .then((response) => response.json())
        .then((data) => {
          this.Clientes = data;
        });        
    },
    loadFuncionarios() {
      //this.loading.searchable = false;
      fetch("http://localhost:3000/v1/funcionario")
        .then((response) => response.json())
        .then((data) => {
          this.Funcionarios = data;
        });        
    },
    loadServicos() {
      //this.loading.searchable = false;
      fetch("http://localhost:3000/v1/servico")
        .then((response) => response.json())
        .then((data) => {
          this.Servicos = data;
        });        
    },
    submit() {
      //console.log("Pronto para enviar os dados!")
      if (
        this.agendamentoDialog.descricao &&
        this.agendamentoDialog.data &&
        this.agendamentoDialog.horario
      ) {
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
            nome: this.agendamentoDialog.data,
            volume: this.agendamentoDialog.descricao,
            unMedida: this.agendamentoDialog.horario,
            cliente_id: this.selectCliente.id,
            funcionario_id: this.selectFuncionario.id,
            servico_id: this.selectServico.id
          }),
        })
          .then((response) => response.json())
          .then((data) => {
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
        console.log("Operacao não executada!")
      }
    },
    deleteProduto(agendamentoId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/produto/" + agendamentoId, {
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
    openEditDialog(agendamentoInfo: any) {
      this.agendamentoDialog = agendamentoInfo;
      this.dialogCreate = true;
    },
    openConfirmExclusion(agendamentoId: string){
      this.exclusionId = agendamentoId;
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
