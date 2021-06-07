var express = require('express');

var router = express.Router();

const donate = require('../controller/donate.js');

router
.post('/donate', donate.Donate)
.get('/success', donate.Success)
.post('/donate/v1-paypal', donate.DonateAPI)
.get('/donate/v1-success', donate.DonateAPI)
.get('/cancel',function(req, res, next) {
    res.render('List_event');
 });
module.exports = router;