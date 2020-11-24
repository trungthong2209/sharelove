// const NodeGeocoder = require('node-geocoder');
 const infEvent = require('../model/infEvent'); 
// const options = {
//   provider: process.env.Map_Provider,
//    apiKey: process.env.Map_key, 
//     formatter: null
// };
// const geocoder = NodeGeocoder(options);


async function getMap(req, res, next) {

   res.render('map')
  }

async function getAddress(req, res, next) {
  try {
    const stores = await infEvent.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {getMap, getAddress} 
 