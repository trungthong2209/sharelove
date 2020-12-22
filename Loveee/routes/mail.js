var express = require('express');
var router = express.Router();
const mail = require('../controller/email.js');
const verify = require('../middleware/verifyToken');

router
.post('/sendemail', verify, mail.sendEmail)
.get('/getemail', verify, mail.getEmail)
module.exports = router;
