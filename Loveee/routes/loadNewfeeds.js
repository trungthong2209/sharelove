var express = require('express');

var router = express.Router();
const loadNewFeeds = require('../controller/loadNewFeeds.js');
const verify = require('../middleware/verifyToken');


            
router
.get('/home',verify, loadNewFeeds.newsFeed);


module.exports = router;
