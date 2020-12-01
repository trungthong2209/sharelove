
const infEvent = require('../model/infEvent');
const User = require('../model/user');
const donate = require('../model/donate');

const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.accessTokenSecret;

class loadNewFeeds {

    async newsFeed(req, res, next) {
       const token = req.cookies.token;
      
        function getImageUser() {
            if(token!=undefined){
            const userID = jwt.verify(token, accessTokenSecret);
            return User.findById(userID.id)
                .then(user => user);
            }
            else {
                return "user";
            }
        }
        const user_url = await getImageUser();
        await infEvent.aggregate([
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
            if (err) return console.log(err)
            else {
                donate.aggregate([
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

                ]).exec((err, donate) => {
                    if (err) return console.log(err)
                    else {
                        res.render('Newsfeeds', { infevents: infevents, user: user_url, topdonates: donate })
                    }
                })



            }
        })
    }
    
}
module.exports = new loadNewFeeds();