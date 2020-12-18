
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
    
    async getDashboard(req, res, next) {
        if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
    
         
        res.render('Dashboard')
            
        
        
      
    }
    async getAllevent(req, res, next) {
        if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
        else {
            infEvents.getallEvent()
            .then((events)=>{
                res.status(200).json(events)
            })
            .catch(error=>{
                res.status(400).send('Error' + error)
            })     
        }
    }
    async getAllblog(req, res, next) {
    if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
    else {
        blog.getallEvent()
        .then((blogs)=>{
            res.status(200).json(blogs)
        })
        .catch(error=>{
            res.status(400).send('Error' + error)
        })     
    }
   }
   async getHistoryDonate(req, res, next) {
    if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
    else {
        donate.getTotal()
        .then((amount)=>{
            res.status(200).json(amount)
        })
        .catch(error=>{
            res.status(400).send('Error' + error)
        })     
    }
   }
   async getMail(req, res, next) {
    if(req.role!=='ADMIN') return res.status(401).json( {message:'UNAUTHORIZED'})
    else {
        User.find({})
        .then((users)=>{
         // res.render('manage_account', {users: users})
         res.status(200).json(users)
      })  
    }
  
} 
}
module.exports = new Dashboard();