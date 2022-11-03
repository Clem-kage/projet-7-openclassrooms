<template>

  <div>
    

    <section class="feed">  
      <h2> fil d'actualité </h2>

          <exemplePost />
    </section>

    

  </div>
  
</template>

<script>
import exemplePost from "./../Post.vue"
import formulairePost from "./../formPostFeed.vue"
export default {
  name: "feedStatic",
  components:{
    exemplePost,
    formulairePost,
     
  },
  computed:{
   
   
  },
  data(){
     return{
  
     }
  }
 
}
</script>

<style>


</style>