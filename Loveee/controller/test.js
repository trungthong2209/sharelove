
const event = require('../model/infEvent');


class load_event  {
    async Top_event(req, res, next) {
    await event.aggregate([
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
                        _id:1,
                        purpose: 1,
                        user_name: "$user_post.fullname",
                        imageUser: "$user_post.imageUser",
                        Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0 } }
                    }
                },
                {
                    $sort: { Joined_er: -1 }
                },
        ]).exec((err, donate) => {
            if (err) return console.log(err)
            else {
               res.json(donate);
            }
        })
    }
}
module.exports = new load_event();