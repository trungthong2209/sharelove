const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;

class LoginCL {

    async checkLogin(req, res, next) {
        var login_namee = req.body.uname;
        var login_name = login_namee;
        var password = req.body.psw;
        await User.findOne({ login_name: login_name }, (error, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        const token = jwt.sign({ id: user._id }, accessTokenSecret);
                        res.cookie("token", token, { httpOnly: true });
                        
                        res.redirect('/')
                    } else {
                        console.log(error);
                        res.status(400).json({
                        message: "Mật khẩu không chính xác"
                        });
                    }
                })
            }
            else {
                console.log(error);
                res.status(400).json({
             message: "Tài khoản không tồn tại"
                });
            }
        });
    }

    Logout(req, res, next) {
        res.clearCookie('token');
        res.redirect('/');
    }

}
module.exports = new LoginCL();