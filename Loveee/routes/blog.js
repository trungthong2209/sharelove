var express = require('express');
var router = express.Router();
const blog = require('../controller/blog');
const verify = require('../middleware/verifyToken');

router
.post('/create/blog', verify, blog.BLogPost)
.get('/blog', blog.loadBlog);
module.exports = router;
