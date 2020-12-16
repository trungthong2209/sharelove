
const blogs = require('../model/blog');
const cloudinary = require('../middleware/cloudinary');
const allowedExt = /png|jpeg|jpg|gif/;
const backgr = 'https://res.cloudinary.com/share-love/image/upload/c_scale,w_1349/v1607431222/blogs/bg_wfpasx.jpg';
class CreateBlog {
    get_Blog(req, res) {
        res.render('create_blog');
    }
    async BLogPost(req, res, next) {
         const arr_image = [];       
        const option_image = {
            folder: 'blogs',
            format: 'jpg',
            transformation:
                [{
                    width: 1349,
                    crop: "scale"
                }, {
                    quality: "100"
                }]
        }
        if (req.userId === undefined || req.userId === null) return res.status(401).send('Unauthorized')
        if (req.files !== undefined && req.files !== null) {
            const image = req.files.image;
            if (!allowedExt.test(image.name)) {
                res.status(400).send('Tiện ích không được hỗ trợ')
            }
            else {
                const result = await cloudinary.uploader.upload(image.tempFilePath, option_image)
                arr_image.push(result.secure_url);
                arr_image.push(result.public_id)
            }
        }
        else {
            arr_image.push(backgr);
        }
        const blog = new blogs({
            author: req.userId,
            catalog: req.body.catalog,
            title: req.body.title,
            short_description: req.body.subtitle,
            ID_image: {
                image_url: arr_image[0],
                multiple_image: arr_image[1],
            },
            content: req.body.content,
        })
        arr_image.length = 0;
        await blog.save()
            .then(() => {
                res.redirect('/blog')
            })
            .catch(error => {
                res.status(500).send('Error' + error)
            })
    }
    loadBlog(req, res) {
        blogs.getallEvent()
            .then((blogs) => {
                res.render('blog', { blogs: blogs })
            })
            .catch(error => {
                res.status(500).send('Error' + error)
            })
    }
    DeletePost(req, res, next) {
        const id = req.params.id;
        blogs.findById(id, async function (err, blog) {
            if (blog) {
                if (blog.author.toString() !== req.userId) return res.status(401).json({ message: "Người đăng bài mới có thể xóa" })
                else {
                    if (blog.ID_image.multiple_image !== undefined) {
                        await cloudinary.uploader.destroy(blog.ID_image.multiple_image)
                    }
                    blog.deleteOne()
                        .then(() => { res.redirect('/blog') })
                        .catch(err => { res.status(400).json({ message: "Xóa bị lỗi" + err }) })
                }
            }
            else { res.status(404).json({ message: "Không tìm thấy blog" }) }
        })
    }
    detail_blog(req, res, next) {
        const idBlog = req.params.id;
        blogs.getDetail(idBlog)
            .then((blog) => {
                res.render('info_blog', { blog: blog })
            })
            .catch(error => {
                res.status(500).send('Error' + error)
            })
    }
}
module.exports = new CreateBlog();