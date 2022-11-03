<template>

  <form action="" class="formulaireCommentaire">
    <div>
    <input class="comm" v-model="this.$store.state.newComment" type="text" placeholder="un commentaire ?" >
    </div>
    <input @click.prevent="this.$store.dispatch('newComment', [ {userId: this.status[2],
                                                                 content: this.$store.state.newComment,
                                                                 pseudo: this.status[1]}
                                                                 , 
                                                                 this.location] )" type="submit" value="poster">
  </form>

</template>

<script>
export default {
  data(){
    return{
      location: this.$route.params.id,
      status: JSON.parse(localStorage.getItem('status'))

    }
  }
  ,
  methods:{
    console(){
      console.log([ { userId: this.status[2],
                      content: this.$store.state.newComment,
                      pseudo: this.status[1]}, 
                      this.location])
      console.log(this.status)
    }
  }

}
</script>

<style>
    .comm{
        width:50%;
        height: 70px;
        border-radius: 10px;
    }
 
</style>