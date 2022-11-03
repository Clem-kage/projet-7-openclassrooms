const mongoose = require('mongoose');


const commShema = mongoose.Schema({
    content: { type: String, required: true, maxlength: [100, 'le nombre maximum de caractéres de 15']},
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    pseudo: {type: String, required: true},
    online: { type: Boolean }
},{
    timestamps:  true
  }
);

module.exports = mongoose.model('comment', commShema);