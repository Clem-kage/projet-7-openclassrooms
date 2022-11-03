import login from './../components/pages/LoginPage.vue'
import signup from './../components/pages/signupPage.vue'
import Feed from './../components/pages/FeedPage.vue'
import singlePost from './../components/pages/singlePost.vue'
import profils from './../components/profilsAdmin.vue'
import error from './../components/pages/error.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    // {path: "/", component: App},
    {path: "/login",
     component: login,
     name: "login" },

    {path: "/signup",
     component: signup,
     name:"signup"},

    {path: "/post/:id",
     component: singlePost,
     name:"singlePost"},

    {path: "/home",
     component: Feed,
     name:"feed"
    },
    {path: "/profils",
     component: profils,
     name:"profils"
    },
    {path: "/error",
     component: error,
     name:"error"
    },
    {path: "/",
     redirect: "/home"},

]


const router  = createRouter({
    history: createWebHashHistory(),
    routes,
})
let token = localStorage.getItem('status');


router.beforeEach((to, from) => {
console.log('from : ', from);
console.log('to : ', to);

let loc = JSON.parse(localStorage.getItem('status'));
if(!loc){
    window.location.href = "http://localhost:3000/#/login"
}
  if(isPrivatPage(to) && loc.length <= 1   ){
    let token = JSON.parse(localStorage.getItem('status'));
     console.log(token.length)
     return router.push('/login');
  }
  
//   else if( isPrivatPage(to) && isConnected()){
//      return router.push('/home')
//   }
 
});

 function isPrivatPage(to) {
    const publicPages = ["/login","/signup"];
    return !publicPages.includes(to.path)
 };

function isConnected() {
    let token = JSON.parse(localStorage.getItem('status'));
    if (token && isTokenValid(token)){
        console.log(token[0])
        return true;
    }
    else {
        return false;
    }
}

function isTokenValid (tok){
 
    if (tok[0] ==='succès'){
        console.log(tok[0]) 
        return true; 
    }
   
    else {
        console.log(tok)
        return true;
    }
}






export default router 