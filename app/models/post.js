const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postShema = new Schema({
    title: {
        type: String,
        required: true,
},
    description: {
        type: String,
        required: true,
},  
    author: {
        type: String,
        required: true,
},
    img: {
        type: String,
        required: false,
},

}, {timestamps: true});


const Post = mongoose.model('Post', postShema);

module.exports = Post;