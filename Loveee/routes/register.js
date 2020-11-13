var express = require('express');
var router = express.Router();
const Regis = require('../controller/RegisterCL');


router
.get('/register', Regis.Register)
.post('/regis/store', Regis.Store)


module.exports = router;
