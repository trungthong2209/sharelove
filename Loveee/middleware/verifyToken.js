const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-share-love.com-a@";

function auth (req, res, next){
      const token = req.cookies.token;

      if(!token) return res.send('You can login ^_^');
      try{
      jwt.verify(token, accessTokenSecret, function (err, verified) {
          req.userId = verified.id;
          next();

        })
     }catch(err){
            res.send(err)
}
}
module.exports = auth;