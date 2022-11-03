<template>
  <div>
  <h1>profils</h1>

   <button @click="this.$store.dispatch('getUsers', {userId: this.local[2]})">charger</button>

   <div class="user" v-for="(use, index) in this.$store.state.users" :key="index">
       <p>{{use.pseudo}}</p>
       <button 
        @click="this.$store.dispatch('deleteUser', {userDeleted: use._id, userId: this.local[2], pseudo: use.pseudo})"
        >supprimer</button>
   </div>

  </div>

</template>

<script>
export default {
  data() {
    return{
      local: JSON.parse(localStorage.getItem('status'))
    }
  },
  methods:{
    
  }

}
</script>

<style>

</style>