
const infEvent = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const date = require('date-and-time');

class CreateEvent{
async EventPost (req, res){
     const now = new Date();
     const  time_post = date.format(now, 'HH:mm DD/MM/YYYY');
    const token = req.cookies.token;
    const userID =  jwt.verify(token, accessTokenSecret);
    var image  = req.files.image;
    const size = image.data.length;
    const extension = path.extname(image.name);
    // check path image
    const allowedExt = /png|jpeg|jpg|gif/;
    if(!allowedExt.test(extension)) throw "Tiện ích mở rộng không được hỗ trợ";
    if (size > 5000000) throw "Tệp phải nhỏ hơn 5MB";
    //--end
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
        res.redirect('/Newsfeeds')
       
      })
      .catch(error =>{
      
          console.log(error);
     }) 
 
}
}
module.exports = new CreateEvent();