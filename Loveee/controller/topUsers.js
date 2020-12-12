
const donates = require('../model/donate');

class load_topUser {
    async topUser(req, res, next) {
        donates.getAll()
        .then((donate)=>{
            res.render('topUser', { topdonates: donate })
        })
       .catch(error=>{
            res.status(400).send('error' + error)
        })             
     }
}
module.exports = new load_topUser();