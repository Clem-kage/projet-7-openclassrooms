const mongoose = require('mongoose');


const postShema = mongoose.Schema({
    content: { type: String, required: true, maxlength: [100, 'le nombre maximum de caractéres de 15']},
    title: { type: String, required: false, maxlength: [50, 'le nombre maximum de caractéres de 15']},
    imageUrl: { type: String , required: false},
    userId: { type: String, required: true },
    usersLiked: {
        type: [String]
      },
    pseudo: { type: String, required: true},
    online: { type: Boolean, default: true}
   
},

{
    timestamps:  true
}
);

module.exports = mongoose.model('post', postShema);