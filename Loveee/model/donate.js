const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donate = new Schema({
    user_donate:[{type: mongoose.Schema.ObjectId, ref: 'Users'}],
    balance : {type: Number},
    your_money : {type: Number},
});

module.exports = mongoose.model('donate', donate)