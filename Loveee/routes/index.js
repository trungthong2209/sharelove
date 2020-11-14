var express = require('express');
var router = express.Router();
var createRoom = require("../controller/Room")
router
.get('/', function(req, res, next) {
   res.render('index');
})
.get('/room/:room', createRoom.Update_UserJoin)
.post('/room/:room', createRoom.Save_message)
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
