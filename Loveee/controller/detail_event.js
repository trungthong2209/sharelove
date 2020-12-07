const infEvent = require('../model/infEvent');
var ObjectId = require('mongodb').ObjectID;

function detail_event(req, res, next){
    var id = req.params.id;

    infEvent.aggregate([
        {
            $match: {'_id': ObjectId(id)}
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
    
        },
        {
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
            $limit: 1
        }
    ]).exec((err, event) => {
        if (err) return console.log(err)
        else {
            res.json(event);
           // res.render('info_event', {event :event })
            
        }
    })
}
module.exports = detail_event;