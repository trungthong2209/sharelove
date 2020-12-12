
const blogs = require('../model/blog');
const cloudinary = require('../middleware/cloudinary');
const arr_image = [];
const allowedExt = /png|jpeg|jpg|gif/;
const backgr = 'https://res.cloudinary.com/share-love/image/upload/c_scale,w_1349/v1607431222/blogs/bg_wfpasx.jpg';
class CreateBlog {
    get_Blog(req, res) {
        res.render('create_blog');
    }
    async BLogPost(req, res, next) {
        const option_image = {
            folder: 'blogs',
            transformation: 
            [{
               width: 1349,
              crop: "scale"
                },
            { 
             quality: "100" 
            }]
        }
      if(req.userId===undefined || req.userId===null ) throw 'Chua dang nhap'
        if (req.files !== undefined && req.files !== null) {
            const image = req.files.image;
            if (!allowedExt.test(image.name)) { res.status(400).send('Tiện ích không được hỗ trợ') }
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
        await blog.save()
            .then(() => {
                arr_image.length = 0;
                res.redirect('/blog')
            })
            .catch(error => {
                arr_image.length = 0;
                res.status(400).send('Error'+error)
            })
    }
    loadBlog(req, res) {
        blogs.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'User_blog'
                }
            },
            {
                $unwind: '$User_blog',

            },
            {
                $project: {
                    catalog: 1,
                    title: 1,
                    short_description: 1,
                    timeCreate: 1,
                    Image_URL: '$ID_image.image_url',
                    author: "$User_blog.fullname",
                    imageUser: "$User_blog.imageUser",
                }
            },
            {
                $sort: { _id: -1 }
            },
        ]).exec((err, blogs) => {
            if (err) return res.status(400).send('Error'+ err)
            else {
                res.render('blog', { blogs: blogs })
            }
        })
    }
}
module.exports = new CreateBlog();