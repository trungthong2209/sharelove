const paypal = require('../service/paypal')
const donates = require('../model/donate');
const infEvent = require('../model/infEvent')
const jwt = require("jsonwebtoken");
const formatAlert = require('./alert/alert');
const accessTokenSecret = process.env.accessTokenSecret;
var amount = null;
var user = null;
var idEvent = null;
async function getPageDonate(req, res, next) {
    const event = req.params.event;
        res.render('donate', { event: event })
     }    
async function Donate(req, res, next) {   
    idEvent = req.params.event;
    const total = req.body.money;
    const token = req.cookies.token;
   console.log(idEvent)
    const checkRole = await infEvent.isValidRole(idEvent)
    const checkDate = await infEvent.isValidDate(idEvent)
    //if (checkDate == false) return res.status(201).send(formatAlert("Bài đăng đã hết hạn"))
    //if (total < 0 || total == 0 || total == undefined) return res.status(201).send(formatAlert("Không ủng hộ được thì thôi"))
    amount = total;
    if (token != undefined || token != null) { 
       jwt.verify(token, accessTokenSecret, function (err, verified) {
                if (verified) {
                    user = verified.id;
                }
                else { return res.redirect('/logout') }
            })
        }
    if (checkRole[0].role === 'silver_User')  return res.status(201).send(formatAlert("Người đăng bài không có quyền ủng hộ"))
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://spreadlovee.herokuapp.com/success",
            "cancel_url": "http://spreadlovee.herokuapp.com/home"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Donate",
                    "sku": "001",
                    "price": amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}
function Success(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": amount
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            infEvent.findById(idEvent).then( async (doc)=>{
                const newMoney = parseInt(doc.numberDonate) +parseInt(amount);
                await doc.updateOne({numberDonate:newMoney})
            })
            const donate = new donates({
                userID: user,
                money: amount,
                eventID: idEvent,
            })
            donate.save()
                .then(() => {  console.log("Save schema donate success") })
                .catch(error => { console.log("save fail " + error) })
            res.redirect('/home');
        }
    });
}
module.exports = { Donate, Success, getPageDonate }