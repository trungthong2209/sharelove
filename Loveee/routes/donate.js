var express = require('express');

var router = express.Router();

const donate = require('../controller/donate.js');
const topdonate = require('../controller/test')


router.post('/donate', donate.Donate)
router.get('/success', donate.Success)
router.get('/test', topdonate)

module.exports = router;