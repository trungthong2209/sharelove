const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
    author: {type: mongoose.Schema.ObjectId, ref: 'users'},
    catalog: {type: String},
    ID_image: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    title: {type: String},
    short_description:{type: String},
    content: {type: String},
    timeCreate: {type: Date, default: Date.now()}  
    
});
const blogs = mongoose.model("blog", blog);
module.exports = blogs;