
const infEvent = require('../model/infEvent');

class loadNewFeeds{
newsFeed(req, res, next){
    infEvent.aggregate([
    {
        $lookup: {
        from: 'users',
        localField: 'email_posted',
        foreignField: '_id',
        as: 'user_post'
    }},
    {
        $unwind: '$user_post'
    },{
        $project: {
            purpose : 1,
            address: 1,
            execution_date: 1,
            description: 1,
            TimePost: 1,
            Image_URL: '$ID_image.image_url',
            user_name: "$user_post.fullname",

        }
    },
    {
            $sort: {TimePost: -1}
    },
    ]).exec((err, infevents)=>
    {
        if(err) return console.log(err)
       
       res.render('home', { infevents: infevents})
       console.log(infevents);
}

)

}

}
module.exports = new loadNewFeeds();