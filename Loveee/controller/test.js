

const donate = require('../model/donate');

      
async function topdonate(req, res, next){ 
     await donate.aggregate([
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
               console.log(donate);
             
            }
        })
   
}
 

module.exports =  topdonate;
