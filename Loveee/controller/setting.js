const moment = require("moment");
const User = require('../model/user');
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const { isBuffer } = require("lodash");
const allowedExt = /png|jpeg|jpg|gif/;

class Setting {
        async GetPage(req, res, next) {
              
                User.findById(req.userId)
                        .then((user) => {
                                var newDate = moment(user.Dob).utc().format("YYYY-MM-DD")
                                res.render('setting', { user: user, Dob: newDate })
                        })
                        .catch(error => { res.status(400).json({ error: error }); })
        }
        async Store(req, res, next) {
                const avatar = [];
                const option_image = {
                        folder: 'avatar',
                        width: 150, height: 150,
                        radius: "max",
                       // gravity: "face",
                        crop: "fill",
                        format: 'jpg',
                }
                if (req.files != null) {
                        var imagee = req.files.image;
                        const extension = path.extname(imagee.name);
                        if (!allowedExt.test(extension)) res.send("Tiện ích mở rộng không được hỗ trợ");
                        const result = await cloudinary.uploader.upload(imagee.tempFilePath, option_image)
                        avatar.push(result.secure_url);
                }
                const user = {
                        fullname: req.body.fullname,
                        Dob: req.body.dob,
                        email: req.body.email,
                        Numberphone: req.body.sdt,
                        sex:  req.body.sex,
                        tieusu: req.body.story,
                }
                if (avatar.length > 0) {
                        user.imageUser = avatar[0];
                }
                User.findByIdAndUpdate(req.userId, user)
                        .then(() => {
                                if(avatar.length > 0){
                                    image = avatar[0];
                                }
                              res.redirect('/setting');
                        })
                        .catch((err) => { res.status(400).json({ error: err }) })
        }
        async ChangePassword(req, res, next) {
                const old_pass = req.body.old_password
                //new password
                const newpass = req.body.new_password
                //check 
                const passcheck = req.body.new1_password
                if (newpass === passcheck) {
                        await User.findById(req.userId, async function (err, user) {
                                if (user) {
                                        const same = await user.isValidPassword(old_pass)
                                        if (same) {
                                                user.UpdatePassword(newpass)
                                                        .then(() => { res.redirect('/setting') })
                                                        .catch((err) => { res.status(400).json({ error: err }) })
                                        }
                                        else { res.status(400).json({ message: "Mật khẩu cũ không chính xác" }) }
                                }
                                else { res.satatus(404).json({ message: "Không tìm thấy người dùng" }); }
                        })
                }
                else { res.satatus(400).json({ message: "Mật khẩu chưa trùng khớp" }); }
        }
}

module.exports = new Setting();