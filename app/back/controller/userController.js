const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const userModel = require('./../models/userModel.js')

const admin = {
  mail : "admin",
  pseudo: "admin",
  password: "admin"
}


exports.signup = async (req, res, next)=>{
      const result = bcrypt.hash(req.body.password, 10)

      const {email, password, pseudo} = req.body
      
      try {
        const user = await userModel.create({email, pseudo, password});
        res.status(201).json(({user}));
      }
      catch(error) {
        res.status(200).json({error});
      }
},



exports.login = (req, res, next)=>{
  userModel.findOne({ pseudo: req.body.pseudo })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }  
       if(valid && user.online && user.pseudo === admin.pseudo){
        console.log("ur")
       user.admin = true
       res.status(200).json({
          user,
          token: jwt.sign(
            { userId: user._id},
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '2h' },
            // { expiresIn: '120' },

          )
        })  
       } 
       else if(valid && user.online){
        user.admin = false
        res.status(200).json({
          user,
          token: jwt.sign(
            { userId: user._id},
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '2h' },
            // { expiresIn: '120' },
          )
        })
       }
       else{
        res.status(404).json({message: "compte supprimé"})
       }
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};