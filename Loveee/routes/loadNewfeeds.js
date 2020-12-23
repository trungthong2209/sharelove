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
.get('/contact',function(req, res, next) {
   res.render('contact');
})
// .get('/donate',function(req, res, next) {
//    res.render('donate');
// })

module.exports = router;
