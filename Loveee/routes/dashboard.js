var express = require('express');
var router = express.Router();
const Dashboard = require('../controller/Dashboard.js');
const verify = require('../middleware/verifyToken');

router
.get('/manager-accounts', verify, Dashboard.getAlluser)
.get('/manager-events',verify, Dashboard.getAllevent )
.get('/manager-blogs', verify, Dashboard.getAllblog)


module.exports = router;
