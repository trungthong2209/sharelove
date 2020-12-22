const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
let MAILGUN_KEY = process.env.MAILGUN_KEY;
let CLIENT_URL = process.env.CLIENT_URL;
const mg = mailgun({ apiKey: MAILGUN_KEY, domain: DOMAIN });
const formatAlert = require('../controller/alert/alert');

function sendEmail(res, email, token){
    const data = {
        from: 'Sharelove.com@gmail.com',
        to: email,
        subject: 'Forgot Password Link',
        html: `
             <h2> Click on link to reset your password </h2>
             <p> ${CLIENT_URL}/forgetpassword/${token} </p>
            `
    };
    mg.messages().send(data, function (error, body) {
        if (error) { 
            return res.status(400).json({message: "error send token:" + error }) 
        }
        else {  
         return res.status(200).send(formatAlert(`Kiểm tra email ${email} và nhấn vào liên kết`))  }
    });
}
module.exports = { sendEmail };