var express = require('express');

var router = express.Router();
const loadNewFeeds = require('../controller/NewsFeeds.js');
const verify = require('../middleware/verifyToken');
const {getMap, getAddress} = require('../controller/map')

router
.get('/', function(req, res, next) {
    res.render('index');
 })

.get('/home', loadNewFeeds.newsFeed)

.get('/map', getMap)
.get('/address/store',verify, getAddress)

.get('/List_event',function(req, res, next) {
    res.render('List_event');
 })

.get('/Top-donate',function(req, res, next) {
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

module.exports = router;
