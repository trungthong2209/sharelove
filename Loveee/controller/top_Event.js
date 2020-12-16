const infEvents = require('../model/infEvent');
class load_event  {

     Top_event(req, res, next) {
        infEvents.getallEvent()
        .then((events)=>{
            res.render('List_event', {events});
        })
       .catch(error=>{
            res.status(400).send('error' + error)
        })      
    }
}
module.exports = new load_event();