const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');

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

blog.index({ '$**': 'text' });
const blogs = mongoose.model("blog", blog);
module.exports = blogs;
