const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infEvent = new Schema({
    purpose: {type: String},
    address: {type: String},
    execution_date: {type: String},
    description: {type: String},
    ID_image:[{
        multiple_image: { type: String},
        image_url:{type: String},
    }],
    user_joinEvent:[{type: mongoose.Schema.ObjectId, ref: 'User'}],
    TimePost: {type: Date, default: Date.now}, 
    email_posted: {type: mongoose.Schema.ObjectId, ref: 'User'},
});

infEvent.index({'$**': 'text'});
module.exports = mongoose.model('infEvent', infEvent)