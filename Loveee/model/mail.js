const mongoose = require('mongoose');
const date = require('date-and-time');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const mail = new Schema({
    subject: { type: String },
    content: { type: String },
    ID_image: {type: String },
    timeSend: { type: String },
    author: { type: mongoose.Schema.ObjectId, ref: 'users' },
});
mail.pre('save', function (next) {
    const now = new Date();
    this.timeSend = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
})
mail.statics.getAll = async function () {
    const mail = this;
    return mail.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $unwind: '$users'
        }, {
            $project: {
                _id: 1,
                subject: 1,
                content: 1,
                timeSend: 1,
                ID_image: 1,
                user_name: "$users.fullname",
                role: "$users.Role",
                imageUser: "$users.imageUser",
            }
        },
        {
            $sort: { _id: -1 }
        },
        
    ])
}
mail.index({ '$**': 'text' });
module.exports = mongoose.model('mail', mail)