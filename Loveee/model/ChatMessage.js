const mongoose = require('mongoose');
const date = require('date-and-time');

const Schema = mongoose.Schema;

const ChatMessage = new Schema({
    post_id: {type: mongoose.Schema.ObjectId, ref: 'infEvents'},
    authorUsername: {type: mongoose.Schema.ObjectId, ref: 'users'},
    message: {type: String },
    timeSend: {type: String}
});
ChatMessage.pre('save', function (next) { 
    const now = new Date();
    this.timeSend = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
 })

const Room = mongoose.model("ChatMessage", ChatMessage);

module.exports = Room;