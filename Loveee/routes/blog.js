var express = require('express');
var router = express.Router();
const blog = require('../controller/blog');
const verify = require('../middleware/verifyToken');

router
.get('/blog', blog.loadBlog)
.post('/create/blog', verify, blog.BLogPost)
.get('/create_blog', blog.get_Blog)
.get('/info_blog',function(req, res, next) {
    res.render('info_blog');
 })
module.exports = router;
