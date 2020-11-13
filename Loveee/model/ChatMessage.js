const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatMessage = new Schema({
    post_id: {type: mongoose.Schema.ObjectId, ref: 'infEvent'},
    messages: [
        {
            authorUsername: {type: mongoose.Schema.ObjectId, ref: 'user'},
            time: {type: Date, default: Date.now},
            message: String  
        }
    ]
});
const Room = mongoose.model("ChatMessage", ChatMessage);

module.exports = Room;