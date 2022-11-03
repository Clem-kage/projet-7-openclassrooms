<template>
           <div class="formulairePost">
            <form
            enctype="multipart/form-data"
            action="" 
            method="post">

                                                                     
               <div>
                <input
                  type="text"
                  placeholder="dis moi..."
                  name="content"
                  id="content" 
                  v-model="this.$store.state.userInfoPost.content"
                  @input="dyn()
                  "
                  >
                  
                <label for="content"></label>
               </div> 

               <div>
                <input type="text" 
                  placeholder="titre ?"
                  name="title"
                  id="title"
                  v-model="this.$store.state.userInfoPost.title"
                  @input="dyn()"
                  >
                <label for="title"></label>
               </div>

               <div>
                <input type="file" @change="uploadImage">
                </div>  

                 <div>
                <input :disabled=" !local || !storage" type="submit" @click.prevent="this.recharge()
                ">
                </div> 
            </form>
           </div>
  
</template>

<script>
    
export default {
    name:"formulaireDePost",
    
    computed:{
        storage(){
             return JSON.parse(localStorage.getItem('status'))
        },
          // local(){
          //   let local = JSON.parse(localStorage.getItem('status'))
          //    let result = local[2]
          //   return result
          // }
    },
       
    data(){
        return{
           submitable: false,
           local: JSON.parse(localStorage.getItem('status')),
           file: null
          
        }
        
    },
    methods:{
        recharge(){
            if(!this.storage){
              return window.location.href = "http://localhost:3000/#/login";
            }
            else{
            // const formData = new FormData();
            // formData.append('imageUrl', this.file)      
            this.$store.dispatch('newPost', {title: this.$store.state.userInfoPost.title,
                                                                    content: this.$store.state.userInfoPost.content,
                                                                    userId: this.local[2],
                                                                    pseudo: this.local[1],
                                                                })
                                                          
            this.$emit('recharge')
            }
        },
        dyn(){
            console.log(this.$store.state.userInfoPost.content)
            // window.addEventListener('storage', (event) => {
            // let data = event.detail.storage;
            // console.log(data)
            //    })
             
            // if(!this.$store.state.connectionStatus[2]){
            //     console.log('X')
            // }
            // else{
            //     console.log(this.$store.state.connectionStatus[2])

            // }
        }
        // ,
        // uploadImage(e){
        //     this.file = e.target.files[0];
        //     // console.log(image)
        //     // this.file = image
        //     // console.log(this.file)
        // }
    }

}
</script>

   
<style>
    .formulairePost{
        width: 80%;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid black 1px;
        flex-direction: column;
    }
    input{
        padding: 20px;
        box-sizing: border-box;    
    }
    input[type="submit"]{
        width: 100px;
    }
</style>