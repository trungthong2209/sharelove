const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt') 

const User = new Schema({
    fullname : {type: String},
    login_name : {type: String},
    password: {type: String},
    email: {type: String},
    Numberphone: {type: String},
    reset_link: {type: String},
    accesstoken:{type: String}
    
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
 User.index({'$**': 'text'});
module.exports = mongoose.model('user', User)