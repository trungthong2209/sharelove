var express = require('express');
var router = express.Router();
const { Save_message, Update_UserJoin} = require("../controller/Room");
const verify = require('../middleware/verifyToken');

router
.get('/room/:room',verify, Update_UserJoin)
.post('/room/:room/store', Save_message)
module.exports = router;