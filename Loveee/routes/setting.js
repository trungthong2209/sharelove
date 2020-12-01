var express = require('express');
var router = express.Router();
var setting = require('../controller/setting')
const verify = require('../middleware/verifyToken');

router
.get('/setting', verify, setting.GetPage)
.post('/setting/profile', setting.Store)
.post('/setting/password', setting.ChangePassword)
module.exports = router;
