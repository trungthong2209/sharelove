var express = require('express');
var router = express.Router();


const verify = require('../middleware/verifyToken');

const del_Event = require('../controller/deleteEvent.js');


router
.get('/delete/:id',verify, del_Event.DeletePost);


module.exports = router;
