const paypal = require('../middleware/paypal')
const donate = require('../model/donate');

const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const money = [];

async function Donate(req, res, next) {
    const total = req.body.money;
    const token = req.cookies.token;

    if (total < 0 || total == undefined) throw "Không ủng hộ được thì thôi";
    money.push(total);
    if (token != undefined || token != null) {
        const userID = jwt.verify(token, accessTokenSecret);
        money.push(userID.id);
    }
    console.log(money)

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Donate",
                    "sku": "001",
                    "price": money[0],
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": money[0]
            },

        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    console.log(payment.links[i].href)
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
                "total": money[0]
            }
        }]
    };
paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            if (money[1] != undefined || money[1] != null) {
                var done = new donate({
                    userID: money[1],
                    money: money[0],
                })
                done.save()
                    .then(() => {
                        console.log("Save schema donate success")
                    })
                    .catch(error => {
                        console.log("save fail " + error);
                    })
            }
            money.length = 0;
            res.redirect('/home');
        }
    });
}
module.exports = { Donate, Success }