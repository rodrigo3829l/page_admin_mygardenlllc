import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore.js'
// import { useUserStore } from '@/store/store';

const routes = [
    {
        path : '/',
        redirect : {name : 'login'}
    },
    {
        path : '/login',
        name : 'login',
        meta : {
            isLoged : false,
        },
        component : () => import('../components/login/pages/loginAdmin.vue')
    },
    {
        path : '/employed',
        name : 'employeds',
        meta : {
            isLoged : true,
        },
        component : () => import('../components/employeds/pages/ServicesWindow.vue')
    },
    {
        path : '/admin',
        name : 'admin',
        meta : {
            isLoged : true,
        },
        component : () => import('../components/admin/layout/AdminLayout.vue'),
        children : [
            {
                path : 'quote',
                name : 'quote',
                component : () => import('../components/admin/cotize/pages/CotizeWindow.vue')
            },
            {
                path: '',
                name: 'default-quote',
                redirect: {name: 'quote'},
            },
        ]
    },
    {
        path : '/finance',
        name : 'finance',
        meta : {
            isLoged : true,
        },
        component : () => import('../components/finance/pages/InfoPays.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(() => {
    window.scrollTo(0, 0);
});

router.beforeEach( async (to, from, next) =>{

    const userStore = useUserStore();
    const needLog = to.meta.isLoged
    const token = userStore.token

    if(needLog){
        if(token){
            //mecesita un token para avanzar
            next()
        }
        //redirije a otra pantalla
    }else{
        next()
    }

    

    // const auth = userStore.token !== null;
    // const needAuth = to.meta.requireAuth;

    // if(needAuth && !auth){
    //     next('forbidden')
    // } else{
    //     next()
    // }
})
export default router