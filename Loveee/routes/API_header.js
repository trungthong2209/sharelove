var express = require('express');
var router = express.Router();
const {api_image }= require('../controller/Room.js');
const api_calender= require('../controller/Calender.js');


router
.get('/api/imageUser', api_image)
.get('/api/getDateCalender', api_calender)
module.exports = router;