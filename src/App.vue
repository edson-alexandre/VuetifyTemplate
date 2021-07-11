<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark  
      clipped-left  
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div style="display: flex; justify-content: center; width: 100%">
        <h3>Vuetify Template</h3>
      </div>
    </v-app-bar>
    <v-navigation-drawer 
      dark 
      app
      v-model="drawer"
      clipped
      bottom
    >
      <v-list>
          <v-list-group>
             <template v-slot:activator>
              <v-list-item-title>Cadastros</v-list-item-title>            
            </template>
            <v-list-item>
              <router-link class="ml-4" to="/usuario" style="color: #fff">Usuários</router-link>
            </v-list-item>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>      
    <v-menu app ></v-menu>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer 
      app
      light
      color="#FAFAFA"
      style="display: flex; justify-content: flex-end;"
    > 
      Desenvolvido para testar o UI Frameword do Vuetify
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
      drawer: true
  }),
};
</script>
<style>
  html { overflow-y: auto !important}
</style>