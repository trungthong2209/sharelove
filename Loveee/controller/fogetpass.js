const User = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxcfc9851b495e4c588808592559093e9f.mailgun.org';
let MAILGUN_KEY = '4cc3b4817d4b703bba1c4eebcbe7d382-53c13666-e3110969';
let CLIENT_URL = 'http://localhost:3000';
const mg = mailgun({apiKey : MAILGUN_KEY , domain: DOMAIN});
const forgotPassword_Token = process.env.ACCESS_TOKEN_SECRET || "forgotPassword-secret-share-love.com-a@";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-share-love.com-a@";
// const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-share-love.com-a@";
class Fogetpass{  
FogetPassword(req, res, next){
    res.render('foget')
}
async fogetPass(req, res, next){
        
    var login_name = req.body.remail;
    
      await User.findOne({login_name: login_name}, async function (error, user) { 
           if (user) { 
            const token =  jwt.sign({ id: user._id}, forgotPassword_Token);
            const data = {
                        from: 'Sharelove.com@gmail.com',
                        to: user.email,
                        subject: 'Forgot Password Link',
                        html: `
                         <h2> Click on given link to reset your password </h2>
                         <p> ${CLIENT_URL}/forgetpassword/${token} </p>
                        `
                     };

              await user.updateOne({reset_link: token}, function(error, success){
                    if(error){
                        
                           return res.status(400).json({
                               error:" error update reset link "
                            
                            });
                               
                    }
                    else{
                        mg.messages().send(data, function (error, body) {
                           if(error){
                           
                               return res.status(400).json({
                                message: "error send token"
                               })
                            }
                            else{
                                   return res.json({
                                   message: `Check mail ${user.email}  and click link `
                                })
                            }
                        });
                  } 
                })
                }  
                 else { 
                   res.json({
                      status: "error",
                        message: "Email does not exist"
            });           
       }
      
     }).lean();   
}
async GetresetPassword(req, res, next){
   var resetPasswordToken = req.params.token;
   await User.findOne({reset_link: resetPasswordToken}, (error, user) => { 
      if (user) { 
             res.render('newpass', {token: resetPasswordToken});
          }  
     else { 
            res.json({
                "status": "error",
                message: "Userr does not exist"
            });           
       }
}).lean();    
}

async PostresetPassword(req, res, next){
    var resetPasswordToken = req.params.token;
    var new_password = req.body.newpassword;
   
    await User.findOne({reset_link: resetPasswordToken}, (error, user) => { 
       if (user) { 
        bcrypt.hash(new_password, 10, (error, hash) => { 
        new_password = hash
        user.updateOne({password: new_password}, function(err, success){
            if(err){
                return res.status(400).json({error:" Error save new password"});
            }
            else{
                user.updateOne({reset_link: ""}, function(err, success){
                    if(err){
                        return res.status(400).json({error:" Error save reset link password:"+err});
                    }
                    else{
                    res.redirect('/');
                 }
              
         })

        }
    }).lean();
}) 

}   else { 
             res.json({
                 "status": "error",
                 message: "Userr does not exist"
             });           
        }
       
      }).lean()    
 }

}
module.exports = new Fogetpass();