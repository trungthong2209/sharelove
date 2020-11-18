const User = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;
// const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-share-love.com-a@";

class LoginCL{
   
 async checkLogin(req, res, next){
        
        var login_namee = req.body.uname;
        var login_name = login_namee.toLowerCase();
        var password  = req.body.psw;
   await User.findOne({login_name: login_name},  (error, user) => { 
            if (user) { 
                 bcrypt.compare(password, user.password, (error, same) => { 
                    if (same) {
                        const token =  jwt.sign({ id: user._id}, accessTokenSecret );
                      
                       res.cookie("token", token, {httpOnly: true});
                              
                       res.redirect('/');
                      } else {  
                         console.log(error);
                        res.json({
                            status: "error",
                            message: "Password is not correct."
                        });          
                }  
                })
            } 
            else { 
                console.log(error);
                res.json({
                    status: "error",
                    message: "Email does not exist"
                });           
           }
    });
}

Logout(req, res, next){
    res.clearCookie('token')
   
    res.redirect('/' );
}
}
module.exports = new LoginCL();