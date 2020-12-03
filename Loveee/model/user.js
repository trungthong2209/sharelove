const mongoose = require('mongoose');
const bcrypt = require('bcrypt') 
const Schema = mongoose.Schema;

const User = new Schema({
    fullname : {
         type: String,
         required:true},
    login_name : {
         type: String,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      required:true},
    password: {type: String, required:true},
    email: {type: String, 
      lowercase: true,
      index: true},
    sex:{Type: String},
    Dob: {type: Date},
    Numberphone: {type: String},
    reset_link: {type: String},
    accesstoken:{type: String},
    imageUser:{type: String},
    tieusu:{type: String},
  });
User.pre('save', function (next) { 
    const user = this 
    bcrypt.hash(user.password, 10, (error, hash) => { 
        user.password = hash 
        next()
    })
 })
  
User.index({'$**': 'text'});
module.exports = mongoose.model('user', User)