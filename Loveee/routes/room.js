var express = require('express');
var router = express.Router();
const { Update_UserJoin} = require("../controller/Room");
const verify = require('../middleware/verifyToken');

router
.get('/room/:room',verify, Update_UserJoin)
module.exports = router;