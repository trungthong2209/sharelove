var express = require('express');

var router = express.Router();
const Login = require('../controller/LoginCL.js');

router
.post('/login', Login.checkLogin)
.get('/logout', Login.Logout)

module.exports = router;
