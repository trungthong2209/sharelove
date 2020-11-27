
const infEvent = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const date = require('date-and-time');
const array_Image = [];

class CreateEvent {

  async EventPost(req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send(
        'No file uploaded'
      );
    }
    else {
      const now = new Date();
      const time_post = date.format(now, 'HH:mm DD/MM/YYYY');
      const token = req.cookies.token;
      const userID = jwt.verify(token, accessTokenSecret);
      var image = req.files.image;
      var image2 = req.files.image2;
      var image3 = req.files.image3;
      const extension = path.extname(image.name);
      const allowedExt = /png|jpeg|jpg|gif/;
      if (!allowedExt.test(extension)) throw "Tiện ích mở rộng không được hỗ trợ";
      const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'image', use_filename: true })
      if (image2 != undefined) {
        const result2 = await cloudinary.uploader.upload(image2.tempFilePath, { folder: 'image', use_filename: true })
        if (image3 != undefined) {
          const result3 = await cloudinary.uploader.upload(image3.tempFilePath, { folder: 'image', use_filename: true })
          const InfEvent = new infEvent({
            purpose: req.body.title,
            address_City: req.body.city,
            address_District: req.body.district,
            address_Ward: req.body.wards,
            time: req.body.picker,
            date: req.body.date,
            description: req.body.description,
            ID_image: {
              multiple_image: result.public_id,
              image_url: result.secure_url,
            },
            ID_image2: {
              multiple_image: result2.public_id,
              image_url: result2.secure_url,
            },
            ID_image3: {
              multiple_image: result3.public_id,
              image_url: result3.secure_url,
            },
            email_posted: userID.id,
            time_post: time_post,
          })

          await InfEvent.save()
            .then(() => {
              console.log("lưu thành công");
              res.redirect('/home')
            })
            .catch(error => {
              console.log(error);

            })

        }
        else {
          const InfEvent = new infEvent({
            purpose: req.body.title,
            address_City: req.body.city,
            address_District: req.body.district,
            address_Ward: req.body.wards,
            time: req.body.picker,
            date: req.body.date,
            description: req.body.description,
            ID_image: {
              multiple_image: result.public_id,
              image_url: result.secure_url,
            },
            ID_image2: {
              multiple_image: result2.public_id,
              image_url: result2.secure_url,
            },
            email_posted: userID.id,
            time_post: time_post,
          })

          await InfEvent.save()
            .then(() => {
              console.log("lưu thành công");
              res.redirect('/home')
            })
            .catch(error => {
              console.log(error);

            })
        }
      }
      else {

        const InfEvent = new infEvent({
          purpose: req.body.title,
          address_City: req.body.city,
          address_District: req.body.district,
          address_Ward: req.body.wards,
          time: req.body.picker,
          date: req.body.date,
          description: req.body.description,
          ID_image: {
            multiple_image: result.public_id,
            image_url: result.secure_url,
          },
          email_posted: userID.id,
          time_post: time_post,
        })

        await InfEvent.save()
          .then(() => {
            console.log("lưu thành công");
            res.redirect('/home')
          })
          .catch(error => {
            console.log(error);

          })
      }

    }

  }
}
module.exports = new CreateEvent();