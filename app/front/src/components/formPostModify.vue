<template>
    <div class="modifacationPost">
    <form action="">
        <input type="text" v-model="this.modificationPost.modifTitle" placeholder="modification du titre ?" >
        <input type="text" v-model="this.modificationPost.modifContent" placeholder="modification du contenu ?" >
        <input type="submit" @click.prevent="console(), this.$store.dispatch('modifyPost',
        [{title: this.modificationPost.modifTitle, userId: this.local[2], content: this.modificationPost.modifContent}, this.location] )" value="modifier">
        <button @click="$emit('supp')" >annuler</button>

       
    </form>
   </div>
    
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            location: this.$route.params.id,
            local: JSON.parse(localStorage.getItem('status')),

        }
    },
    computed:mapState(['modificationPost']),
    methods:{
        console(){
            console.log(this.modificationPost)
        },
        supp(){
                this.$emit('supp');

        }
    }
    }


</script>

<style>
   


</style>