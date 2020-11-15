var express = require('express');
var router = express.Router();
var createRoom = require("../controller/Room")
const verify = require('../middleware/verifyToken');
router
.get('/room/:room',verify, createRoom.Update_UserJoin)
.post('/room/:room',verify, createRoom.Save_message)
module.exports = router;