LikeSchema.aggregate([
  
    {
        
        $lookup: {
            from: 'FoodModel',
            localField: 'id_food',
            foreignField: '_id',
            as: 'Like_Food'
        }
    },

    {
        $unwind: '$Like_Food',

    },
    {
        $project: {
            
            Name: "$Like_Food.name",
            Foods: "$Like_Food.spiceFoods"
        }
    },

]).exec((err, food) => {
    if (err) return console.log(err)
    else {
        res.json(food)
    }
})