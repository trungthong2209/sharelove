const infEvent = require('../model/infEvent');
const User = require('../model/user');
const donate = require('../model/donate');
const moment = require("moment");
async function newProfile(req, res, next) {
    if(req.userId==undefined) return res.status(401).send('Unauthorized')
        const user = await User.getInfo(req.userId);
        var newDate = moment(user.Dob).utc().format("DD/MM/YYYY")                             
        const total = await donate.getTotalbyUser(req.userId);
        infEvent.getProfile(req.userId)
        .then((infevents)=>{
            donate.getProfile(req.userId)
            .then((alldonate)=>{              
                    res.render('profile',{ infevents, user, alldonate, total, newDate})  
            })
        })
}
module.exports = newProfile ;