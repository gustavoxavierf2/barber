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
                      id="{{i + moduloMenu.title}}"
                      size="large"
                      
                      v-bind="props"
                      width="400"
                      class="buttonMenu"
                      rounded="xl"
                    >
                      <router-link
                        :to="moduloMenu.link"
                        class="w-100 buttonLink"
                        
                      >
                        {{ moduloMenu.title }}
                      </router-link>
                    </v-btn>
                    <!-- <img src="./assets/Asset_Seta.png" class="Asset_Seta" /> -->
                  </div>
                </template>
              </v-menu>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- <div style="display: flex; justify-content: center"> -->
      <v-app-bar height="100" color="grey-darken-2">
        <div class="centralize">
          <!--<v-icon style="margin-left: 50px" icon="mdi-vuetify"></v-icon>-->
          <img src="./assets/Asset_Tubo.png" class="AssetTubo" />
          <h1 style="font-family: 'Eczar SemiBold'; margin: 0 10px">
            BARBER SYSTEM
          </h1>
          <img src="./assets/Asset_Tubo.png" class="AssetTubo" />
        </div>
      </v-app-bar>
      <!-- </div> -->
      <v-main class="Content">
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
        link: "/Cliente",
      },

      {
        title: "Funcionario",
        link: "/Funcionario",
      },

      {
        title: "Servico",
        link: "/Servico",
      },
      {
        title: "Fornecedor",
        link: "/Fornecedor"
      },
      {
        title: "Produto",
        link: "/Produto"
      },
      {
        title: "Agendamento",
        link: "/Agendamento",
      },
      {
        title: "Venda",
        link: "/Venda",
      },
      {
        title: "Compra",
        link: "/Compra",
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


* {
  margin: 0px;
  padding: 0px;
}

a {
  text-decoration: none;
  color: black;
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
  min-height: 100vh;
  /* margin-left: 30px; */
}
.centralize {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.buttonMenu{
  font-weight: bold;
  background-color:#1C1C1C;
}
.buttonLink{
  display: flex;
  width: 100%; 
   
  color:white;
  font-family: Eczar SemiBold;
  align-content: center;
}
</style>
