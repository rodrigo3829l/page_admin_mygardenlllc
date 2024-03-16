import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/store/store';

const routes = [
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(() => {
    window.scrollTo(0, 0);
});

// router.beforeEach( async (to, from, next) =>{

//     const userStore = useUserStore();

//     const auth = userStore.token !== null;
//     const needAuth = to.meta.requireAuth;

//     if(needAuth && !auth){
//         next('forbidden')
//     } else{
//         next()
//     }
// })
export default router