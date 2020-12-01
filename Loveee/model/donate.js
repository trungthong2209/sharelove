const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donate = new Schema({
    userID:{type: mongoose.Schema.ObjectId, ref: 'Users'},
    money :  {type: String},
    timeDonate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('donate', donate)