const infEvent = require('../model/infEvent');
const User = require('../model/user');
const donate = require('../model/donate');
var ObjectId = require('mongodb').ObjectID;
const moment = require("moment");
async function newProfile(req, res, next) {

       if(req.userId===undefined) throw 'Chua dang nhap'

        function getUser() {
              return User.findById(req.userId)
                .then(user => user);
        }      

        const user = await getUser();

        await infEvent.aggregate([
            {
                $match: { 'email_posted': ObjectId(req.userId) }
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
        ]).exec((err, infevents) => {
            if (err) return res.status(400).send(err)
            else {
                donate.aggregate([
                    {
                        $match: { 'userID': ObjectId(req.userId) }
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
                   },
                ]).exec((err, alldonate) => {
                    if (err) return console.log(err)
                    else {
                       donate.aggregate([
                            {
                                $match: { 'userID': ObjectId(req.userId) }
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
                        ]).exec((err, total) => {
                            if (err) return res.status(400).send(err)
                            else {
                                var newDate = moment(user.Dob).utc().format("DD/MM/YYYY")                             
                                res.render('profile',{ infevents, user, alldonate, total, newDate })                                                  
                            }
                        })
                    }
                })
            }
        })
    }
module.exports = newProfile ;