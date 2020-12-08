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
.get('/manage_event',function(req, res, next) {
   res.render('manage_event');
})
.get('/manage_account',function(req, res, next) {
   res.render('manage_account');
})
.get('/manage_blog',function(req, res, next) {
   res.render('manage_blog');
})

module.exports = router;
