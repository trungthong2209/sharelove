const moment = require("moment");
const chatMessage = require('../model/ChatMessage');
const User = require('../model/user');
const events = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
var ObjectId = require('mongodb').ObjectID;
const users = [];
async function getname(token) {
    const userID = jwt.verify(token, accessTokenSecret);
    return User.findById(userID.id)
        .then(user => user.fullname);
}
async function getImage(token) {
    const userID = jwt.verify(token, accessTokenSecret);
    return User.findById(userID.id)
        .then(user => user.imageUser);
}
async function getID(token) {
    const userID = jwt.verify(token, accessTokenSecret);
    return User.findById(userID.id)
        .then(user => user.id);
}

async function userJoin(id, token, room) {
    let username = await getname(token);
    let ID_user = await getID(token);
    let image = await getImage(token);

    const user = { id, username, room, ID_user, image };
    if (users.length == 0) {
        users.push(user);
    }
    else {
        var pos = users.map(function (e) {
            return e.ID_user;
        }).indexOf(ID_user);

        if (pos == -1) {
            users.push(user);
        }
        else {
            return 1;
        }
    }
    return user;
}
function formatMessage(username, text, image) {

    return {
        username,
        text,
        time: moment().format("h:mm a"),
        image
    };
}
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
//   function Save_message(req, res, next) {
//     var room = req.params.room;
//     const token = req.cookies.token;
//     const userID = jwt.verify(token, accessTokenSecret);

//     var message = new chatMessage({
//         post_id: room,
//         authorUsername: userID.id,
//         message: req.body.msg,
//     })
//      message.save()
//         .then(value => {
//             console.log("Save schema chatMessage success" + value)
//             return res.status(200);
//         })
//         .catch(error => {
//             console.log("Save schema chatMessage fail " + error);
//             return res.status(500);
//         })
    
// }
async function Save_Mess(room, token, data) {
 const userID = jwt.verify(token, accessTokenSecret);
    var message = new chatMessage({
        post_id: room,
        authorUsername: userID.id,
        message: data,
    })
   const results = await message.save()
     return results;
}
function getRoomUsers(room) {

    return users.filter(user => user.room === room);
}

 function Update_UserJoin(req, res, next) {
    var room = req.params.room;
    const token = req.cookies.token;
    const userID = jwt.verify(token, accessTokenSecret);
     events.findById(room)
    .then( (event) => {
         event.updateOne({ $addToSet: { user_joinEvent: userID.id } })
                .then(async () => {
                       await chatMessage.aggregate([
                        {
                            $match: { 'post_id': ObjectId(room) }
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'authorUsername',
                                foreignField: '_id',
                                as: 'messages'
                            }
                        },

                        {
                            $unwind: '$messages',
                        },
                        {
                            $project: {
                                _id: "$_id",
                                Id_Event: "$messages.post_id",
                                author_name: "$messages.fullname",
                                author_url: "$messages.imageUser",
                                timeSend: 1,
                                message: 1
                            }
                        },
                    ]).exec((err, chats) => {
                        if (err)
                            return console.log(err);
                        else {
                            res.render('room', { room: room, chats: chats, title: event.purpose });
                        }
                    });
                })
                .catch((error) => {
                    console.log((error));
                    return res.status(500)
                })
            })
            .catch((error) => {
                res.status(404).json({
                    message: "Không tìm thấy phòng"
                });
            })
                    

}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    formatMessage,
    Update_UserJoin,
    //Save_message,
    getImage,
    Save_Mess
};