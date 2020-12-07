
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
                    $sort: { Joined_er: -1 }
                },
        ]).exec((err, events) => {
            if (err) return console.log(err)
            else {
               res.render('List_event', {events});
            }
        })
    }
}
module.exports = new load_event();