<template>
        <form action="">
            <input type="text" v-model="this.$store.state.modifyComment" placeholder="modifier le commentaire" >
            <input  type="submit" value="modifier" @click.prevent="this.$store.dispatch('modifyComment', [comm._id, {userId: this.local[2], content: this.modifyComment}])">
            <button @click="$emit('codifCom'), this.$store.commit('suppIdFromLocal', comm._id)">annuler</button>
        </form>
  
</template>

<script>
export default {
    props:[
        'comm',
    ],
   data(){
            return{
                local: JSON.parse(localStorage.getItem('status'))
            }
    }

}
</script>

<style>

</style>