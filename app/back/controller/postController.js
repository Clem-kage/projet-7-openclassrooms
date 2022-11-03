
const modelPost = require('./../models/postModel.js');
const fs = require('fs');
const {promisify} = require('util');
const pipline = promisify(require("stream").pipeline);
const express = require('express');
const modelComment = require('./../models/comModel.js'); 
// const comModel = require('./../models/comModel.js');
const userModel = require('./../models/userModel.js');
const multer = require('./../middlewares/multer.js')
const jwt = require('jsonwebtoken');
const path = require('path');


exports.getOnePost = (req, res, next)=>{
    modelPost.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
},


exports.getPosts = (req, res, next)=>{
    modelPost.find({online: true})
             .sort({createdAt: 'desc'})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
},


exports.deletePost = (req, res, next)=>{
  const clientUserId = req.body.userId
  const decodedTokenClient = jwt.verify(clientUserId, 'RANDOM_TOKEN_SECRET');
  const userIdClient = decodedTokenClient.userId;
    // modelPost.findOne({_id: req.params.id})
    // .then(post =>{
    //  const filename = post.imageUrl.split('/image/')[1]
    // //  Suppresssion de l'image dans le dossier back
    //  fs.unlink(`./image/${filename}`, ()=>{
      
  modelPost.findById({ _id: req.params.id }, 'userId')
  .then((data) =>{

    // console.log(data)
    const postUserId = data.userId;
    const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
    const userIdPost = decodedTokenData.userId;

    // console.log("userIdClient: " +userIdClient ,  "data.userId: " +userIdPost)
           if(userIdClient === userIdPost){
       modelPost.updateOne({ _id: req.params.id }, { online: false, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'post supprimé !'}))
      .catch(error => res.status(400).json({ error })); 
           }
           else{
            console.log('bad user')
           }    
    })
    .catch(error => res.status(500).json({ error }));
}





exports.createPost  = async(req, res, next)=>{

  // function createImageUrl(req) {
  //   let pathToImage = req.file.path.replace("\\", "/");     // replace \ with /
  //   const protocol = req.protocol;                         // http or https
  //   const host = req.get("host");                         // localhost:3000
  //   return `${protocol}://${host}/${pathToImage}`;       // http://localhost:3000/uploads/1234567890.jpg
  // };
    // const obj = JSON.parse(req.body.modelPost);
    // delete postObject._id;
    let fileName;
    if(req.file){ 
      
      try{
              if(req.file.size > 700000){
                throw Error({message:'image trop grande'})
              }
      }
      catch{
              res.status(201).json({message: 'probleme'})
              console.log(req.files)
      }
      fileName = req.body.userId + Date.now() + '.jpg';
      await pipline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../../image/${fileName}`
          // path.join(__dirname, 'images' + fileName)
        ) 
       )
    }

    const obj = {title, content, userId, pseudo} = req.body
    // const objetFinal = JSON.parse(obj)
    delete obj._id 
    // const obj = JSON.parse(data)

    const post = new modelPost({
        // ...postObject,
        ...obj,
        imageUrl: req.file !== null ? '.image/' + fileName : "",
        // imageUrl: `${req.protocol}://${req.get('host')}/image/${req.imageUrl}`,
        // imageUrl: createImageUrl(req),
        usersLiked: []
    });
    post.save()
    // sauvegarde dansla base de donnée
     .then((data) => res.status(201).json({data}))
     .catch(error => res.status(400).json({ error }));
},



exports.modifyPosts = (req, res, next)=>{
const clientUserId = req.body.userId
const decodedTokenClient = jwt.verify(clientUserId, 'RANDOM_TOKEN_SECRET');
const userIdClient = decodedTokenClient.userId;



const postObjet = {content, title} = req.body
console.log(clientUserId)

  modelPost.findById({ _id: req.params.id }, 'userId')
  .then((data) =>{

    const postUserId = data.userId;
    const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
    const userIdPost = decodedTokenData.userId;

    // console.log(  "clientUserId: " +userIdClient,  "data.userId: " +userIdPost)
           if(userIdClient === userIdPost){
             modelPost.updateOne({ _id: req.params.id }, { ...postObjet, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'post modifié !' }))
            .catch(error => res.status(400).json({ error }));
           }
           else{
            console.log('bad user')
           }
          }
  )
  .catch(error => res.status(404).json({ error }));

   
    // const postObjet = req.file ?
    // // si la requete contient une image
    // {
    //   ...JSON.parse(req.body.modelPost),
    //   imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    // } : 
    // // sinon
    // { ...req.body } ;

  
},




