const moment = require("moment");
const User = require('../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const accessTokenSecret = process.env.accessTokenSecret;

class Setting {
        async GetPage(req, res, next) {
                let token = req.cookies.token
                const ID = jwt.verify(token, accessTokenSecret);
                User.findById(ID.id)
                        .then((user) => {
                                var newDate = moment(user.Dob).utc().format("YYYY-MM-DD")
                                res.render('setting', { user: user, Dob: newDate })
                        })
                        .catch(error => {
                                console.log(error);
                        })
        }
        async Store(req, res, next) {
                const option_image = {
                        folder: 'avatar',
                        width: 150, height: 150,
                        gravity: "face",
                        crop: "thumb"
                }
                let token = req.cookies.token
                const ID = jwt.verify(token, accessTokenSecret);
                const allowedExt = /png|jpeg|jpg|gif/;
                if (req.files != null) {
                        var imagee = req.files.image;
                        console.log(imagee);
                        const extension = path.extname(imagee.name);
                        if (!allowedExt.test(extension)) throw "Tiện ích mở rộng không được hỗ trợ";
                        const result = await cloudinary.uploader.upload(imagee.tempFilePath, option_image)
                        const user = {
                                fullname: req.body.fullname,
                                Dob: req.body.dob,
                                email: req.body.email,
                                Numberphone: req.body.sdt,
                                tieusu: req.body.story,
                                imageUser: result.secure_url,
                        }
                        User.findById(ID.id, function (err, data) {
                                if (data) {
                                        data.updateOne(user)
                                                .then(() => {
                                                        image = result.secure_url;
                                                        res.redirect('/setting');
                                                })
                                                .catch((err) => {
                                                        console.log(err)
                                                })
                                }
                                else {
                                        res.satatus(404).json({
                                                message: "Không tìm thấy người dùng"
                                        });
                                }
                        })
                }
                else {
                        const user = {
                                fullname: req.body.fullname,
                                Dob: req.body.dob,
                                email: req.body.email,
                                Numberphone: req.body.sdt,
                                tieusu: req.body.story,
                        }
                        User.findById(ID.id, function (err, data) {
                                if (data) {
                                        data.updateOne(user)
                                                .then(() => {
                                                        res.redirect('/setting');
                                                })
                                                .catch((err) => {
                                                        console.log(err)
                                                })
                                }
                                else {
                                        res.satatus(404).json({ message: "Không tìm thấy người dùng" });
                                }
                        })

                }
        }
        ChangePassword(req, res, next) {
                let token = req.cookies.token
                const ID = jwt.verify(token, accessTokenSecret);
                const old_pass = req.body.old_password
                //newpassword
                const newpass = req.body.new_password
                //check 
                const passcheck = req.body.new1_password
                if (newpass === passcheck) {
                        User.findById(ID.id, function (err, data) {
                                if (data) {
                                        bcrypt.compare(old_pass, data.password, (error, same) => {
                                                if (same) {
                                                        bcrypt.hash(passcheck, 10, (error, hash) => {
                                                                data.updateOne({ password: hash })
                                                                        .then(() => {
                                                                                console.log("Cập nhật thành công")
                                                                                res.redirect('/setting');
                                                                        })
                                                                        .catch((err) => {
                                                                                console.log(err)
                                                                        })

                                                        })
                                                } else {
                                                        console.log(error);
                                                        res.status(400).json({ message: "Mật khẩu cũ không chính xác" });
                                                }
                                        })
                                }
                                else {
                                        console.log(err)
                                        res.satatus(404).json({ message: "Không tìm thấy người dùng" });
                                }
                        })
                }
                else {
                        res.satatus(400).json({ message: "Mật khẩu chưa trùng khớp" });
                }
        }
}

module.exports = new Setting();