<template>
  <v-card>
    <v-layout>
      <!--<div style="display: flex;"> -->
      <v-navigation-drawer
        color="grey-darken-2"
        permanent
        :order="order"
        width="225"
      >
        <v-list style="padding: 0px">
          <div class="TituloMenu" style="padding: 15px; text-align: center">
            <v-list-item class="TextoMenuPrincipal">
              Menu <br />
              Principal
            </v-list-item>
            <img
              src="./assets/Asset_Tesoura.png"
              class="AssetTesoura"
              alt="Imagem tesoura"
            />
          </div>

          <v-list-item
            style=""
            v-for="(moduloMenu, i) in menu_lateral"
            :key="i"
          >
            <div class="text-center">
              <v-menu :location="location">
                <template v-slot:activator="{ props }">
                  <div>
                    <v-btn
                      id="teste"
                      size="large"
                      class="ButtonMenu"
                      v-bind="props"
                      width="400"
                      style="font-weight: bold"
                      rounded="xl"
                    >
                      {{ moduloMenu.title }}

                      <img src="./assets/Asset_Seta.png" class="Asset_Seta" />
                    </v-btn>
                  </div>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, index) in moduloMenu.children"
                    :key="index"
                  >
                    <v-list-item-title>
                      <v-btn
                        style="background-color: grey; color: antiquewhite"
                      >
                        <router-link :to="item.link">
                          {{ item.title }}</router-link
                        >
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <div style="display: flex; justify-content: center">
        <v-app-bar height="100" color="grey-darken-2">
          <!--<v-icon style="margin-left: 50px" icon="mdi-vuetify"></v-icon>-->
          <img
            src="./assets/Asset_Tubo.png"
            class="AssetTubo"
            style="margin-left: 50px"
          />
          <h1 style="font-family: 'Eczar SemiBold'; margin: 0 10px">
            BARBER SYSTEM
          </h1>
          <img src="./assets/Asset_Tubo.png" class="AssetTubo" />
        </v-app-bar>
      </div>
      <v-main
        style="min-height: 768px; display: flex; color: aliceblue"
        class="Content"
      >
        <router-view />
      </v-main>
      <!--Visualização dos componentes por meio das rotas-->
    </v-layout>
  </v-card>
</template>

<script>
import itensLaterais from "./components/itensLaterais.vue";

export default {
  components: {
    itensLaterais,
  },
  data: () => ({
    items: [
      { title: "Cadastrar" },
      { title: "Pesquisar" },
      { title: "Editar" },
      { title: "Excluir" },
    ],
    location: "end",

    menu_lateral: [
      {
        title: "Cliente",
        children: [
          { title: "Cadastrar", link: "/Cadastrar_Cliente" },
          { title: "Pesquisar", link: "/Pesquisar_Cliente" },
          { title: "Editar", link: "/Editar_Cliente" },
          { title: "Excluir", link: "/Excluir_Cliente" },
        ],
      },

      {
        title: "Funcionario",
        children: [
          { title: "Cadastrar", link: "/Cadastrar_Funcionario" },
          { title: "Pesquisar", link: "/Pesquisar_Funcionario" },
          { title: "Editar", link: "/Editar_Funcionario" },
          { title: "Excluir", link: "/Excluir_Funcionario" },
        ],
      },

      {
        title: "Servico",
        children: [
          { title: "Cadastrar", link: "/Cadastrar_Servico" },
          { title: "Pesquisar", link: "/Pesquisar_Servico" },
          { title: "Editar", link: "/Editar_Servico" },
          { title: "Excluir", link: "/Excluir_Servico" },
        ],
      },

      {
        title: "Agendamento",
        children: [
          { title: "Cadastrar", link: "/Cadastrar_Agendamento" },
          { title: "Pesquisar", link: "/Pesquisar_Agendamento" },
          { title: "Editar", link: "/Editar_Agendamento" },
          { title: "Excluir", link: "/Excluir_Agendamento" },
        ],
      },
    ],

    props: {},
    methods: {},
  }),
};
</script>

<style scoped>
@font-face {
  font-family: "Eczar SemiBold";
  src: url("./assets/Eczar-VariableFont_wght.ttf");
}

@media only screen and (min-width: 200px) {
  .Content {
    background-color: aqua;
  }
}

* {
  margin: 0px;
  padding: 0px;
}

#teste {
  display: flex !important;
  justify-content: end !important;
  margin: 0x;
  padding-block: 0px;
  background-color: rgb(216, 213, 213);
}

#teste:hover {
  background-color: rgb(145, 141, 141);
}

.AssetTubo {
  width: 25px;
}

.Asset_Seta {
  width: 17px;
}

.TituloMenu {
  display: flex;
  justify-content: center;
}

.AssetTesoura {
  margin-top: 20px;
  width: 40px;
  height: 40px;
  text-align: center;
}

.TextoMenuPrincipal {
  color: black;
  font-size: 22px;
  font-weight: bold;
  font-family: "Eczar SemiBold";
}

.TopBar {
  height: 100px;
  background-color: gray;
}

.Content {
  background-color: black;
  opacity: 90%;
  background-image: url("./assets/BackGround.jpg");
  background-size: cover;
  margin-left: 180px;
}
</style>
