const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');
const ObjectId = require('mongodb').ObjectID;

const donate = new Schema({
    userID: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    eventID: { type: mongoose.Schema.ObjectId, ref: 'InfEvent' },
    money: { type: String },
    timeDonate: { type: String }
});
donate.pre('save', function (next) {
    const now = new Date();
    this.timeDonate = date.format(now, 'HH:mm DD/MM/YYYY');
    next()
})
donate.statics.getTotal = async function (id) {
    const donate = this;
    return donate.aggregate([
        {
            $match: { 'eventID': ObjectId(id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userID',
                foreignField: '_id',
                as: 'User'
            }
        },
        {
            $unwind: '$User',

        }, {
            $group: {
                _id: "$eventID",
                total: {
                    $sum: {
                        $toDouble: "$money"
                    }
                },
            }
        },
    ])
}

donate.statics.getTop = async function () {
    const donate = this;
    return donate.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userID',
                foreignField: '_id',
                as: 'User'
            }
        },
        {
            $unwind: '$User',

        },
        {
            $group: {
                _id: "$userID",
                author_name: { $first: "$User.fullname" },
                url_author: { $first: "$User.imageUser" },
                total: {
                    $sum: {
                        $toDouble: "$money"
                    }
                },
            }
        },
        {
            $sort: { total: -1 }
        },
        {
            $limit: 3
        }
    ])
}
donate.statics.getAll = async function () {
    const donate = this;
    return donate.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userID',
                foreignField: '_id',
                as: 'User'
            }
        },
        {
            $unwind: '$User',

        },
        {
            $group: {
                _id: "$userID",
                author_name: { $first: "$User.fullname" },
                url_author: { $first: "$User.imageUser" },
                total: {
                    $sum: {
                        $toDouble: "$money"
                    }
                },
            }
        },
        {
            $sort: { total: -1 }
        },

    ])
}
donate.statics.getProfile = async function (id) {
    const donate = this;
    return donate.aggregate([
        {
            $match: { 'userID': ObjectId(id) }
        },
        {
            $project: {
                _id: "$userID",
                money: 1.,
                timeDonate: 1,
            }
        },
        {
            $sort: { total: -1 }
        }
    ])
}
donate.statics.getTotalbyUser = async function (id) {
    const donate = this;
    return donate.aggregate([
        {
            $match: { 'userID': ObjectId(id) }
        },
        {
            $group: {
                _id: "$userID",
                total: {
                    $sum: {
                        $toDouble: "$money"
                    }
                },
            }

        }
    ])
}
module.exports = mongoose.model('donate', donate)