const User = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
let MAILGUN_KEY = process.env.MAILGUN_KEY;
let CLIENT_URL = process.env.CLIENT_URL;
const mg = mailgun({apiKey : MAILGUN_KEY , domain: DOMAIN});
const forgotPassword_Token = process.env.forgotPassword_Token;

class Fogetpass{  
async FogetPassword(req, res, next){
    res.render('foget')
}
async fogetPass(req, res, next){
        
    var login_name = req.body.name_login;
    
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
                               error:" error update reset link " });
                               
                    }
                    else{
                        mg.messages().send(data, function (error, body) {
                           if(error){
                           
                               return res.status(400).json({
                                message: "error send token:" + error,
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
      
     });   
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
});    
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
    });
}) 

}   else { 
             res.json({
                 "status": "error",
                 message: "Userr does not exist"
             });           
        }
       
      })    
 }

}
module.exports = new Fogetpass();