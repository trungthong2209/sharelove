const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;

function auth (req, res, next){
      const token = req.cookies.token;
  if(token){
  try{
      jwt.verify(token, accessTokenSecret, function (err, verified) {
        if(verified)  {
          req.userId = verified.id;
          next();

        }
        else {
          console.log(err)
        }
     })
     
  }catch(err){
            res.send(err)
}
  } else{
    res.status(200).json({
            message: "Bạn chưa đăng nhập"
  });     
  }
}
module.exports = auth;