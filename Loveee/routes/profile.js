var express = require('express');
var router = express.Router();
const profile = require('../controller/profile');
const verify = require('../middleware/verifyToken');

router
.get('/profile', verify, profile)


module.exports = router;