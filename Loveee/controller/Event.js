
const infEvent = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const date = require('date-and-time');
const request = require('request');
const arr_image = [];//array image URL
const id_image = []; //array image ID
class CreateEvent {
  async EventPost(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No file uploaded');
    }
    else {
      const now = new Date();
      const time_post = date.format(now, 'HH:mm DD/MM/YYYY');
      const token = req.cookies.token;
      const userID = jwt.verify(token, accessTokenSecret);

      var image = req.files.image;
      var image2 = req.files.image2;
      var image3 = req.files.image3;

      const allowedExt = /png|jpeg|jpg|gif/;
      
      if (image != undefined) {
        if (!allowedExt.test(image.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
        else {
          const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'image', use_filename: true })
          arr_image.push(result.secure_url);
          id_image.push(result.public_id)
        }
      }
      if (image2 != undefined) {
        if (!allowedExt.test(image2.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
        else {
          const result2 = await cloudinary.uploader.upload(image2.tempFilePath, { folder: 'image', use_filename: true })
          arr_image.push(result2.secure_url);
          id_image.push(result2.public_id)
        }
      }
      if (image3 != undefined) {
        if (!allowedExt.test(image3.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
        else {
          const result3 = await cloudinary.uploader.upload(image3.tempFilePath, { folder: 'image', use_filename: true })
          arr_image.push(result3.secure_url);
          id_image.push(result3.public_id)
        }
      }
      const address_1 = req.body.wards + " " + req.body.district + " " + req.body.city + " Việt Nam";

      var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address_1) + '.json?access_token='
        + process.env.API_mapbox + '&limit=1';
      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          callback('Unable to connect to Geocode API', undefined);
        }
        else {

          //var longitude = response.body.features[0].center[0] 
          //var latitude = response.body.features[0].center[1] 
          //var locations = response.body.features[0].place_name 
          const InfEvent = new infEvent({
            purpose: req.body.title,
            address_City: req.body.city,
            address_District: req.body.district,
            address_Ward: req.body.wards,
            time: req.body.picker,
            date: req.body.date,
            description: req.body.description,
            ID_image: {
              multiple_image: id_image[0],
              image_url: arr_image[0],
            },
            ID_image2: {
              multiple_image: id_image[1],
              image_url: arr_image[1],
            },
            ID_image3: {
              multiple_image: id_image[2],
              image_url: arr_image[2],
            },
            email_posted: userID.id,
            time_post: time_post,
            location: {
              type: 'Point',
              coordinates: [response.body.features[0].center[0], response.body.features[0].center[1]],
              formattedAddress: response.body.features[0].place_name
            }
          })

          await InfEvent.save()
            .then(() => {
              console.log("lưu thành công");
              arr_image.length = 0;
              id_image.length = 0;
              res.redirect('/home')
            })
            .catch(error => {
              console.log(error);

            })
        }
      })
    }
  }
}
module.exports = new CreateEvent();