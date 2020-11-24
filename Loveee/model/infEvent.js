const mongoose = require('mongoose');
const geocoder = require('../middleware/geocoder')
const Schema = mongoose.Schema;

const infEvent = new Schema({
    purpose: { type: String },
    address_City: { type: String },
    address_District: { type: String },
    address_Ward: { type: String },
    location: { 
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    time: { type: String },
    date: { type: String },
    description: { type: String },
    ID_image: [{
        multiple_image: { type: String },
        image_url: { type: String },
    }],
    user_joinEvent: [{ type: mongoose.Schema.ObjectId, ref: 'Users' }],
    time_post: { type: String },
    email_posted: { type: mongoose.Schema.ObjectId, ref: 'Users' },
});
infEvent.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address_City)
    console.log(loc[0].longitude,loc[0].latitude)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    next();
})
infEvent.index({ '$**': 'text' });
module.exports = mongoose.model('infEvent', infEvent)