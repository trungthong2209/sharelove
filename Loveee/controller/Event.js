
const infEvent = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const date = require('date-and-time');


class CreateEvent{
   
async EventPost (req, res){

if(!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send(
           'No file uploaded'
    );
   }
  else {
    const now = new Date();
    const  time_post = date.format(now, 'HH:mm DD/MM/YYYY');
    const token = req.cookies.token;
    const userID =  jwt.verify(token, accessTokenSecret);
    var image  = req.files.image;
    const extension = path.extname(image.name);
    const allowedExt = /png|jpeg|jpg|gif/;
    if(!allowedExt.test(extension)) throw "Tiện ích mở rộng không được hỗ trợ";
    const result = await cloudinary.uploader.upload( image.tempFilePath , {folder: 'image', use_filename: true})
    const InfEvent = new infEvent({
        purpose:req.body.title,
        address_City : req.body.city,
        address_District : req.body.quan,
        address_Ward : req.body.phuong,
        time: req.body.picker,
        date: req.body.date,
        description:req.body.description,
        ID_image:[{
          multiple_image :result.public_id,
          image_url:result.secure_url,
        }],
        email_posted: userID.id,
        time_post: time_post,
  })  
      
    await InfEvent.save()
     .then(()=>{
        console.log("lưu thành công");
         res.redirect('/home')
       })
      .catch(error =>{
          console.log(error);
      
     }) 
    }
  
}
}
module.exports = new CreateEvent();