const User = require('../model/user');
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
let MAILGUN_KEY = process.env.MAILGUN_KEY;
let CLIENT_URL = process.env.CLIENT_URL;
const mg = mailgun({ apiKey: MAILGUN_KEY, domain: DOMAIN });
const forgotPassword_Token = process.env.forgotPassword_Token;

class Fogetpass {
    async FogetPassword(req, res, next) {
        res.render('foget')
    }
    async fogetPass(req, res, next) {
        const login_name = req.body.name_login;
        await User.findOne({ login_name: login_name }, async function (error, user) {
            if (user) {
                const token = jwt.sign({ id: user._id }, forgotPassword_Token);
                const data = {
                    from: 'Sharelove.com@gmail.com',
                    to: user.email,
                    subject: 'Forgot Password Link',
                    html: `
                         <h2> Click on link to reset your password </h2>
                         <p> ${CLIENT_URL}/forgetpassword/${token} </p>
                        `
                };
                await user.updateOne({ reset_link: token }, function (error, success) {
                    if (error) { return res.status(400).json({ error: " error update reset link " }) }
                    else {
                       mg.messages().send(data, function (error, body) {
                            if (error) { return res.status(400).json({message: "error send token:" + error }) }
                            else {  return res.status(200).json({ message: `Kiểm tra email ${user.email} và nhấn vào liên kết` }) }
                        });
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