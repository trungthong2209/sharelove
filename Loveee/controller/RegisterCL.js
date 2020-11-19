
const User = require('../model/user');
class RegisCL{

Register(req, res, next){
        res.render('Rigister')
}
Store(req, res, next){
  var login_namecheck = req.body.login_name;
  var emailcheck = req.body.email;
    const user = new User({
        fullname: req.body.fullname,
        email:req.body.email,
        login_name: req.body.login_name,
        Numberphone:req.body.Numberphone,
        password:req.body.psw,
       
})
User.findOne({email: emailcheck}, function(err, data){
        if(data==null){
                User.findOne({login_name: login_namecheck}, function(err, data)
          {
                if(data==null){
                        user.save()
                         .then(()=>
                         {   
                            return res.redirect('/');
                          })
                        .catch(error =>{
                         console.log(error);
                         res.json({
                                status: "error",
                                message: error,
                        });
                        });
                        }

                        else{
                                res.json({
                                        status: "error",
                                        message: "Login name already exist."
                                });
                         }
                
                })
       

}
else{
                res.json({
                        status: "error",
                        message: "Email already exist."
                });
        }
})
}
}

module.exports = new RegisCL();