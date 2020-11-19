const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt') 

const User = new Schema({
    fullname : {type: String,
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
      index: true
    },
    Numberphone: {type: Number},
    reset_link: {type: String},
    accesstoken:{type: String},
    image:{type: String}
  });
User.pre('save', function (next) { 
    const user = this 
    bcrypt.hash(user.password, 10, (error, hash) => { 
        user.password = hash 
        next()
    })
 })
 User.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  } 
  User.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT(),
           image: this.image
    };
  };
  
User.index({'$**': 'text'});
module.exports = mongoose.model('user', User)