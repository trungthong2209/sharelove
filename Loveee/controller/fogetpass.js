const User = require('../model/user');
const jwt = require("jsonwebtoken");
const forgotPassword_Token = process.env.forgotPassword_Token;
const mailgun = require('../service/mailgun');

class Fogetpass {
    async FogetPassword(req, res, next) {
        res.render('foget')
    }
    async fogetPass(req, res, next) {
        const login_name = req.body.name_login;
        await User.findOne({ login_name: login_name }, async function (error, user) {
            if (user) {
                const token = jwt.sign({ id: user._id }, forgotPassword_Token);
              
                await user.updateOne({ reset_link: token }, function (error, success) {
                    if (error) { return res.status(400).json({ error: " error update reset link " }) }
                    else {
                        mailgun.sendEmail(res, user.email, token);
                    }
                })
            }
            else {  res.status(404).json({ message: "Người dùng không tồn tại" })  }
        });
    }
    async GetresetPassword(req, res, next) {
        const resetPasswordToken = req.params.token;
        await User.findOne({ reset_link: resetPasswordToken }, (error, user) => {
            if (user) { res.render('newpass', { token: resetPasswordToken }) }
            else { res.status(404).json({ message: "Người dùng không tồn tại" }) }
        });
    }
    async PostresetPassword(req, res, next) {
        const resetPasswordToken = req.params.token;
        const new_password = req.body.re_password;
        await User.findOne({ reset_link: resetPasswordToken }, (error, user) => {
            if (user) {
                 user.UpdatePassword_Forget(new_password)
                    .then(() => { res.redirect('/') })
                    .catch((err) => { return res.status(400).json({ error: " Error save new password" + err }) })
            } else {  res.status(404).send( "Người dùng không tồn tại" ) }
        })
    }
}
module.exports = new Fogetpass();