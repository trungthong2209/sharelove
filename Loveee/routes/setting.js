var express = require('express');
var router = express.Router();
var setting = require('../controller/setting')
router

.get('/setting', setting.GetPage)
.post('/setting/profile', setting.Store)
.post('/setting/password', setting.ChangePassword)
module.exports = router;
