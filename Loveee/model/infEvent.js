const mongoose = require('mongoose');
const date = require('date-and-time');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const infEvent = new Schema({
    purpose: { type: String },
    address_City: { type: String },
    address_District: { type: String },
    address_Ward: { type: String },
    address_stress: { type: String },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    time: { type: String },
    date: { type: String },
    description: { type: String },
    ID_image: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    ID_image2: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    ID_image3: {
        multiple_image: { type: String },
        image_url: { type: String },
    },
    user_joinEvent: [{ type: mongoose.Schema.ObjectId, ref: 'users' }],
    time_post: { type: String },
    email_posted: { type: mongoose.Schema.ObjectId, ref: 'users' },
});

infEvent.pre('save', function (next) {
    const now = new Date();
    this.time_post = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
})
infEvent.statics.isValidRole = async function (id) {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $match: { '_id': ObjectId(id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'email_posted',
                foreignField: '_id',
                as: 'user_post'
            }
        },
        {
            $unwind: '$user_post',

        }, {
            $project: {
                role: "$user_post.Role"
            }
        }, {
            $limit: 1
        }
    ])
}
infEvent.statics.isValidDate = async function (id) {
    const infEvent = this;
    const now = new Date();
    const checkdate = await infEvent.findById(id)
    const timenew_hour = date.format(now, 'HH:mm');
    const timenow_date = date.format(now, 'YYYY-MM-DD');
    if (checkdate.date > timenow_date) {
        return true
    }
    else if (checkdate.date == timenow_date) {
        if (checkdate.time > timenew_hour)
            return true
    }
    return false;

}
infEvent.statics.getDetail = async function (id) {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $match: { '_id': ObjectId(id) }
        }, {
            $lookup: {
                from: 'users',
                localField: 'email_posted',
                foreignField: '_id',
                as: 'user_post'
            }
        }, {
            $unwind: '$user_post',

        }, {
            $project: {
                _id: 1,
                purpose: 1,
                address_City: 1,
                address_District: 1,
                address_Ward: 1,
                address_stress: 1,
                time_post: 1,
                time: 1,
                date: 1,
                description: 1,
                Image_URL: '$ID_image.image_url',
                Image_URL2: '$ID_image2.image_url',
                Image_URL3: '$ID_image3.image_url',
                user_name: "$user_post.fullname",
                imageUser: "$user_post.imageUser",
                Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
            }
        }, {
            $limit: 1
        }
    ])
}
infEvent.statics.getProfile = async function (id) {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $match: { 'email_posted': ObjectId(id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'email_posted',
                foreignField: '_id',
                as: 'user_post'
            }
        },
        {
            $unwind: '$user_post'
        }, {
            $project: {
                purpose: 1,
                address_City: 1,
                address_District: 1,
                address_Ward: 1,
                address_stress: 1,
                time_post: 1,
                time: 1,
                date: 1,
                description: 1,
                Image_URL: '$ID_image.image_url',
                Image_URL2: '$ID_image2.image_url',
                Image_URL3: '$ID_image3.image_url',
                user_name: "$user_post.fullname",
                imageUser: "$user_post.imageUser",
                Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
            }
        },
        {
            $sort: { _id: -1 }
        },
    ])
}

infEvent.statics.getUserjoined = async function (id) {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $match: { 'user_joinEvent': ObjectId(id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'email_posted',
                foreignField: '_id',
                as: 'user_post'
            }
        },
        {
            $unwind: '$user_post'
        }, {
            $project: {
                purpose: 1,
                address_City: 1,
                address_District: 1,
                address_Ward: 1,
                address_stress: 1,
                time_post: 1,
                time: 1,
                date: 1,
                description: 1,
                Image_URL: '$ID_image.image_url',
                Image_URL2: '$ID_image2.image_url',
                Image_URL3: '$ID_image3.image_url',
                user_name: "$user_post.fullname",
                imageUser: "$user_post.imageUser",
                Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
            }
        },
        {
            $sort: { _id: -1 }
        },
    ])
}
infEvent.statics.getallEvent = async function () {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'email_posted',
                foreignField: '_id',
                as: 'user_post'
            }
        },
        {
            $unwind: '$user_post'
        }, {
            $project: {
                _id: 1,
                purpose: 1,
                address_City: 1,
                address_District: 1,
                address_Ward: 1,
                address_stress: 1,
                time_post: 1,
                email_posted: 1,
                time: 1,
                date: 1,
                description: 1,
                Image_URL: '$ID_image.image_url',
                Image_URL2: '$ID_image2.image_url',
                Image_URL3: '$ID_image3.image_url',
                user_name: "$user_post.fullname",
                role: "$user_post.Role",
                imageUser: "$user_post.imageUser",
                Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
            }
        },
        {
            $sort: { _id: -1 }
        }
    ])
}
infEvent.statics.getTop = async function () {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'email_posted',
                foreignField: '_id',
                as: 'user_post'
            }
        },
        {
            $unwind: '$user_post'
        }, {
            $project: {
                _id: 1,
                purpose: 1,
                user_name: "$user_post.fullname",
                imageUser: "$user_post.imageUser",
                Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
            }
        },
        {
            $sort: { Joined_er: -1 }
        },
        {
            $limit: 3
        }
    ])
}

infEvent.statics.getallJoiner= async function (id) {
    const infEvent = this;
    return infEvent.aggregate([
        {
            $match: { '_id': ObjectId(id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_joinEvent',
                foreignField: '_id',
                as: 'Joiner'
            }
        },
        {
            $unwind: '$Joiner'
        }, 
        {
            $project: 
            {
                _id: 1,
                user_name: "$Joiner.fullname",
                imageUser: "$Joiner.imageUser",
                Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
            }
        },
        {
            $sort: { Joined_er: -1 }
        },
    ])
}

infEvent.index({ '$**': 'text' });

module.exports = mongoose.model('infEvent', infEvent)