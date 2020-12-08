var express = require('express');

var router = express.Router();

const donate = require('../controller/donate.js');

router
.post('/donate', donate.Donate)
.get('/success', donate.Success)
.get('/cancel',donate.cancel)
module.exports = router;