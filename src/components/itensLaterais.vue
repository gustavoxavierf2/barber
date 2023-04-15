<template>
    
<v-list-item style="margin-top: 15px;">
    <v-list-item >
        <div class="text-center">
            
                <v-menu :location="location">
                <template v-slot:activator="{ props }">
                    <v-btn 
                    
                    size="large"
                    append-icon="mdi-account-circle"
                    color="primary"
                    dark
                    v-bind="props"
                    
                        >
                        {{ menu_lateral.title }}
                    </v-btn>
                </template>

            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                    >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                
                </v-list-item>
            </v-list>
            </v-menu>
        </div>     
</v-list-item>
</v-list-item>
</template>

<script>
  export default {
    name: "itensLaterais",
    data: () => {
        return {
      items: [
        { title: 'Cadastrar' },
        { title: 'Pesquisar' },
        { title: 'Editar' },
        { title: 'Excluir' },
      ],
      location: 'end',
      Modulos: [
        
      ],
      menu_lateral:[
        {
          title: 'teste',
          title: 'teste',
          title: 'teste'
        }
    ]
    }},
  }

</script>