<template>
  <v-card
    color="grey-lighten-4"
    flat
    rounded="0"
    width="95%"
    class="mx-auto mt-5"
  >
    <v-toolbar density="compact" class="table">
      <v-toolbar-title class="tableTitle">Funcionário</v-toolbar-title>

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
          @click:clear="loadFuncionarios"
          @click:append-inner="searchInput(text)"
        >
        </v-text-field>
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
          <th class="text-left"><div class="tableColumns">CPF</div></th>
          <th class="text-left"><div class="tableColumns">Endereço</div></th>
          <th class="text-left"><div class="tableColumns">RG</div></th>
          <th class="text-left"><div class="tableColumns">Salário</div></th>
          <th class="text-left"><div class="tableColumns">Setor</div></th>
          <th class="text-left"><div class="tableColumns">Ação</div></th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr v-for="item in funcionarios" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.sobrenome }}</td>
          <td>{{ item.celular }}</td>
          <td>{{ item.cpf }}</td>
          <td>{{ item.endereco }}</td>
          <td>{{ item.rg }}</td>
          <td>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(item.salario))
            }}
          </td>
          <td>{{ item.setor }}</td>
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
                v-model="funcionarioDialog.nome"
                label="Nome"
                :rules="nomeRule"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="funcionarioDialog.sobrenome"
                label="Sobrenome"
                :rules="sobrenomeRule"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="funcionarioDialog.celular"
                label="Celular"
                :rules="celularRule"
                :counter="11"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="funcionarioDialog.cpf"
                label="CPF"
                :rules="cpfRule"
                :counter="11"
              ></v-text-field>
              <v-text-field
                v-model="funcionarioDialog.endereco"
                label="Endereco"
                :rules="enderecoRule"
                :counter="11"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="funcionarioDialog.rg"
                label="RG"
                :rules="rgRule"
                :counter="10"
              ></v-text-field>
              <v-text-field
                v-model="funcionarioDialog.salario"
                label="Salário"
                :rules="salarioRule"
                type="number"
                prefix="R$"
                step="0.01"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="funcionarioDialog.setor"
                label="Setor"
                :rules="setorRule"
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
    this.loadFuncionarios();
  },
  data: () => ({
    nomeRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],
    sobrenomeRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],

    celularRule: [
      (value) => {
        if (!value) return "Campo Obrigatório";
        if (value.length != 11 || !new RegExp(/[0-9]{11}/).test(value))
          return "Celular inválido";
        return true;
      },
    ],

    cpfRule: [
      (value) => {
        if (!value) "Campo Obrigatório";
        if (
          value.length < 11 ||
          value.length > 11 ||
          !new RegExp(/[0-9]{11}/).test(value)
        )
          return "CPF inválido";
        return true;
      },
    ],

    enderecoRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],

    rgRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],

    salarioRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],

    setorRule: [
      (value) => {
        if (value) return true;
        return "Campo Obrigatório";
      },
    ],

    funcionarios: [] as any,
    text: "",
    loading: {
      searchable: false,
      tableData: false,
      creating: false,
    },
    dialogCreate: false,
    funcionarioDialog: {
      id: null,
      nome: "",
      sobrenome: "",
      celular: "",
      cpf: "",
      endereco: "",
      rg: "",
      salario: null,
      setor: "",
    },
    alert: {
      message: "",
      isActive: false,
    },
  }),
  methods: {
    searchInput(text: string) {
      console.log(text);
      if (text.length == 0 || text == null) {
        this.loadFuncionarios();
      } else {
        let url = "http://localhost:3000/v1/funcionario";
        if (new RegExp(/[0-9]{11}/).test(text)) {
          url += `?cpf=${this.text}`;
        } else {
          url += `?nome=${this.text}`;
        }
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.funcionarios = data;
            console.log(data);
          })
          .finally(() => {
            this.loading.searchable = false;
          });
      }

      //this.loading.searchable = true;
    },
    /*
    searchInput(text: string) {
      if (text.length > 3) {
        console.log(text);
        this.loading.searchable = true;
        fetch("http://localhost:3000/v1/funcionario")
          .then((response) => response.json())
          .then((data) => {
            this.loading.searchable = true;
            this.funcionarios = data;
          })
          .finally(() => {
            this.loading.searchable = true;
          });
      } else if (text.length == 0) {
        this.loadFuncionários();
      }
    }*/
    loadFuncionarios() {
      this.loading.searchable = false;
      // this.funcionários = [
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
      fetch("http://localhost:3000/v1/funcionario")
        .then((response) => response.json())
        .then((data) => {
          this.funcionarios = data;
        });
    },

    // },
    submit() {
      if (
        this.funcionarioDialog.cpf.length != 11 ||
        !new RegExp(/[0-9]{11}/).test(this.funcionarioDialog.cpf)
      ) {
        this.alert.message = "CPF inválido";
        this.alert.isActive = true;
        return;
      }

      if (
        this.funcionarioDialog.celular.length != 11 ||
        !new RegExp(/[0-9]{11}/).test(this.funcionarioDialog.celular)
      ) {
        this.alert.message = "Celular inválido";
        this.alert.isActive = true;
        return;
      }
      if (
        this.funcionarioDialog.celular &&
        this.funcionarioDialog.cpf &&
        this.funcionarioDialog.endereco &&
        this.funcionarioDialog.nome &&
        this.funcionarioDialog.rg &&
        this.funcionarioDialog.salario &&
        this.funcionarioDialog.setor &&
        this.funcionarioDialog.sobrenome
      ) {
        this.loading.creating = true;
        const url =
          "http://localhost:3000/v1/funcionario" +
          (this.funcionarioDialog.id ? "/" + this.funcionarioDialog.id : "");
        const method = this.funcionarioDialog.id ? "PUT" : "POST";
        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: this.funcionarioDialog.nome,
            sobrenome: this.funcionarioDialog.sobrenome,
            celular: this.funcionarioDialog.celular,
            cpf: this.funcionarioDialog.cpf,
            endereco: this.funcionarioDialog.endereco,
            rg: this.funcionarioDialog.rg,
            salario: this.funcionarioDialog.salario,
            setor: this.funcionarioDialog.setor,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            this.alert.message = "Funcionário salvo com sucesso!";
            this.alert.isActive = true;
          })
          .catch((error) => {
            this.alert.message = "Erro ao salvar funcionário! Tente novamente.";
            this.alert.isActive = true;
          })
          .finally(() => {
            this.loading.creating = false;
            this.dialogCreate = false;
            this.funcionarioDialog = {
              id: null,
              nome: "",
              sobrenome: "",
              celular: "",
              cpf: "",
              endereco: "",
              rg: "",
              salario: null,
              setor: "",
            };
            this.loadFuncionarios();
          });
      }
    },
    deleteClient(funcionarioId: string) {
      this.loading.tableData = true;
      fetch("http://localhost:3000/v1/funcionario/" + funcionarioId, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.alert.message = "Funcionário excluído com sucesso!";
          this.alert.isActive = true;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alert.message = "Erro ao excluir funcionário! Tente novamente.";
          this.alert.isActive = true;
        })
        .finally(() => {
          this.loading.tableData = false;
          this.loadFuncionarios();
        });
    },
    openEditDialog(funcionarioInfo: any) {
      this.funcionarioDialog = funcionarioInfo;
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
