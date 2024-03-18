<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="16">
        <v-card class="elevation-12">
          <v-toolbar color="green-darken-3" dark>
            <v-toolbar-title class="white--text text-center">
              Login
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-divider></v-divider>
            <!-- <v-form> -->
              <label for="">Email</label>
              <v-select
              color="green-darken-3"
                v-model="department"
                variant="underlined"
                placeholder="Selecciona el departamento al que perteneces"
                label="Selecciona tu departamento"
                :items="['admin', 'employed', 'finance']"
              ></v-select>
              <v-text-field
                v-model="email"
                label="Insertar Email"
                variant="underlined"
                prepend-inner-icon="mdi-account"
                color="green-darken-3"
                outlined
                required
              ></v-text-field>
              <label for="">Password</label>
              <v-text-field
                label="Insertar una contraseña valida"
                v-model="password"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisible ? 'text' : 'password'"
                outlined
                @click:append-inner="togglePasswordVisibility"
                color="green-darken-3"
                required
              ></v-text-field>
              <v-row justify="center">
                <v-col cols="12" sm="8" md="6" lg="16" align="center">
                  <div class="g-recaptcha" data-sitekey="6Le5gHApAAAAADv0EqDbSKVSgpcBxPFpCz6o4zVt" data-callback="onRecaptchaSuccess"></div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-btn 
                color="green-darken-3" 
                block 
                class="mt-4" 
                type="submit"
                :disabled="dialog"
                :loading="dialog"
                @click="login"
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            <v-divider></v-divider>
            <div class="text-center mt-5">
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/store/userStore.js'
const userStore = useUserStore()

export default {
  data() {
    return {
      email : 'finprueba@gmail.com',
      password : 'Hola123#',
      rol : '',
      passwordVisible : false,
      department : 'finance',
      dialog : false
    }
    
  },
  methods : {
    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible
    },
    async login () {
      this.dialog = true
      try {
        const email = this.email
        const pass = this.password
        const dpto = this.department
        const res = await userStore.login(email, pass, dpto)
        if(res.error){
          alert(res.error)
        }else{
          alert(userStore.rol)
          if(this.department !== userStore.rol ){
            alert('No perteneces a este departamento')
            userStore.resetStore()
            return
          }
          if(userStore.rol === 'employed'){
            this.$router.push({name : 'employeds'})
          }
          if(userStore.rol === 'admin'){
            this.$router.push({name : 'quote'})
          }
          if(userStore.rol === 'finance'){
            this.$router.push({name : 'finance'})
          }
        }
        console.log(res);
      } catch (error) {
        alert('error en el login')
        console.log(error);
      } finally {
        this.dialog = false
      }
    }
  }
}
</script>

<style scoped>
.fade-alert {
  transition: opacity 1s;
}
.fade-alert.v-leave-active {
  opacity: 0;
}
</style>