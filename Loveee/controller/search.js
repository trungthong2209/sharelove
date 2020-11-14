const infEvent = require('../model/infEvent');
const User = require('../model/user');

class SearchController{
    
Search(req, res, next){
        res.render('search_post'); 
}
async Search_post(req, res, next){
    var query = req.query.search;

    if(req.query.search) {
    await infEvent.find({$text: {$search: query}}, function(err, All_infEvent){
            if(err){
                console.log(err);
            } else {
                res.json(All_infEvent);         
            }
         }).lean();
     } else {
         
            res.json({
                status: "error",
                message: "Query is not correct"
            });          
         
    }
}
async Search_user(req, res, next){
    var query = req.query.search;
     if(req.query.search) {
        await User.find({$text: {$search: query}}, function(err, Alluser){
            if(err){
                console.log(err);
            } else {
            res.json(Alluser);         
               
            }
         }).lean();
     } else {
        res.json({
                status: "error",
                message: "user is not correct."
            });          
         
    }
}
}

module.exports = new SearchController();