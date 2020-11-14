const moment = require("moment");
const chatMessage = require('../model/ChatMessage');
const User = require('../model/user');
const events = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");

const users = [];

async function getname(token){
    const userID =  jwt.verify(token, accessTokenSecret);
    return User.findById(userID.id)
    .then(user => user.fullname);
}

async function getID(token){
    const userID =  jwt.verify(token, accessTokenSecret);
    return User.findById(userID.id)
    .then(user => user.id);
}

async function userJoin(id, token, room){
    let username = await getname(token);
    let ID_user = await getID(token);
    const user = {id, username, room, ID_user};
    if(users.length==0){
        users.push(user);
    }
    else{
        var pos = users.map(function(e) { 
            return e.ID_user; 
        }).indexOf(ID_user); 
        
        if(pos == -1){
            users.push(user);
        }
   }
    return user;
}
function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format("h:mm a")
    };
}
function getCurrentUser(id){
    return users.find(user => user.id === id);
}
function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}
async function Save_message(req, res){
    var room = req.params.room;
    console.log("req.params.room:" + room)
    var new_message = req.body.msg;
    console.log("new_message:" + new_message)
    const token = req.cookies.token;
    const userID =  jwt.verify(token, accessTokenSecret);
     await chatMessage.findOne({"post_id": room}, async function(err, mess){ 
         if(mess==null){
            var message = new chatMessage({
                post_id: room,
                messages: [{
                    authorUsername: userID.id,
                    message: new_message,
                 }]
              })
        await message.save()
         .then(()=>{
                 console.log("Save schema chatMessage success")
           })
        .catch(error =>{
            console.log("Save schema chatMessage fail "+error);
          }) 
        } 
        else { 
           var messages_Update = {
                authorUsername: userID.id,
                message: new_message,
             }
            await mess.updateOne({$push:{messages: messages_Update }}, async function(err, results){ 
              if(results){
                console.log("Save message success:" + new_message)
                    }
                else 
                {
                  console.log("ERROR Save message success: "+ err)
                }
          })
        }
     
  }) 

}
function getRoomUsers(room){
       
         return users.filter(user =>  user.room === room);
}

async function Update_UserJoin(req, res, next){
    var room = req.params.room;
    const token = req.cookies.token;
    const userID =  jwt.verify(token, accessTokenSecret);
    
      await events.findById(room, async function(err, event){ 
        if(event){ 
            await event.updateOne({$addToSet:{user_joinEvent: userID.id}}, async function(err, results){ 
                    if(results){
                           res.render('room', {room: room});
                          }
                      else 
                      {
                        console.log("ERROR UPDATE user_joinEvent: "+err)
                        }
                })

         
}  
    else {
            res.json({
              status: "error",
              message: "Không tìm thấy phòng"
            })
        }
    
    })

} 
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    formatMessage,
    Update_UserJoin,
    Save_message
};