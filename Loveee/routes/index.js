var express = require('express');
var router = express.Router();
var createRoom = require("../../../../Loveee/updatecode_cap1/sharelove/Loveee/controller/Room")

router.get('/setting',function(req, res, next) {
   res.render('setting');
});


module.exports = router;
