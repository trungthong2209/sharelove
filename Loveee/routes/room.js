var express = require('express');
var router = express.Router();
var createRoom = require("../controller/Room")

router
.get('/room/:room', createRoom.Update_UserJoin)
.post('/room/:room', createRoom.Save_message)
module.exports = router;