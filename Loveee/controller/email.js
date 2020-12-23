const mail = require('../model/mail');
const cloudinary = require('../service/cloudinary');
const formatAlertReturnHome = require('./alert/alertReturnHome');

class Email {
    async sendEmail(req, res, next) {
        const allowedExt = /png|jpeg|jpg|gif/;
        
        const option_image = {
            folder: 'avatar',
            format: 'png',
        }
         
        const email = new mail({
            subject: req.body.subject,
            content: req.body.content,
            author: req.userId,
        })
        if (req.files != null ) {
               if(req.files.image!= null) {
                var imagee = req.files.image;
                if (!allowedExt.test(imagee.name)) res.status(400).send(formatAlert("Tiện ích mở rộng không được hỗ trợ"));
                const result = await cloudinary.uploader.upload(imagee.tempFilePath, option_image)
                //avatar.push(result.secure_url);
                email.ID_image = result.secure_url;
               }
               if (req.files.image2 != undefined) {
                var image2 = req.files.image2;
                if (!allowedExt.test(image2.name)) {  return res.status(400).send(formatAlert('Tiện ích không được hỗ trợ')) }
                const result2= await cloudinary.uploader.upload(image2.tempFilePath, option_image)
                email.ID_image2 = result2.secure_url;
        }
        }
       
        email.save()
            .then(() => {
            return res.status(201).send(formatAlertReturnHome("Gửi thành công", '/'))
            })
            .catch(error => { res.status(400).send('Error' + error) })
    }
    getEmail(req, res, next){
        if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
        mail.getAll()
          .then((mails)=>{ res.status(200).send(mails) })
          .catch(error => { res.status(400).send('Error' + error) })

    }
}
module.exports = new Email();