const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blog = new Schema({
    author: {type: mongoose.Schema.ObjectId, ref: 'users'},
    title: {type: String},
    content: {type: String},
    timeCreate: {type: Date, default: Date.now()}
      
    
});
const blog = mongoose.model("blog", blog);

module.exports = blog;