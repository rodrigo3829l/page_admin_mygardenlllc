<template>
  <v-app>
    <v-main>
      <NavBar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  name: 'App',

  components: {
    NavBar : defineAsyncComponent(() => import('./components/shared/components/NavbarView.vue')),
  },

  data: () => ({
    //
  }),
}
</script>
