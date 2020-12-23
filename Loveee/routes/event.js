var express = require('express');

var router = express.Router();
const verify = require('../middleware/verifyToken');

const getForm = require('../controller/editEvent.js');
const topEvent = require('../controller/top_Event.js');
const detail_event = require('../controller/detail_event')
router
.get('/List_event', topEvent.Top_event)
.get('/event/:id', detail_event)
.get('/edit/:id', verify, getForm.getFormEdit)
.post('/edit/:id', verify, getForm.eidtEvent )

module.exports = router;
