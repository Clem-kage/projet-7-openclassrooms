const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userShema = mongoose.Schema({
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        pseudo: {type: String, required: true},
        admin: {type: Boolean, default: false, required: false},
        online: { type: Boolean, default: true},
},    
      {
        timestamps:  true
      }
);

userShema.plugin(uniqueValidator);
userShema.pre("save", async function(next){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
        next();
})

module.exports = mongoose.model('user', userShema); 
