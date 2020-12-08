var express = require('express');

var router = express.Router();
const loadNewFeeds = require('../controller/NewsFeeds.js');
router

.get('/', function(req, res, next) {
    res.render('index');
 })
.get('/home', loadNewFeeds.newsFeed)
 .get('/news',function(req, res, next) {
   res.render('news');
})


module.exports = router;
