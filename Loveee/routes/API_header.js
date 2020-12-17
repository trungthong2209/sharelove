var express = require('express');
var router = express.Router();
const {api_image }= require('../controller/Room.js');


router
.get('/api/imageUser', api_image);

module.exports = router;