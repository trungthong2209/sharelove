var express = require('express');
var router = express.Router();
const search = require('../controller/search.js');
const verify = require('../middleware/verifyToken');

router
.get('/search/post', search.Search_post)
.get('/search/user',  search.Search_user)

module.exports = router;
