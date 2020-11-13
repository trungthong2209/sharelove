
const infEvent = require('../model/infEvent');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-share-love.com-a@";
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const path = require("path");

class CreateEvent{
Event(req, res, next){
        res.render('createEvt');
        
}
async EventPost (req, res){
    const token = req.cookies.token;
    const userID =  jwt.verify(token, accessTokenSecret);
    var image  = req.files.image;
    const size = image.data.length;
    const extension = path.extname(image.name);
    const allowedExt = /png|jpeg|jpg|gif/;
    if(!allowedExt.test(extension)) throw "Tiện ích mở rộng không được hỗ trợ";
    if (size > 5000000) throw "Tệp phải nhỏ hơn 5MB";
    
    const result = await cloudinary.uploader.upload( image.tempFilePath , {folder: 'image', use_filename: true})
    const InfEvent = new infEvent({
        purpose:req.body.purpose,
        address:req.body.address,
        execution_date:req.body.execution_date,
        description:req.body.description,
        ID_image:[{
          multiple_image :result.public_id,
          image_url:result.secure_url,
        }],
        email_posted: userID.id,
  })  
      
    await InfEvent.save()
     .then(()=>{
       res.redirect('/home')
       
      })
      .catch(error =>{
       console.log(error);
     } ) 
  
}
}
module.exports = new CreateEvent();