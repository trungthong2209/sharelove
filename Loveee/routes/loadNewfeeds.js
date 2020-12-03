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
.get('/address/store', getAddress)

.get('/List_event',function(req, res, next) {
    res.render('List_event');
 })
 .get('/info_event',function(req, res, next) {
   res.render('info_event');
})
.get('/info_blog',function(req, res, next) {
   res.render('info_blog');
})
 .get('/news',function(req, res, next) {
   res.render('news');
})


module.exports = router;
