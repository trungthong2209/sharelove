const User = require('../model/user');
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.accessTokenSecret;
class LoginCL {
    async checkLogin(req, res, next) {
        let login_name = req.body.uname.toLowerCase();
        let password = req.body.psw;
        await User.findOne({ login_name: login_name }, async (error, user) => {
            if (user) { 
                if(user.Action === false) return res.status(401).json('Tài khoản bạn đã bị khóa.')
                const same = await user.isValidPassword(password)
                if (same) {
                    const token = jwt.sign({ id: user._id, role: user.Role }, accessTokenSecret);
                    res.cookie("token", token, { httpOnly: true });
                    res.redirect('/home')
                }
                else { res.status(400).json({ message: "Mật khẩu không chính xác" }) }
            }
            else { res.status(400).json({ message: "Tài khoản không tồn tại" }) }
        });
    }
    Logout(req, res, next) {
        res.clearCookie('token');
        loggedIn = null;
        image = null;
        res.redirect('/');
    }
}
module.exports = new LoginCL();