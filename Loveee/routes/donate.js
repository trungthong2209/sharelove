var express = require('express');

var router = express.Router();

const donate = require('../controller/donate.js');

router.post('/donate', donate.Donate)
router.get('/success', donate.Success)

module.exports = router;