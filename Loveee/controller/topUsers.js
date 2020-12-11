
const donate = require('../model/donate');
class load_topUser {
    async topUser(req, res, next) {
        donate.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userID',
                    foreignField: '_id',
                    as: 'User'
                }
            },
            { $unwind: '$User' },
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
        ]).exec((err, donate) => {
            if (err) return console.log(err)
            else {
                res.render('topUser', { topdonates: donate })
            }
        })
    }
}
module.exports = new load_topUser();