
const blogs = require('../model/blog');
const jwt = require("jsonwebtoken");
const cloudinary = require('../middleware/cloudinary');
const path = require("path");
const date = require('date-and-time');

const accessTokenSecret = process.env.accessTokenSecret;

class CreateBlog {

    async BLogPost(req, res) {

        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send(
                'No file uploaded'
            );
        }
        else {
            const now = new Date();
            const time_post = date.format(now, 'HH:mm DD/MM/YYYY');
            const token = req.cookies.token;
            const userID = jwt.verify(token, accessTokenSecret);
            var image = req.files.image;

            const extension = path.extname(image.name);
            const allowedExt = /png|jpeg|jpg|gif/;
            if (!allowedExt.test(extension)) throw "Tiện ích mở rộng không được hỗ trợ";
            const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'image', use_filename: true })

            const blog = new blogs({
                author: userID.id,
                catalog: req.body.catalog,

                title: req.body.title,
                short_description: req.body.subtitle,

                ID_image: {
                    multiple_image: result.public_id,
                    image_url: result.secure_url,
                },
                content: req.body.content,
                time_post: time_post,
            })

            await blog.save()
                .then(() => {
                    console.log("lưu thành công");
                    res.redirect('/blog')
                })
                .catch(error => {
                    console.log(error);

                })

        }
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
        ]).exec((err, blogs) => {
            if (err) return console.log(err)
            else {
                res.render('blog', { blogs: blogs})
            }
        })




    }
}
module.exports = new CreateBlog();