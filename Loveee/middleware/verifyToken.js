const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;

function auth (req, res, next){
      const token = req.cookies.token;
  if(token){
  try{
      jwt.verify(token, accessTokenSecret, function (err, verified) {
          req.userId = verified.id;
          next();

        })
  }catch(err){
            res.send(err)
}
  } else{
    res.json({
      status: "error",
      message: "Bạn chưa đăng nhập"
  });     
  }
}
module.exports = auth;