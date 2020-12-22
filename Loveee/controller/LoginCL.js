const User = require('../model/user');
const jwt = require("jsonwebtoken");
const formatAlert = require('./alert/alert');
const accessTokenSecret = process.env.accessTokenSecret;
class LoginCL {
    async checkLogin(req, res, next) {
        let login_name = req.body.uname.toLowerCase();
        let password = req.body.psw;
        await User.findOne({ login_name: login_name }, async (error, user) => {
            if (user) { 
                if(user.Action === false) return res.status(201).send(formatAlert('Tài khoản bạn đã bị khóa. Vui lòng liên hệ ADMIN để mở'))
                const same = await user.isValidPassword(password)
                if (same) {
                    const token = jwt.sign({ id: user._id, name: user.fullname, role: user.Role, avatar: user.imageUser }, accessTokenSecret);
                    res.cookie("token", token, { httpOnly: true });
                    res.redirect('/home')
                }
                else { res.status(201).send(formatAlert('Mật khẩu không chính xác')) }
            }
            else { res.status(404).send(formatAlert('Tài khoản không tồn tại'))}
        });
    }
    Logout(req, res, next) {
        res.clearCookie('token');
        loggedIn = null;
        res.redirect('/');
    }
}
module.exports = new LoginCL();