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

              <!-- <v-card-text class="text-medium-emphasis text-caption">
                {{ $t('login.descriptionWarningString') }}
              </v-card-text> -->
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
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            <!-- </v-form><br> -->
            <v-divider></v-divider>
            <div class="text-center mt-5">
              <!-- <router-link :to="{name: 'login-reistration'}">
                <p class="mb-0">{{ $t('login.registrationString') }}<v-icon icon="mdi-chevron-right"></v-icon></p>
              </router-link>
              <router-link :to="{name: 'login-mail'}">
                <p class="mb-0">{{ $t('login.forgotPasswordString') }}<v-icon icon="mdi-chevron-right"></v-icon></p>
              </router-link> -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { useRouter } from 'vue-router';
// import { ref } from 'vue'
// import { useField, useForm } from 'vee-validate'
import  {useUserStore} from '@/store/userStore'
// import {i18n} from '@/main.js'
const userStore = useUserStore()
export default {
  data() {
    return {
      email : '',
      password : '',
      rol : '',
      passwordVisible : false
    }
    
  },
  methods : {
    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible
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