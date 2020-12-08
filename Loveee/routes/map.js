var express = require('express');

var router = express.Router();
const {getMap, getAddress} = require('../controller/map')

router
.get('/map', getMap)
.get('/address/store', getAddress)

module.exports = router;
