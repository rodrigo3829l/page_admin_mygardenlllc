<template>
  <v-app>
    <v-main>
      <NavBar/>
      <Login/>
    </v-main>
  </v-app>
  
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  name: 'App',

  components: {
    NavBar : defineAsyncComponent(() => import('./components/shared/components/NavbarView.vue')),
    Login : defineAsyncComponent(() => import('./components/login/pages/loginAdmin.vue'))
  },
  data: () => ({
    //
  }),
}
</script>
