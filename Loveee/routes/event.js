var express = require('express');

var router = express.Router();
const topEvent = require('../controller/top_Event.js');

const detail_event = require('../controller/detail_event')
router
.get('/List_event', topEvent.Top_event)
.get('/event/:id', detail_event)



module.exports = router;
