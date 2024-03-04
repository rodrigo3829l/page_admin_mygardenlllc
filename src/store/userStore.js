import { ref } from "vue"
import { defineStore } from 'pinia'
import { api } from "@/axios/axios";

export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expireIn = ref (null);
    const name = ref (null);
    const email = ref (null);
    const rol = ref (null);

    const login = async (email, pass, rol) => {
        const datos = {
            email,
            password: pass,
            rol
        }
        try {
            const {data} = await api.post('/user/login', datos)
            name.value = data.name
            rol.value = data.rol
            // email.value = data.email 
            token.value = data.token;
            expireIn.value = data.expiresIn

            setTime();
            const resp = await api({
                method: 'GET',
                url : '/user/protected',
                headers: {
                    'Authorization' : 'Bearer ' + token.value,
                },
            })
            localStorage.setItem('rol', resp.data.tipo)
            localStorage.setItem('token', token.value)
            return({exito : 'inicio se sesion exitoso'})
        } catch (error) {
            const {response} = error
            return({error: response.data.error})
        }
    }
    const logout = async () => {
        try {
            localStorage.removeItem('rol');
            localStorage.removeItem('token');
            await api.get('/user/logout')
        } catch (error) {
            console.log(error)
        } finally{
            // localStorage.clear();
            localStorage.removeItem('rol');
            localStorage.removeItem('token');
            resetStore();
        }
    }
    const resetStore = () =>{
        token.value = null;
        expireIn.value = null;
        name.value = null
        email.value = null
        rol.value = null
        // localStorage.clear();
        localStorage.removeItem('rol');
        localStorage.removeItem('token');
    }
    const setTime = () =>{
        setTimeout(() => {
            refreshToken();
        }, expireIn.value * 1000 - 6000)
    }

    const refreshToken = async () =>{
        try {
            const {data} = await api.get ('/user/refresh');
            // console.log("Desde el refresh")
            // console.log(data)
            token.value = data.token;
            expireIn.value = data.expiresIn;
            name.value = data.name
            email.value = data.email
            rol.value = data.rol
            const resp = await api({
                method: 'GET',
                url : '/user/protected',
                headers: {
                    'Authorization' : 'Bearer ' + token.value,
                },
            })
            localStorage.setItem('rol', resp.data.tipo)
            localStorage.setItem('token', token.value,);
            setTime();
        } catch (error) {
            console.log(error)
            // localStorage.removeItem('tipo')
        //     localStorage.removeItem('tipo');
        // localStorage.removeItem('venta');
        }
    }
    const initializeStore = () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken ) {
            token.value = storedToken;
            setTime();
        }
    };

    return {
        token,
        expireIn,
        login,
        logout,
        refreshToken,
        initializeStore,
        name,
        email,
        rol
    }
  })