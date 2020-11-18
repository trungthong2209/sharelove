var express = require('express');

var router = express.Router();
const loadNewFeeds = require('../controller/NewsFeeds.js');
const verify = require('../middleware/verifyToken');

router.get('/', function(req, res, next) {
    res.render('index');
 })
//test
router.get('/home', verify, function(req, res, next) {
   res.render('Newsfeeds');
})
router.get('/news', function(req, res, next) {
    res.render('news');
 });
 router.get('/List_event',function(req, res, next) {
    res.render('List_event');
 });
 router.get('/Top-donate',function(req, res, next) {
    res.render('topUser');
 });

module.exports = router;
