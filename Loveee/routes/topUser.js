
 var express = require('express');
var router = express.Router();
var topUser = require("../controller/topUsers")

router

.get('/Top-donate', topUser.topUser)

module.exports = router;