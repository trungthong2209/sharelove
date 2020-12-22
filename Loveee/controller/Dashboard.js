
const infEvent = require('../model/infEvent');
const User = require('../model/user');
const donate = require('../model/donate');
const blog = require('../model/blog');
class Dashboard {
    async getDashboard(req, res, next) {
        if (req.role !== 'ADMIN') return res.status(401).json({ message: 'UNAUTHORIZED' })
        res.render('Dashboard')
    }
    async getAlluser(req, res, next) {

        if (req.role !== 'ADMIN') return res.status(401).json({ message: 'UNAUTHORIZED' })
        else {
            User.find({})
                .then((users) => {
                    res.render('manage_account', { users: users })
                })
        }
    }
    async updateActionUserBlock(IDuser) {
      const user = await User.findById(IDuser)
           
                if(user.Action==true){
                   await user.updateOne({ Action: false })
                    return 1
                }
                else {
                    await  user.updateOne({ Action: true })
                   return 2
                }
            
        
    }
    
    async getAllevent(req, res, next) {
        if (req.role !== 'ADMIN') return res.status(401).json({ message: 'UNAUTHORIZED' })
        else {
            infEvent.getallEvent()
                .then((events) => {
                    res.render('manage_event', { events: events })
                })
                .catch(error => {
                    res.status(400).send('Error' + error)
                })
        }
    }
    async getAllblog(req, res, next) {
        if (req.role !== 'ADMIN') return res.status(401).json({ message: 'UNAUTHORIZED' })

        blog.getallEvent()
            .then((blogs) => {
                res.render('manage_blog', { blogs: blogs })
            })
            .catch(error => {
                res.status(400).send('Error' + error)
            })
    }
    async getHistoryDonate(req, res, next) {
        if (req.role !== 'ADMIN') return res.status(401).json({ message: 'UNAUTHORIZED' })

        donate.getTotal()
            .then((amount) => {
                res.status(200).json(amount)
            })
            .catch(error => {
                res.status(400).send('Error' + error)
            })

    }

}
module.exports = new Dashboard();