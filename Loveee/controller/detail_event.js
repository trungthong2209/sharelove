const infEvents = require('../model/infEvent');
const donates = require('../model/donate')
function detail_event(req, res, next) {
    const idEvent = req.params.id;
    infEvents.getDetail(idEvent)
    .then((event)=>{
        donates.getTotal(event[0]._id)
             .then((value)=>{
                console.log(value)
                 res.render('info_event', { event: event })
        })
               .catch(error=>{
                res.status(400).send('Error' + error)
              })
     })
    .catch(error=>{
        res.status(400).send('Error' + error)
    })
}
module.exports = detail_event;