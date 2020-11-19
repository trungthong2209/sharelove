
const infEvent = require('../model/infEvent');

class loadNewFeeds{
    
newsFeed(req, res, next){
   

    infEvent.aggregate([
    {
        $lookup: {
        from: 'users',
        localField: 'email_posted',
        foreignField: '_id',
        as: 'user_post'}
     },
    {
        $unwind: '$user_post'
    },{
        $project: {
            purpose : 1,
            address_City: 1,
            address_District: 1,
            address_Ward: 1,
            time_post: 1,
            time:1,
            date:1,
            description: 1,
            Image_URL: '$ID_image.image_url',
            user_name: "$user_post.fullname",
            Joined_er: { $cond: { if: { $isArray: "$user_joinEvent" }, then: { $size: "$user_joinEvent" }, else: 0} }
        }
    },
    {
            $sort: {_id: -1}
    },
    ]).exec((err, infevents)=>
    {
        if(err) return console.log(err)
        console.log(infevents);
       res.render('Newsfeeds', {infevents: infevents})
        
}
)
}
}
module.exports = new loadNewFeeds();