var express = require('express');
var router = express.Router();
const blog = require('../controller/blog');
const verify = require('../middleware/verifyToken');

router

.get('/blog', blog.loadBlog)
.get('/create_blog', verify, blog.get_Blog)
.get('/blog/delete/:id', verify, blog.DeletePost)
.post('/create/blog', verify, blog.BLogPost)
.get('/blog/:id', blog.detail_blog)

module.exports = router;
