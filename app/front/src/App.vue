<script>
import Navbar from './components/Navbar.vue'

export default {
  components:
   { Navbar },
  name:"App",
  created() { this.$store.dispatch('initialiseStore'); 
                   this.$store.dispatch('loadPosts');
     // let init = localStorage.setItem('status', JSON.stringify(['fail']));
  },
  methods:{
    // init(){
    //   if(localStorage == undefined){
    //     localStorage.setItem('status', JSON.stringify(['fail']));
    //   }
    // }

  }
}
</script>

<template>
 <navbar/>
</template>

<style>
       



</style>
