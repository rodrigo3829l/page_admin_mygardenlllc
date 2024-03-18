<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-green-darken-3 navbar-transition" clipped-left>
      <v-container>
        <div class="container">
          <v-row align="center" justify="center">
            <v-col cols="auto">
              <router-link to="/" class="navbar-brand">
                <div class="d-flex align-items-center">
                  <img src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697989916/logos/jgkamjqwy97zkb0hfsye.png" alt="Logo" class="logo">
                </div>
              </router-link>
            </v-col>
            <v-col cols="auto" class="d-md-none d-lg-block">
              <p class="company-name">
                My Garden LLC
              </p>
              <p class="subtitle">
                Servicios de jardineria y mas
              </p>
            </v-col>
            <!-- a este -->
            <v-col v-if="width > pixels" cols="auto">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  <v-btn 
                  v-if="userStore.token"
                  variant="text"
                  @click="logout">
                    Logout
                  </v-btn>
                  <!-- <router-link
                    v-for="link in links"
                    :key="link.to"
                    :to="{ name: link.to }"
                    class="nav-link"
                    :class="{ 'is-active': $route.name === link.to }"
                  >
                    <v-icon size="15" color="white">{{ link.icon }}</v-icon>{{ link.name }}
                  </router-link> -->
                  <!-- <router-link
                    :to="{ name: 'login-login' }"
                    class="nav-link is-active"
                  >
                    <v-icon size="15" color="white">mdi-login</v-icon>login
                  </router-link> -->
                </ul>
              </div>
            </v-col>
            <!-- a este -->
            <v-col cols="auto" class="d-flex align-items-center">
              <!-- <v-btn icon variant="text" @click="changeLanguage('en')" class="mx-1" v-if="this.$i18n.locale === 'es' && width > pixels ">
                <v-img
                  src="https://flagcdn.com/16x12/us.webp"
                  alt="USA"
                  width="16"
                  height="12"
                ></v-img>
              </v-btn>
              <v-btn icon variant="text" @click="changeLanguage('es')" class="mx-1" v-if="this.$i18n.locale === 'en' && width > pixels " >
                <v-img
                  src="https://flagcdn.com/16x12/mx.webp"
                  alt="Mexico"
                  width="16"
                  height="12"
                ></v-img>
              </v-btn> -->
              <v-app-bar-nav-icon   @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
              <v-btn v-if="width > pixels"  icon variant="text" @click="toggleTheme" >
                <v-icon v-if="theme.global.name.value === 'light'">mdi-moon-waning-crescent</v-icon>
                <v-icon v-if="theme.global.name.value === 'dark'">mdi-white-balance-sunny</v-icon>
  
              </v-btn> 
            </v-col>
  
          </v-row>
        </div>
      </v-container>
    </nav>
  </template>
  
  <script>
    import { useUserStore } from '@/store/userStore';
    import { useDisplay } from 'vuetify'
    import { useTheme } from 'vuetify'
    const userStore = useUserStore();
    
    export default {
      setup() {
          const { width, mobile } = useDisplay()
          const theme = useTheme()
          const toggleTheme = () => {
            theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
          }
          return {
            theme,
            toggleTheme,
            width,
            mobile
          };
        },
      
      data() {
        return {
          links : [
            // { name: 'Home', to: 'home-home', icon: 'mdi-home' },
            // { name: 'Services', to: 'services-services', icon: 'mdi-hammer-screwdriver' },
            // { name: 'Projects', to: 'proyects-view', icon: 'mdi-briefcase' },
            // { name: 'Contact', to: 'home-contact', icon: 'mdi-email' },
            // { name: 'FaQS', to: 'home-answers', icon: 'mdi-help-circle' },
          ],
          drawer: false,
          userStore,
          pixels : 750
        }
      },
      
      methods: {
        
        speak (text) {
          const utterance = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(utterance);
        },
        profile () {
          this.$router.push({ name: 'profile-profile' });
        },
        services () {
          this.$router.push({ name: 'profile-myservices' });
        },
        async logout() {
          await userStore.logout();
          this.$router.push('/');
        },
        changeLanguage(lang) {
          console.log(lang)
        },
        hideNavbar() {
          const navbar = document.querySelector('.navbar-transition');
          if (navbar) navbar.style.opacity = '0';
        },
        showNavbar() {
          const navbar = document.querySelector('.navbar-transition');
          if (navbar) navbar.style.opacity = '1';
        }
      },
      mounted() {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          this.userStore.refreshToken();
        }
        console.log(this.$vuetify)
        let lastScrollTop = 0; 
  
        window.addEventListener('scroll', () => {
          let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
          if (currentScroll > lastScrollTop) {
            this.hideNavbar();
          } else {
            this.showNavbar();
          }
          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita valores negativos
        }, false);
      },
    };
  </script>
  
  <style scoped>
    .logo {
      width: 120px;
      margin-right: 10px;
    }
  
    .company-name {
      font-weight: bold;
      font-size: 18px;
      margin: 0;
      color: #efe9e9;
    }
  
    .subtitle {
      font-size: 14px;
      margin: 0;
      color: #efe9e9;
    }
  
    .nav-link {
      color: #c6c5c5;
      padding: 0.5rem 1rem;
    }
  
    .is-active {
      color: #ffffff;
    }
  
    .navbar-transition {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      transition: opacity 0.5s ease-in-out;
      opacity: 1;
    }
  
  </style>