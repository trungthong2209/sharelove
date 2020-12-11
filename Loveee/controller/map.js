const infEvent = require('../model/infEvent'); 
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
  } catch (err) { res.status(500).json({ error: 'Server error' }) }
}
module.exports = {getMap, getAddress} 
 