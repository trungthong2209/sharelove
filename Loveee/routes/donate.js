var express = require('express');

var router = express.Router();

const donate = require('../controller/donate.js');

router
.get('/donate/:event', donate.getPageDonate) 
.post('/donate/:event', donate.Donate)
.get('/success', donate.Success)

//.get('/cancel',donate.cancel)
module.exports = router;