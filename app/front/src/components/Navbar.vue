<script>
import Logo from './Logo.vue'

export default {
    name: "Navbar",
    components: {Logo}
}
</script>

<template>
 <div >
    <div class="logo">
      <Logo/>
    </div>
    <ul class="nav">
        <li><router-link to="/home">home</router-link></li>
        <li><router-link to="/login">login</router-link></li>
        <li><router-link to="/signup">signup</router-link></li>
        <li v-if="this.$store.state.userAdmin"><router-link to="/profils">admin</router-link></li>
    </ul>
        <button @click="this.$store.commit('déconnexion')"> se déconnecter </button>
    <router-view></router-view>

</div>


    
</template>

<style>
.header{
    width: 100%;
    height: 60px;
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
}
.router-link-active{
    color: red;
}
ul{
    display: flex;
    margin-left: 20%;
}
ul li{
    list-style: none;
    margin-left: 15px;
    color: black;
    width: 100px;
    }
a{
 text-decoration: none;
     color: inherit;

}
.logo{
    width: 50px;
    margin-left: 5%;
}

</style>