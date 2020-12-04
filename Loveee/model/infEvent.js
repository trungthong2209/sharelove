const mongoose = require('mongoose');
const geocoder = require('../middleware/geocoder')
const request = require('request');
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
    ID_image: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    ID_image2: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    ID_image3: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    user_joinEvent: [{ type: mongoose.Schema.ObjectId, ref: 'users' }],
    time_post: { type: String },
    email_posted: { type: mongoose.Schema.ObjectId, ref: 'users' },
});
// infEvent.pre('save', async function (next) {
 
//     const address_1 = this.address_Ward+" "+this.address_District +" "+this.address_City +" Việt Nam"
      
//       var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
//       + encodeURIComponent(address_1) + '.json?access_token='
//       + process.env.API_mapbox + '&limit=1'; 
//       request({ url: url, json: true }, function (error, response) { 
//         if (error) { 
//             callback('Unable to connect to Geocode API', undefined); 
//         } 
//          else { 
  
//             var longitude = response.body.features[0].center[0] 
//             var latitude = response.body.features[0].center[1] 
//             var locations = response.body.features[0].place_name 
  
//             console.log("Latitude :", latitude); 
//             console.log("Longitude :", longitude); 
//             console.log("Location :", locations); 
//             this.location = {
//                 type: 'Point',
//                 coordinates: [longitude, latitude],
//                 formattedAddress: locations
//             }
//             console.log("Database:", this.location); 
//         } 
//     }) 
 
//     next();
// })
infEvent.index({ '$**': 'text' });
module.exports = mongoose.model('infEvent', infEvent)