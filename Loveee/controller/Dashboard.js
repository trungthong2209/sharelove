
const infEvent = require('../model/infEvent');
const User = require('../model/user');
const donate = require('../model/donate');
const blog = require('../model/blog');

class Dashboard {
    async getAlluser(req, res, next) {
        if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
        else {
            User.find({})
            .then((users)=>{
             // res.render('manage_account', {users: users})
             res.status(200).json(users)
          })  
        }
      
    } 
    async getAllevent(req, res, next) {
        if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
        else {
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
                    _id:1,
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
            },
        ]).exec((err, infevents) => {
            if (err) return res.status(400).json(err);
            else {
                res.status(200).json(infevents);
            }
     })
        }
    }
    async getAllblog(req, res, next) {
    if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
    else {
     await  blog.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'User_blog'
                }
            },
            {
                $unwind: '$User_blog',

            },
            {
                $project: {
                    catalog: 1,
                    title: 1,
                    short_description: 1,
                    timeCreate: 1,
                    Image_URL: '$ID_image.image_url',
                    author: "$User_blog.fullname",
                    imageUser: "$User_blog.imageUser",
                }
            },
            {
                $sort: { _id: -1 }
            },
        ]).exec((err, blogs) => {
            if (err) return res.status(400).send('Error'+ err)
            else { res.status(200).json(blogs) }
        })
    }
   }
}
module.exports = new Dashboard();