var express = require('express');

var router = express.Router();
const loadNewFeeds = require('../controller/NewsFeeds.js');
const verify = require('../middleware/verifyToken');

router.get('/', function(req, res, next) {
    res.render('index');
 })

router.get('/home', verify, loadNewFeeds.newsFeed)

router.get('/news', function(req, res, next) {
    res.render('news');
 });

 router.get('/List_event',function(req, res, next) {
    res.render('List_event');
 });
 router.get('/Top-donate',function(req, res, next) {
    res.render('topUser');
 });
 router.get('/blog',function(req, res, next) {
   res.render('blog');
});
router.get('/create_blog',function(req, res, next) {
   res.render('create_blog');
});
router.get('/map',function(req, res, next) {
   res.render('map');
});
router.get('/pro',function(req, res, next) {
   res.render('profile');
});

module.exports = router;