exports.addLikes = (req, res, next)=>{
      //  const user = req.body.userId

       const postUserId = req.body.userId;
       const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
       const user = decodedTokenData.userId;

       modelPost.findByIdAndUpdate(
        req.params.id, 
        {
           $addToSet: {usersLiked:  user}
        },
       {new: true},
       (err, docs)=>{
        if (err) return res.status(400).send({err})
        else{
          return res.status(200).send({message:"like ajouté"});
        }
       }
        
       )


      }


    //  // Pour la route READ = Ajout/suppression d'un like / dislike à un post
    // // Like présent dans le body
    // let like = req.body.like
    // // On prend le userID
    // let userId = req.body.userId
    // // On prend l'id du post
    // let postId = req.params.id
  
    // if (like === 1) { // Si il s'agit d'un like
    //   modelPost.updateOne({
    //       _id: postId
    //     }, {
    //       // On push l'utilisateur et on incrémente le compteur de 1
    //       $push: {
    //         usersLiked: userId
    //       },
    //       $inc: {
    //         likes: +1
    //       }, // On incrémente de 1
    //     })
    //     .then(() => res.status(200).json({
    //       message: 'j\'aime ajouté !'
    //     }))
    //     .catch((error) => res.status(400).json({
    //       error
    //     }))
    // }
    // if (like === -1) {
    //   modelPost.updateOne( // S'il s'agit d'un dislike
    //       {
    //         _id: postId
    //       }, {
    //         $push: {
    //           usersDisliked: userId
    //         },
    //         $inc: {
    //           dislikes: +1
    //         }, // On incrémente de 1
    //       }
    //     )
    //     .then(() => {
    //       res.status(200).json({
    //         message: 'Dislike ajouté !'
    //       })
    //     })
    //     .catch((error) => res.status(400).json({
    //       error
    //     }))
    // }
    // if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
    //   modelPost.findOne({
    //       _id: postId
    //     })
    //     .then((Post) => {
    //       if (Post.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
    //         modelPost.updateOne({
    //             _id: postId
    //           }, {
    //             $pull: {
    //               usersLiked: userId
    //             },
    //             $inc: {
    //               likes: -1
    //             }, // On incrémente de -1
    //           })
    //           .then(() => res.status(200).json({
    //             message: 'Like retiré !'
    //           }))
    //           .catch((error) => res.status(400).json({
    //             error
    //           }))
    //       }
    //       if (Post.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
    //         modelPost.updateOne({
    //             _id: postId
    //           }, {
    //             $pull: {
    //               usersDisliked: userId
    //             },
    //             $inc: {
    //               dislikes: -1
    //             }, // On incrémente de -1
    //           })
    //           .then(() => res.status(200).json({
    //             message: 'Dislike retiré !'
    //           }))
    //           .catch((error) => res.status(400).json({
    //             error
    //           }))
    //       }
    //     })
    //     .catch((error) => res.status(404).json({
    //       error
    //     }))
    // }
  
exports.deleteLike = (req, res, next)=>{
  // const user = req.body.userId

  const postUserId = req.body.userId;
  const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
  const user = decodedTokenData.userId;

  

  modelPost.findByIdAndUpdate(
    req.params.id, 
    {
       $pull: {usersLiked: user}
   },
   {new: true},
   (err, docs)=>{
    if (err) return res.status(400).send({err})
    else{
      return res.status(200).send({message:"like enlevé"});
    }
   }
   )
}


