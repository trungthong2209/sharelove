var express = require('express');
var router = express.Router();
const blog = require('../controller/blog');
const topevent  = require('../controller/test');
const verify = require('../middleware/verifyToken');

router
.get('/blog', blog.loadBlog)
.get('/top', topevent.Top_event)
.post('/create/blog', verify, blog.BLogPost)
.get('/create_blog', blog.get_Blog)
module.exports = router;
