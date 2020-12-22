const mail = require('../model/mail');
const cloudinary = require('../service/cloudinary');
const formatAlert = require('./alert/alert');

class Email {
    async sendEmail(req, res, next) {
        const allowedExt = /png|jpeg|jpg|gif/;
        const avatar = [];
        const option_image = {
            folder: 'avatar',
            format: 'png',
        }
        if (req.files != null) {
            var imagee = req.files.image;
            const extension = path.extname(imagee.name);
            if (!allowedExt.test(extension)) res.status(400).send(formatAlert("Tiện ích mở rộng không được hỗ trợ"));
            const result = await cloudinary.uploader.upload(imagee.tempFilePath, option_image)
            avatar.push(result.secure_url);
        }
        const email = new mail({
            subject: req.body.subject,
            content: req.body.content,
            author: req.userId,
        })
        if (avatar.length > 0) {
            user.ID_image = avatar[0];
        }
        email.save()
            .then(() => {
                //res.redirect('/home')
                //res.status(201).send('Gửi thành công')
               return res.status(201).send(formatAlert("Gửi thành công"))
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