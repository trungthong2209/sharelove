const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: process.env.Map_Provider,
   apiKey: process.env.Map_key, 
    formatter: null
};
 
const geocoder = NodeGeocoder(options);
// geocoder.geocode('29 champs elysée paris', function(err, res){
//     console.log(res)
// })
module.exports = geocoder;