exports.addComment = (req, res, next)=>{
  let userId = req.body.userId;
  let postId = req.params.id;
  let content  = req.body.content
  let pseudo = req.body.pseudo
  
  const comment = new modelComment({
     userId: userId,
     postId: postId,
     content: content,
     pseudo: pseudo,
  });

  comment.save()
  .then(() => res.status(201).json({ message: 'commentaire posté !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.getComments = (req, res, next)=>{
  const postIdUrl = req.params.id

  modelComment.find({postId: postIdUrl, online: null} )
          .select('-createdAt -updatedAt')
    .then((data)=> res.status(200).json(data))
    .catch(error => res.status(404).json({ error }));

};

exports.suppComment = (req, res, next)=>{


  const clientUserId = req.body.userId
  const decodedTokenClient = jwt.verify(clientUserId, 'RANDOM_TOKEN_SECRET');
  const userIdClient = decodedTokenClient.userId;


   const comment = req.params.id;
  modelComment.findById({ _id: comment}, 'userId')
  .then((data) =>{
       console.log(data.userId)
    const postUserId = data.userId;
    const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
    const userIdPost = decodedTokenData.userId;

    // console.log(  "clientUserId: " +userIdClient,  "data.userId: " +userIdPost)

            if(userIdClient === userIdPost){ 
       modelComment.findByIdAndUpdate({_id: comment}, {online: false})
    .then(()=> res.status(200).json({message: "commentaire supprimé"}))
    .catch(error => res.status(500).json({ error })) 
    }
    else{
     console.log('bad user');
    }

   })
   .catch(error => res.status(404).json({ error }))
}

exports.modifyComment = (req, res, next)=>{
 
  const clientUserId = req.body.userId
const decodedTokenClient = jwt.verify(clientUserId, 'RANDOM_TOKEN_SECRET');
const userIdClient = decodedTokenClient.userId;

   const commentId = req.params.id;
   const commObjet = req.body.content;

   modelComment.findById({ _id: commentId}, 'userId')
   .then((data) =>{
  //       console.log(data.userId)
     const postUserId = data.userId;
     const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
     const userIdPost = decodedTokenData.userId;
 
     console.log(  "clientUserId: " +userIdClient,  "data.userId: " +userIdPost)
 
             if(userIdClient === userIdPost){ 
   modelComment.findByIdAndUpdate({_id: commentId}, {content: commObjet})

   .then(()=> res.status(200).json({message: "commentaire modifié"}))
   .catch(error => res.status(404).json({ error }));
}
else{
  console.log('bad user');
}
})
.catch(error => res.status(404).json({ error }))
}

// admin
exports.findUsers = (req, res, next)=>{
     const postUserId = req.body.userId;
     const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
     const userIdPost = decodedTokenData.userId;
     const userAdmin = "633c7ce06501d970984d79bb"
     if(userIdPost === userAdmin){
       userModel.find({online: true}, )
           .sort({createdAt: 'desc'})
      .then(users => res.status(200).json(users))
      .catch(error => res.status(404).json({ error }));
    }else{
      console.log(userAdmin+'///////'+userIdPost)
      .catch(error => res.status(404).json({ message:'t es pas admin' }));
    }

}
,
exports.suppUser = (req, res ,next)=>{
      const postUserId = req.body.userId;
      const decodedTokenData = jwt.decode(postUserId, 'RANDOM_TOKEN_SECRET');
      const userIdPost = decodedTokenData.userId;
      const userAdmin = "633c7ce06501d970984d79bb"

      
      if(userIdPost === userAdmin){
        
        userModel.updateOne({ _id: req.body.userDeleted}, {online: false, _id: req.body.userDeleted})
        .then(() =>{ 
          res.status(200).json({ message: 'utilisateur supprimé !'})
              modelPost.updateMany({pseudo: req.body.pseudo}, {$set: {online: false}})
              .then((posts)=>{
                userModel.findOneAndUpdate(({ pseudo: req.body.pseudo }, {compteActif: false}))
                .then((user)=>{
                   console.log(user.compteActif)
                })
              })
         })
        .catch(error => res.status(400).json({ error }));            
      }
}

