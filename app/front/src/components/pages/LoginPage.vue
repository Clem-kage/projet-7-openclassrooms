<script>


import { mapState } from 'vuex';
export default {
name: 'login',

computed: mapState(['userLogin'])
,


created(){
  // let init = localStorage.setItem('status', JSON.stringify(['fail']));
  
  this.$store.dispatch('verify',  JSON.parse(localStorage.getItem('status')));
},


 data () {
  return{
      // connNom: 'albert',
      // connMotdepasse: 'albernti' , 
      // user: {
      //      pseudo: "",
      //      password: ""
      // },
     
      errors:[],

      formOk: false,


      }
    },

  methods:{
    finc (nom, pass){
      // console.log(this.connNom, this.connMotdepasse);
      if (nom !== 'albert'){
        throw new Error('mauvais utilisateur');
      }
      if(pass !== 'albernti'){
         throw new Error('mauvais mot de passe');
      }
      
       const token = "mon token"

       localStorage.setItem('token', token)
    },

    ajout () {
       console.log('e')
       this.errors = []

    if(!this.userLogin.pseudo){
      this.errors.push('pas de nom utilisateur');
      this.formOk = false;

    }
    if(!this.userLogin.password){
      this.errors.push('mot de passe manquant');
      this.formOk = false;

    }
    if(this.userLogin.password.length < 2){
      this.errors.push('mot de passe trop faible');
      this.formOk = false;

    }
    if(this.userLogin.password.length < 2){
      this.errors.push('nom d\'utilisateur trop court');
      this.formOk = false;

    }

    else if(this.userLogin.pseudo && this.userLogin.password && this.errors.length <= 0){
        this.formOk = true;

    }
  },
//   send(){
//   const url = "http://localhost:4000/api/auth/login";

//   axios
//     .post(url, {
//       password: this.userLogin.password,
//       pseudo: this.userLogin.pseudo
//     })
//     .then((response) => console.log(response))
    

// }  
  }

}
</script>
<template>
     <section class="seConnecter">
    
<main>

     <h2>se connecter</h2>
    <form  
    @submit.prevent="this.$store.dispatch('LoginUser', {password: this.userLogin.password,
                                                        pseudo: this.userLogin.pseudo} )" 
    action="">
      
      <div>
      <label> <b>Nom d'utilisateur</b></label>
      <input
        type="text"
        placeholder="Entrer le nom d'utilisateur"
        name="pseudo"
        v-model="this.$store.state.userLogin.pseudo"
        id="pseudo"
        @input="ajout()"
        
        
      />
      </div>
      

       <div>
      <label><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Entrer le mot de passe"
        name="password"
        v-model="this.$store.state.userLogin.password"
        id="password"
        @input="ajout()"
        
      />
      </div>

      <button 
        :disabled="!this.formOk" 
        @type="submit" id="submit"> connectez-vous </button> 
    </form>



     

   <div>
      <span class='errosMessage'  v-for="error in errors" :key="error"> {{error}} </span>
   </div>
      

    <!-- <p> {{connNom}} </p> -->
    <!-- <p>  {{connMotdepasse}} </p> -->

    </main>
  </section>
</template>
<style>
main{
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px;
  width: 40%;
  height: 50vh;
  margin: 0 auto;
  flex-direction: column;
}
div{
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  justify-content: center;
}
h2{
   position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
input{
  width: 100%;
  height: 15px;
}
.errosMessage{
  color: red;
}
</style>