
const User = require('../model/user');
class RegisCL {

        Register(req, res, next) {
                res.render('Rigister')
        }
        Store(req, res, next) {
                var login_namecheck = req.body.login_name;
                var emailcheck = req.body.email;
                //const avatar_nam = "https://res.cloudinary.com/share-love/image/upload/v1605793821/avatar/pngtree-vector-users-icon-png-image_4144740_ujffkh.jpg";
                //const avatar_nu = "https://res.cloudinary.com/share-love/image/upload/v1606137189/avatar/t%E1%BA%A3i_xu%E1%BB%91ng_ftlawb.png"
                const sex = req.body.sex;
                const avatar = null;
                if(sex=="Nam"){
                        avatar = "https://res.cloudinary.com/share-love/image/upload/v1605793821/avatar/pngtree-vector-users-icon-png-image_4144740_ujffkh.jpg";
                }
                else {
                        avatar=  "https://res.cloudinary.com/share-love/image/upload/v1606137189/avatar/t%E1%BA%A3i_xu%E1%BB%91ng_ftlawb.png"
                }
                console.log("Avt:" + avatar)
                const user = new User({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        login_name: req.body.login_name,
                        Numberphone: req.body.Numberphone,
                        password: req.body.psw,
                        sex: sex,
                        imageUser: avatar,        
                })
                User.findOne({ email: emailcheck }, function (err, data) {
                        if (data == null) {
                                User.findOne({ login_name: login_namecheck }, function (err, data) {
                                        if (data == null) {
                                                user.save()
                                                        .then(() => {
                                                                return res.redirect('/');
                                                        })
                                                        .catch(error => {
                                                                console.log(error);
                                                                res.status(400).json({
                                                                       
                                                                        message: error,
                                                                });
                                                        });
                                        }

                                        else {
                                                res.status(400).json({
                                                        
                                                        message: "Tài khoản đã tồn tại"
                                                });
                                        }

                                })


                        }
                        else {
                                res.status(400).json({
                                        
                                        message: "Email đã tồn tại"
                                });
                        }
                })
        }
}

module.exports = new RegisCL();