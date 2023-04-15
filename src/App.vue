<template>
      <v-card>
      <v-layout>
        <!--<div style="display: flex;"> -->
          <v-navigation-drawer color="grey-darken-2" permanent :order="order" width="200"  >
            <v-list style="padding: 0px;">
              <v-list-item title="Barra Navegação" style="display: flex; justify-content: center ; padding-bottom: 75px">

                </v-list-item>

                  <v-list-item style="" v-for="(moduloMenu, i) in menu_lateral" :key="i">
                        <div class="text-center">
                          
                              <v-menu :location="location">
                                <template v-slot:activator="{ props }" >
                                  <v-btn 
                                    
                                    size="large"
                                    append-icon=""
                                    color="primary"
                                    v-bind="props"
                                    width="280"
                                    class=""
                                      > {{moduloMenu.title}}
                                        <v-icon  icon="mdi-vuetify"></v-icon>
                                  </v-btn>
                                </template>

                            <v-list>
                              <v-list-item
                                v-for="(item, index) in moduloMenu.children"
                                :key="index"
                                  >
                              <v-list-item-title>
                                <v-btn style="background-color: grey; color:antiquewhite" >
                                  <router-link :to="item.link" > {{ item.title }}</router-link>
                                </v-btn>
                              </v-list-item-title>
                              
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>     
                </v-list-item>
                
            </v-list>
          </v-navigation-drawer>

          <v-app-bar height="100" color="grey-darken-2">
            <v-icon style="margin-left: 50px" icon="mdi-vuetify"></v-icon>
            <h1>BARBER SYSTEM {{ moduloMenu }}</h1>
            <v-icon icon="mdi-vuetify"></v-icon>

          </v-app-bar>

          <router-view/> <!--Visualização dos componentes por meio das rotas-->

    
      </v-layout>
    </v-card>  
</template>

<script >
import itensLaterais from './components/itensLaterais.vue'

  export default {
    components: {
      itensLaterais
    },
    data: () => ({
      items: [
        { title: 'Cadastrar'},
        { title: 'Pesquisar' },
        { title: 'Editar' },
        { title: 'Excluir' },
      ],
      location: 'end',

      menu_lateral:[
        {title: 'Cliente', children: [
        {title: "Cadastrar", link: "/Cadastrar_Cliente"},
        {title: "Pesquisar", link: "/Pesquisar_Cliente"},
        {title: "Editar", link: "/Editar_Cliente"},
        {title: "Excluir", link: "/Excluir_Cliente"}
        ]},

        {title: 'Funcionario', children: [
        {title: "Cadastrar", link: "/Cadastrar_Funcionario"},
        {title: "Pesquisar", link: "/Pesquisar_Funcionario"},
        {title: "Editar", link: "/Editar_Funcionario"},
        {title: "Excluir", link: "/Excluir_Funcionario"}
        ]},

        {title: 'Servico',  children: [
        {title: "Cadastrar", link: "/Cadastrar_Servico"},
        {title: "Pesquisar", link: "/Pesquisar_Servico"},
        {title: "Editar", link: "/Editar_Servico"},
        {title: "Excluir", link: "/Excluir_Servico"}
        ]},


        {title: 'Agendamento', children: [
        {title: "Cadastrar", link: "/Cadastrar_Agendamento"},
        {title: "Pesquisar", link: "/Pesquisar_Agendamento"},
        {title: "Editar", link: "/Editar_Agendamento"},
        {title: "Excluir", link: "/Excluir_Agendamento"}
        ]}
      ],
      
      props: {
       
      },
      methods: {
        
      } 
    })
  }

</script>

<style scoped>
@media only screen and (min-width: 200px){
  .Content{
    background-color: aqua;
  }
}

.TopBar{
  height: 100px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  
  
}

.Content{
  background-color: black;
  opacity: 90%;
  background-image: url("./assets/BackGround.jpg");
  background-size: cover;
  margin-left: 180px;
}

</style>
