const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatMessage = new Schema({
    post_id: {type: mongoose.Schema.ObjectId, ref: 'infEvents'},
    authorUsername: {type: mongoose.Schema.ObjectId, ref: 'users'},
    message: {type: String },
    timeSend: {type: String}
});
const Room = mongoose.model("ChatMessage", ChatMessage);

module.exports = Room;