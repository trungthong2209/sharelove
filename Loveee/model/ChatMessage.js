const mongoose = require('mongoose');
const date = require('date-and-time');
const ObjectId = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const ChatMessage = new Schema({
    post_id: { type: mongoose.Schema.ObjectId, ref: 'infEvents' },
    authorUsername: { type: mongoose.Schema.ObjectId, ref: 'users' },
    message: { type: String },
    timeSend: { type: String }
});
ChatMessage.pre('save', function (next) {
    const now = new Date();
    this.timeSend = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
})
ChatMessage.statics.getRoom = async function(room) {
    const ChatMessage = this;
    return ChatMessage.aggregate([
        {
            $match: { 'post_id': ObjectId(room) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'authorUsername',
                foreignField: '_id',
                as: 'messages'
            }
        },

        {
            $unwind: '$messages',
        },
        {
            $project: {
                _id: "$_id",
                Id_Event: "$messages.post_id",
                author_name: "$messages.fullname",
                author_url: "$messages.imageUser",
                timeSend: 1,
                message: 1
            }
        }
    ])
}


ChatMessage.index({ '$**': 'text' });
const Room = mongoose.model("ChatMessage", ChatMessage);

module.exports = Room;