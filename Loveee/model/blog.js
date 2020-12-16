const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');
const ObjectId = require('mongodb').ObjectID;

const blog = new Schema({
    author: { type: mongoose.Schema.ObjectId, ref: 'users' },
    catalog: { type: String },
    ID_image: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    title: { type: String },
    short_description: { type: String },
    content: { type: String },
    timeCreate: { type: String }

});
blog.pre('save', function (next) {
    const now = new Date();
    this.timeCreate = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
})


blog.statics.getallEvent = async function() {
    const blog = this;
    return blog.aggregate([
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
                _id: 1,
                catalog: 1,
                title: 1,
                short_description: 1,
                timeCreate: 1,
                Image_URL: '$ID_image.image_url',
                author: "$User_blog.fullname",
                imageUser: "$User_blog.imageUser",
                id_author: "$User_blog._id"
            }
        },
        {
            $sort: { _id: -1 }
        },
    ])
}
blog.statics.getDetail = async function(id) {
    const blog = this;
    return blog.aggregate([
        {
            $match: { '_id': ObjectId(id) }
        }, {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'User_blog'
            }
        }, {
            $unwind: '$user_post',

        }, {
            $project: {
                catalog: 1,
                title: 1,
                short_description: 1,
                timeCreate: 1,
                Image_URL: '$ID_image.image_url',
                author: "$User_blog.fullname",
                imageUser: "$User_blog.imageUser",
            }
        }, {
            $limit: 1
        }
    ])
}
blog.index({ '$**': 'text' });
const blogs = mongoose.model("blog", blog);
module.exports = blogs;
