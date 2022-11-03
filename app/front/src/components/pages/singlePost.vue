<template>
  <div class="article">
    <div class="profil"
      >{{this.$store.state.singlePost.title}}</div>
      <div class="image"
        >
          <img src="https://imagerie-enosis.fr/images/arthrose-1200-v2-1200-1.jpg" alt="grosse image">
      </div>
      <div class="text">{{this.$store.state.singlePost.content}}</div>
      <div> {{this.userliked}} </div>
      <button v-if="!this.$store.state.likeActive" @click="addLike()">liker</button>
      <button v-else @click="deleteLike()">enlever le like</button>
      <!-- <div> {{this.$store.state.singlePost.createdAt}}</div> -->
      <div class="options"> <button :disabled="!this.$store.state.authorOptions" class="delete" @click="deletePost()">delete</button>
      <button class="delete"   
      @click="
      this.$store.dispatch('loadComments', this.location)" >commentaires</button>
      <button class="delete" :disabled="!this.$store.state.authorOptions" @click="modifyStatus()" >modifier le post</button> </div>
     
      <div class="modifacationPost" v-if="this.modifArea"> <postModif  v-on:supp="modifyStatus()" /> </div> 

          <formComm /> 


      
       <div class="displayComm"
        v-for="(comm, i) of  this.$store.state.comments" :key="i"
        >
              <div>{{comm.content}}</div>
              <template v-if="!comm.pseudo"> <div>oubli pas le pseudo</div> </template>
              <template v-else><div>{{comm.pseudo}}</div></template>

              <button :disabled="comm.active || this.modifArea || !comm.authorOptionComment" @click="modifProcesus(comm)" >modifier</button> 
              <button :disabled="!comm.authorOptionComment" @click="this.$store.dispatch('deleteComment', [comm._id, {userId: this.local[2]}])">supprimer</button> 

        <template v-if="comm.active" class="modicationPost">       
        <form action="">
            <input type="text" v-model="this.$store.state.modifyComment" placeholder="modifier le commentaire">
            <input  type="submit" value="modifier le commentaire" @click.prevent="this.$store.dispatch('modifyComment', [comm._id, {userId: this.local[2], content: this.$store.state.modifyComment}, this.location])">
            <button @click="comm.active = !comm.active, this.modifCommArea = !modifCommArea, this.$store.commit('suppIdFromLocal', comm._id)">annuler</button>
        </form>
        <!-- <commModify :comm="comm"  @codifCom="changementEtat()"/> -->
        </template>      

             
       </div>
 </div>
</template>

<script>
import commModify from './../formComModify.vue'  
import postModif from './../formPostModify.vue'
import formComm from './../formCom.vue'  
import { mapState } from 'vuex'
export default {
  components:{
    commModify,
    postModif,
    formComm
  },
  beforeCreate(){
    this.$store.dispatch('loadComments', this.location)
  },

  data(){
    return{
        likeActive: false,
        location: this.$route.params.id,
        modifArea: false,
        modifCommArea: false,
        local: JSON.parse(localStorage.getItem('status')),
        authorOptions: false
      }
  },
 
  
  
  computed: {
     userliked(){
      let result = this.$store.state.singlePost.usersLiked
      return result
     }
  },
  
  created(){
    // this.id = this.$route.params.id
    // this.axios.get(`http://localhost:4000/api/post/article/${this.id}`) .then((response) => {
    //   this.post = response.data
    //     console.log(response.data)
    // })
    this.$store.dispatch('getSinglePost', this.location);
    // if(this.local[1] === )
  },
  methods:{
    deletePost(){
      this.$store.dispatch('deletePost', [this.location, {userId: this.local[2]}]) 
      this.$store.dispatch('loadPosts')
    },
    console(){
      // console.log(this.modifyComment);
    },
    modifyStatus(){
      this.modifArea = !this.modifArea
    },
    modifProcesus(item){
        this.$store.commit('addIdToLocal', item._id);
        item.active = !item.active   
        console.log(this.localLength);
        this.modifCommArea = !this.modifCommArea
        // this.modifCommArea = !this.modifCommArea    
        console.log(this.modifCommArea)
    },
    changementEtat(item){
        item.active = !item.active    

    },
    likeStatus(state){
            if(this.$store.state.singlePost.persons.includes(this.local[2]))
            this.$store.state.likeActive
        },
    addLike(){
      this.$store.state.likeActive = !this.$store.state.likeActive
      this.$store.dispatch('addLike', [this.location, {userId: this.local[2]}])
      this.$store.dispatch('getSinglePost', this.location);
      console.log(this.$store.state.likeActive)
    },
    deleteLike(){
      this.$store.state.likeActive = !this.$store.state.likeActive
      this.$store.dispatch('deleteLike', [this.location, {userId: this.local[2]}])
      this.$store.dispatch('getSinglePost', this.location);
      console.log(this.$store.state.likeActive)
    }    
    // sure(){
      
    // }
    
  },
 

     
}
</script>

<style>
    .article{
        height:auto;
        width:80%;
        border: solid black 1px;
    }
    .delete{
      height:70px;
      width:100px;
    }
    .displayComm{
      height: auto;
      width: 100%;
      border: solid black 1px;
    }
    .options{
      display: flex;
      width: 100%;
      height: 70px;
    }
    .modifacationPost{
        width: 70vw;
        height: 80%;
        z-index: 10;
        top: 10%;
        border: 1px solid black;
        background-color: blue;
        position:fixed

    }

</style>