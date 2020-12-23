const infEvents = require('../model/infEvent');
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.accessTokenSecret;
 async function calender(req, res, next) {
    const token = req.cookies.token;
    var userID = null;
    if (token != undefined) {
        jwt.verify(token, accessTokenSecret, function (err, verified) {
            if (verified) {
                userID = verified.id;
            }
            else { return res.redirect('/logout') }
        })
    }
    const userJoined = await infEvents.getUserjoined(userID)
    res.status(201).json(userJoined)
}
module.exports = calender;