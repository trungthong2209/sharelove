var express = require('express');

var router = express.Router();

const search = require('../controller/search.js');
const verify = require('../middleware/verifyToken');

router
.get('/search/post', verify, search.Search_post)
.get('/search/user', verify, search.Search_user)

module.exports = router;
