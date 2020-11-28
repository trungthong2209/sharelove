var express = require('express');
var router = express.Router();
const CrtEvent = require('../controller/Event.js');
const verify = require('../middleware/verifyToken');

router
.post('/create/CrtEvent', verify, CrtEvent.EventPost);

module.exports = router;
