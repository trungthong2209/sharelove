
const infEvent = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const date = require('date-and-time');

const arr_image = [];
const id_image = [];
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
        if ( !allowedExt.test(image.name)) {  res.status(400).send('Tiện ích không được hỗ trợ')  }
          else{
            const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'image', use_filename: true })
            arr_image.push(result.secure_url);
            id_image.push(result.public_id)
          }
      }
      if (image2 != undefined) {
              if (!allowedExt.test(image2.name)) {  res.status(400).send('Tiện ích không được hỗ trợ') }
              else {
                const result2 = await cloudinary.uploader.upload(image2.tempFilePath, { folder: 'image', use_filename: true })
                arr_image.push(result2.secure_url);
                id_image.push(result2.public_id)
              }
            }
      if (image3 != undefined) {
            if ( !allowedExt.test(image3.name)) {  res.status(400).send('Tiện ích không được hỗ trợ')  }
              else{
                const result3 = await cloudinary.uploader.upload(image3.tempFilePath, { folder: 'image', use_filename: true })
                arr_image.push(result3.secure_url);
                id_image.push(result3.public_id)
              }
          }
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
              image_url:arr_image[2] ,
            },
            email_posted: userID.id,
            time_post: time_post,
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
      }
}
module.exports = new CreateEvent();