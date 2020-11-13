var express = require('express');
var router = express.Router();

const CrtEvent = require('../controller/Event.js');
const verify = require('../middleware/verifyToken');

router
.get('/create', verify,  CrtEvent.Event)
.post('/create/CrtEvent', CrtEvent.EventPost);

module.exports = router;
