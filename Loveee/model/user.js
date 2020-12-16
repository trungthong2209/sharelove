const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const User = new Schema({
  fullname: {
    type: String,
    required: true
  },
  login_name: {
    type: String,
    lowercase: true,
    index: true,
    required: true
  },
  password: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    index: true
  },
  sex: { type: String,
    enum: ['Nam', 'Nữ'] 
  },
  Dob: { type: Date },
  Role: {
    type: String,
    enum: ['silver_User', 'Admin', 'gold_User'],
    default: 'silver_User',
  },
  Action: {type: Boolean, default: true},
  Numberphone: { type: String },
  reset_link: { type: String },
  accesstoken: { type: String },
  imageUser: { type: String },
  tieusu: { type: String },
});

User.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})

User.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}
User.methods.isValidAction =  function() {
  const user = this;
   return user.Action   
}
User.methods.UpdatePassword = async function(password) {
  const user = this;
  const hash = await bcrypt.hash(password, 10)
  return await user.updateOne({ password: hash })
 }

User.methods.UpdatePassword_Forget = async function(password) {
  const user = this;
  const hash = await bcrypt.hash(password, 10)
  return user.updateOne({ password: hash ,$unset: { reset_link: ""}})
}
User.statics.getInfo =  function(id) {
  const User = this;
  if(id!=undefined || id!=null ) return User.findById(id)
  else {
    return 'user'
  }
}
User.statics.getName = async function(id) {
  const User = this;
  return User.findById(id)
      .then(user => user.fullname); 
}

User.statics.getImage = async function(id) {
  const User = this;
  return User.findById(id)
  .then(user => user.imageUser); 
}

User.statics.getID = async function(id) {
  const User = this;
  return User.findById(id)
  .then(user => user.id); 
}

User.index({ '$**': 'text' });
module.exports = mongoose.model('user', User)