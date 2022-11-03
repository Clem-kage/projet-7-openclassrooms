<script>
  import formulairePost from "./formPostFeed.vue"
export default {
  components:{
    formulairePost
  },
    name: "posts",
  data(){
    return{
          
    }
  } ,
  computed:{
    posts(){
    return this.$store.state.posts
  }
}

}
</script>
<template>

  <div class="container">

    <section class="posts">
          <formulairePost @recharge="this.$store.dispatch('loadPosts')" />
    </section>
 
  <router-link  :to="`/post/${post._id}`"  class="carte"
   v-for="(post, i) in this.posts" :key="i">
     
      <div class="profil"
       v-if="post.pseudo">
       {{post.pseudo}}
      </div>
      <div v-else> pas de pseudo </div>
      <div class="image">
          <img src="https://imagerie-enosis.fr/images/arthrose-1200-v2-1200-1.jpg" alt="grosse image">
      </div>
      <div class="title">{{post.title}}</div>
      <div class="text">{{post.content}}</div>
  </router-link>
  
        <button class="active">get posts</button>
  </div>
  
</template>
<style>
.carte{
    height: 500px;
    width: 80%;
    border:solid 1px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px auto;
}
.profil{
    width: 100%;
    height: 10%
}
.image{
    height: 80%;
    width: 100%;
    border:solid 1px;
    
}
img{
  height: 100%;
  width: 100%;
}
.text{
     height: 20%;
    width: 100%;
}
.active{
    width:70px
}

</style>