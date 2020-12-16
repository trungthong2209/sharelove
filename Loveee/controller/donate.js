const paypal = require('../middleware/paypal')
const donates = require('../model/donate');
const infEvent = require('../model/infEvent')
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;

async function Donate(req, res, next) {
    var amount = null;
    var user = null;
    var idEvent = null;
    const total = req.body.money;
    const token = req.cookies.token;
    //  idEvent = req.query.event;
    idEvent = '5fd62ba0f9f5173270aa958b';
    const checkRole = await infEvent.isValidRole(idEvent)
    const checkDate = await infEvent.isValidDate(idEvent)
    if (checkDate == false) return res.status(201).json("Bài đăng đã hết hạn");
    if (total < 0 || total == 0 || total == undefined) return res.status(201).json("Không ủng hộ được thì thôi");
    amount = total;
    if (token != undefined || token != null) {
        user = jwt.verify(token, accessTokenSecret).id
    }
    if (checkRole[0].role === 'silver_User') return res.status(401).json("Người đăng bài không có quyền ủng hộ")
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/home"
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
            console.log(payment.transactions[0].amount.total);
            const donate = new donates({
                userID: user,
                money: payment.transactions[0].amount.total,
                eventID: idEvent,
            })
            donate.save()
                .then(() => { 
                    console.log("Save schema donate success")
                })
                .catch(error => { 
                    console.log("save fail " + error);
        })
            res.redirect('/home');
        }
    });
}
module.exports = { Donate, Success }