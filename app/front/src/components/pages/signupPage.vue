<script>
import { mapState } from 'vuex';
export default {
  name:'signupPage', 
  components:{
    
  },
  computed:mapState(["userSignup"]),
   

  data(){
  
     return{
     

      formOk: false,
      errors:[],
      
     }
  },
  methods:{
   
     ajout () {
       
       this.errors = []

    if(!this.userSignup.pseudo){
      this.errors.push('pas de nom utilisateur');
      this.formOk = false;

    }
    if(!this.userSignup.password){
      this.errors.push('mot de passe manquant');
      this.formOk = false;

    }
    if(this.userSignup.password.length < 2){
      this.errors.push('mot de passe trop faible');
      this.formOk = false;

    }
    if(this.userSignup.password.length < 2){
      this.errors.push('nom d\'utilisateur trop court');
      this.formOk = false;

    }
    if(this.userSignup.email.length < 5){
      this.errors.push('mail trop court')
      this.formOk = false;
    }

    else if(this.userSignup.pseudo && this.userSignup.password && this.userSignup.email && this.errors.length <= 0){
        this.formOk = true;

    }
  },
  }


}

</script>


<template>
     <section class="seConnecter">
    
<main>

     <h2>s'inscrire</h2>
    <form action="" @submit.prevent="this.$store.dispatch('SignupUser', {pseudo: this.userSignup.pseudo,
                                                                         email: this.userSignup.email,
                                                                         password: this.userSignup.password})" >
      
      <div>
      <label> <b>Nom d'utilisateur</b></label>
      <input
        type="text"
        placeholder="Entrer le nom d'utilisateur"
        name="pseudo"
        v-model="this.$store.state.userSignup.pseudo"
        id="pseudo"
        @input="ajout()"
      />
      </div>

      <div>
      <label> <b>mail</b></label>
      <input 
        type="text"
        placeholder="entrez votre mail"
        name="email"
        v-model="this.$store.state.userSignup.email"
        id="email"
        @input="ajout()"
        />
        
       </div> 

       <div>
      <label><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Entrer le mot de passe"
        name="password"
        v-model="this.$store.state.userSignup.password"
        id="password"
        @input="ajout()"
      />
      </div>

      <button :disabled="!this.formOk" type="submit" id="submit"> inscription </button> 
    </form>

    <div>
      <span class='errosMessage'  v-for="error in errors" :key="error"> {{error}} </span>
   </div>

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