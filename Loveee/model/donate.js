const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');

const donate = new Schema({
    userID: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    money: { type: String },
    timeDonate: { type: String }  
});
donate.pre('save', function (next) {
    const now = new Date();
    this.timeDonate = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
})

module.exports = mongoose.model('donate', donate)