import { createStore, storeKey } from 'vuex'
import axios from 'axios'
// import dotenv from 'dotenv'
// const result  = dotenv.config();


export default createStore({



    state:{
        admin: ["admin"],
        userAdmin: false,
        posts:[],
        userLogin:{
            password:"",
            login:"",
            connected: false
        },
        userSignup:{
            password:"",
            login:"",
            email:"",
        },
        connectionStatus: "",
        userInfoPost:{
            title:"",
            content:"",
            imageUrl:""
        },
        singlePostId: '',
        singlePost:'',
        modificationPost:{
            modifTitle:'',
            modifContent:'',
        },
        comments:[],
        newComment:'',
        modifyComment: '',
        likeActive: false,
        authorOptions: false,
        authorOptionComment: false,

        users:[]
        



    },
    mutations:{
        loadPosts(state, posts){
           console.log(posts)
           state.posts = posts; 
        },
        
        connSucces(state, data){
           let loc = localStorage.getItem('status');
           state.connectionStatus = ["succès", data.pseudo];
           localStorage.setItem('status',JSON.stringify(state.connectionStatus));
           window.location.href = "http://localhost:3000/#/home"
           state.userLogin = {
            password:"",
            login:"",
           };
        //    if(data.pseudo.includes(state.admin)){
        //     console.log('admin')
        //     state.userAdmin = true
        //    }
        //     else{
        //     // console.log('normal')
        //     }
        
        },
        connSucces2(state, response){
            // console.log(response.user.admin)
           if(response.user.admin){
            state.userAdmin = true
           }
           state.connectionStatus.push(response.token)
           localStorage.setItem('status',JSON.stringify(state.connectionStatus));
           
        },
        connFail(state){
           let loc = localStorage.getItem('status')
           state.connectionStatus = ["fail"]
           localStorage.setItem('status',JSON.stringify(state.connectionStatus));
        },

        inscSucces(state, data){
           window.location.href = "http://localhost:3000/#/login"
           state.userSignup = { password:"",
                                login:"",
                                email:"",};
           console.log(data);
        },
        inscFail(state){
           alert('problème')
        },
        initialiseStore(state){
            localStorage.setItem('status', JSON.stringify(['fail']));
            
        },
        verify(state, local){
            localStorage.setItem('status', JSON.stringify(['fail']));
            console.log(local)
        },
        newPost(state, post){
            console.log(post)  
            state.userInfoPost =  {title:"",
                                   content:"",
                                   userId: "",
                                   imageUrl:""
                                   };
                                

        },
        verification(state){
            console.log('verif')
            if(!state.connectionStatus[2]){
                window.location.href = "http://localhost:3000/#/login"
            }
        },
        getSinglePost(state, res){
            let loc = JSON.parse(localStorage.getItem('status'))
            let result = res.usersLiked.length
            let persons = res.usersLiked
            res.usersLiked =  result
            res.persons =  persons
            state.singlePost = res
            if(persons.includes(loc[2])){
            state.likeActive = true
            }

            // console.log(loc[1], state.singlePost.pseudo)
            if(loc[1] ===  state.singlePost.pseudo){
            state.authorOptions = true    
            }
        },
        deletePost(state){
            window.location.href = "http://localhost:3000/#/home"
            console.log(state.posts)
        },
        modifyPost(state){
            state.modificationPost = {
                     modifTitle:'',
                     modifContent:'',
            }
            window.location.href = "http://localhost:3000/#/home"
        },
        loadComments(state, res){
            let loc = JSON.parse(localStorage.getItem('status'))
             res.forEach(item => {
                item.active = false;
                if(loc[1] === item.pseudo){
                     item.authorOptionComment = true
                }
             });
             state.comments = res 
            console.log(state.comments)
            console.log(res)
        },
        newComment(state, load){
            
            console.log(load[0])
            state.comments = ""
        },
        deleteComment(state, id){
            let updatedComm = state.comments.filter(item => item.id != id);
            state.comments = updatedComm 
        },
        addIdToLocal(state, id){
            let loc = JSON.parse(localStorage.getItem('status'))
            loc.push(id);
            localStorage.setItem('status',JSON.stringify(loc));
        },
        suppIdFromLocal(state, id){
            let loc = JSON.parse(localStorage.getItem('status'))
            loc.pop(id);
            localStorage.setItem('status',JSON.stringify(loc));
        },
        init(state){
            state.modifyComment = "";
        },
        addLike(state, payload){
            console.log(payload)
        },
        déconnexion(state){
            localStorage.clear();
            window.location.href = "http://localhost:3000/#/login"
            state.authorOptions = false
            state.userAdmin = false

        },
        reloadPostPage(state, postId){
            console.log(postId)
            window.location.href = `http://localhost:3000/#/post/${postId}`
        },
        getUsers(state, users){
            console.log(users)
            state.users = users; 
         },
         deleteUser(state){
            location.reload()
         }
        
        // noConnexion(){
        //     window.location.href = "http://localhost:3000/#/error"

        // }
        



   


        


    },

    actions:{
        loadPosts( {commit} ){
            axios
            .get('http://localhost:4000/api/post/home')
            .then(response=>{
              commit('loadPosts', response.data)
            })    
            .catch(error=>{
              alert('no Connexion with the backend')  
              commit('déconnexion')
            })
          },

        LoginUser( {commit}, userInfo ){
            axios
            .post("http://localhost:4000/api/auth/login", userInfo)
            .then(res =>{ console.log(res.data)
                
                commit("connSucces", userInfo),
                commit("connSucces2", res.data)
             })
             .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
                location.reload()
              })

            
            // .catch(err => {console.log(err)
            //     commit("connFail")})

        },
        SignupUser( {commit}, userInfo ){
            axios
            .post("http://localhost:4000/api/auth/signup", userInfo)
            .then(response =>{ console.log(response)
                commit("inscSucces", userInfo)
             })
            
            .catch(err => {console.log(err)
                commit("inscFail")})
              
          },
          initialiseStore({commit}){
            if(JSON.parse(localStorage.getItem('status')) == undefined){
                commit('initialiseStore');
            }
          },

          verify({commit}, payload){

            if(!payload || payload[0] != "succès"){
                commit('verify', payload );
            }
          },
          newPost({commit}, payload){
            axios
            .post("http://localhost:4000/api/post/home", payload)
            .then(response =>{ console.log(response)
                commit('newPost', payload);
             })
             console.log(payload)
             commit('loadPosts');
             this.dispatch('loadPosts')
             .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
              })

           
          },
          getSinglePost({commit}, payload){
            let id = payload
            axios.get(`http://localhost:4000/api/post/article/${id}`) 
            .then((response) => {
            //   this.post = response.data
                console.log(response.data)
                commit('getSinglePost', response.data)
            })
            .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
              })
          },
          deletePost({commit}, payload){
            if(confirm("voulez-vous vraiment supprimer ce post?")){
            axios
            .put(`http://localhost:4000/api/post/article/${payload[0]}/delete`, payload[1]) 
            .then((response) => {
            //   this.post = response.data
             console.log(response.data);
             commit('deletePost') 
             commit('loadPosts');
            })
             .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
              })
            }
            
          },
          modifyPost({commit}, payload){
            axios
            .put(`http://localhost:4000/api/post/article/${payload[1]}`, payload[0])
            .then(response =>{ console.log(response)
                console.log(response.data)
                console.log(payload)
                commit('modifyPost', payload);
                this.dispatch('loadPosts')
             })
             .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
              })
             
            },


            loadComments({commit}, id){
                axios
                .get(`http://localhost:4000/api/post/article/${id}/comment`)
                .then(response =>{
                    console.log(response.data)
                    commit('loadComments', response.data);

                 })
                 .catch(error=>{
                    alert('no Connexion with the backend')  
                    commit('déconnexion')
                  })
            },
            newComment({commit}, payload){
                axios
                .post(`http://localhost:4000/api/post/article/${payload[1]}/comment`, payload[0])
                .then(response =>{ 
                    console.log(response.data)
                    commit('newComment', payload);
                    this.dispatch('loadComments', payload[1])
                 })
                .catch(error=>{
                    alert('no Connexion with the backend')  
                    commit('déconnexion')
                  })
                 

                },
                deleteComment({commit}, payload){
                    if(confirm('etes vous sure de supprimer votre commentaire ?')){
                axios
                .put(`http://localhost:4000/api/post/comment/${payload[0]}/delete`, payload[1])
                .then(response =>{ 
                    console.log(response.data)
                    commit('deleteComment', payload)
                    this.dispatch('loadComments', payload)
            }  )
                .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
                })
                  }
           },
               
                modifyComment({commit}, payload){
                    if(JSON.parse(localStorage.getItem('status')).length <= 4){
                     axios
                    .put(`http://localhost:4000/api/post/comment/${payload[0]}`, payload[1])
                    .then(response =>{ 
                        console.log(response.data)
                        commit('suppIdFromLocal', payload[0]) 
                        commit('init');   
                        this.dispatch('loadComments', payload)
                    })
                    }
                    else{
                    
                    alert('no Connexion with the backend')  
                    commit('déconnexion')
                        // console.log(JSON.parse(localStorage.getItem('status')).length)
                    //   
                    }
                    }
                    

             ,
              addLike({commit}, payload){
                axios
                .patch(`http://localhost:4000/api/post/article/${payload[0]}/like`, payload[1])
                .then(response =>{ 
                    console.log(response.data)
                    commit('addLike', payload) 
                    this.dispatch('getSinglePost', payload[0])
                .catch(error=>{
                        alert('no Connexion with the backend')  
                        commit('déconnexion')
                      })    
              })     
            },
              deleteLike({commit}, payload){
                axios
                .patch(`http://localhost:4000/api/post/article/${payload[0]}/unlike`, payload[1])
                .then(response =>{ 
                    console.log(response.data)
                    console.log(payload)
                    commit('addLike', payload) 
                    this.dispatch('getSinglePost', payload[0])
              })     
              .catch(error=>{
                alert('no Connexion with the backend')  
                commit('déconnexion')
              })
            },

            getUsers({commit}, payload){
                axios
                .patch(`http://localhost:4000/api/post/admin`, payload)
                .then(response =>{ 
                    // console.log(response.data)
                    // console.log(payload)
                    commit('getUsers',response.data)
            })
            },
            deleteUser({commit}, payload){
                axios
                .patch(`http://localhost:4000/api/post/admin/user`, payload)
                .then(response =>{ 
                    console.log(response.data)
                commit('deleteUser')
                })

            }
    },
    modules:{

    }
})