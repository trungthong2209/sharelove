var express = require('express');
var router = express.Router();

const FogetPass = require('../controller/fogetpass.js');


router
.get('/foget', FogetPass.FogetPassword)
.post('/foget/store', FogetPass.fogetPass)
.get('/forgetpassword/:token', FogetPass.GetresetPassword)
.post('/forgetpassword/:token/store', FogetPass.PostresetPassword)


module.exports = router;
