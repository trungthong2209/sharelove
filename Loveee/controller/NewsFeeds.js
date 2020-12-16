
const infEvents = require('../model/infEvent');
const Users = require('../model/user');
const donates = require('../model/donate');
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.accessTokenSecret;

class loadNewFeeds {
    async newsFeed(req, res, next) {
       const token = req.cookies.token;
       var userID = null;
      if(token!=undefined){
        userID = jwt.verify(token, accessTokenSecret).id;
        }
         const user = await Users.getInfo(userID);
         const userJoined = await infEvents.getUserjoined(userID)
         infEvents.getallEvent()
         .then((events)=>{
            infEvents.getTop()
            .then((top_event)=>{
                  donates.getTop()
                  .then((top_donate)=>{
                    res.render('Newsfeeds', {userJoined: userJoined, infevents: events, user: user, topdonates: top_donate, top_event: top_event})
                  })
                  .catch(error=>{
                    res.status(400).send('Error' + error)
                })
            })
            .catch(error=>{
                res.status(400).send('Error' + error)
            })
        })
        .catch(error=>{
            res.status(400).send('Error' + error)
        })                       
    } 
}
module.exports = new loadNewFeeds();