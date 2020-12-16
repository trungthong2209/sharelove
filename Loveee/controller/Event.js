const infEvent = require('../model/infEvent');
const cloudinary = require('../middleware/cloudinary');
const request = require('request');


class CreateEvent {
  async EventPost(req, res) {
     const arr_image = [];
     const id_image = []; 
     const allowedExt = /png|jpeg|jpg|gif/;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No file upload') 
    }
    else {
      const image = req.files.image;
      const image2 = req.files.image2;
      const image3 = req.files.image3;    
      const option_image = {
           folder: 'image', 
           format: 'jpg',
           transformation: [
          { width: 600, 
            crop: "scale" },
          {  quality: "100" }
        ]}

       if (image != undefined) {
        if (!allowedExt.test(image.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
        else {
          const result = await cloudinary.uploader.upload(image.tempFilePath, option_image)
          arr_image.push(result.secure_url);
          id_image.push(result.public_id)
        }
      }
      if (image2 != undefined) {
        if (!allowedExt.test(image2.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
        else {
          const result2 = await cloudinary.uploader.upload(image2.tempFilePath, option_image)
          arr_image.push(result2.secure_url);
          id_image.push(result2.public_id)
        }
      }
      if (image3 != undefined) {
        if (!allowedExt.test(image3.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
       else {
          const result3 = await cloudinary.uploader.upload(image3.tempFilePath, option_image)
          arr_image.push(result3.secure_url);
          id_image.push(result3.public_id)
        }
      }
      const option_video = {
        resource_type: "video",
         chunk_size: 6000000,
          folder: 'video', 
          eager_async: true,
      }
      // if (video != undefined) {
      //      console.log(video);
      //       const result_video = await cloudinary.uploader.upload(video.tempFilePath, option_video)
      //       console.log(result_video)
      //       arr_image.push(result_video.secure_url);
      //       id_image.push(result_video.public_id)
          
      //   }    
      const address_1 = req.body.wards + " " + req.body.district + " " + req.body.city + " Việt Nam";
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address_1) + '.json?access_token=' + process.env.API_mapbox + '&limit=1';
      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          callback('Unable to connect to Geocode API', undefined);
        }
        else {
          const InfEvent = new infEvent({
            purpose: req.body.title,
            address_City: req.body.city,
            address_District: req.body.district,
            address_Ward: req.body.wards,
            address_stress: req.body.stress,
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
            email_posted: req.userId,
            location: {
              type: 'Point',
              coordinates: [ response.body.features[0].center[0], response.body.features[0].center[1] ],
              formattedAddress: response.body.features[0].place_name
            }
          })
           InfEvent.save()
            .then(() => {
              arr_image.length = 0;
              id_image.length = 0;
              res.redirect('/home')
            })
            .catch(error => { res.status(400).send('Error'+error) })
        }
      })
    }
  }
}
module.exports = new CreateEvent();