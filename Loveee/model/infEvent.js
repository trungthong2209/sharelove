const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infEvent = new Schema({
    purpose: {type: String},
    address_City : {type: String},
    address_District : {type: String},
    address_Ward : {type: String},
    time:{type: String},
    date: {type: String},
    description: {type: String},
    ID_image:[{
        multiple_image: { type: String},
        image_url:{type: String},
    }],
    user_joinEvent:[{type: mongoose.Schema.ObjectId, ref: 'User'}],
    time_post: {type: String},
    email_posted: {type: mongoose.Schema.ObjectId, ref: 'User'},
});

infEvent.index({'$**': 'text'});
module.exports = mongoose.model('infEvent', infEvent)