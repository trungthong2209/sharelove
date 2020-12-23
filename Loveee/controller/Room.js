const moment = require("moment");
const chatMessage = require('../model/ChatMessage');
const User = require('../model/user');
const events = require('../model/infEvent');
const accessTokenSecret = process.env.accessTokenSecret;
const jwt = require("jsonwebtoken");
const users = [];

async function getImage(token) {
    const userID = jwt.verify(token, accessTokenSecret);
    return User.findById(userID.id)
        .then(user => user.imageUser);
}
async function api_image(req, res, next) {
        const token = req.cookies.token
        const icon = 'https://res.cloudinary.com/share-love/image/upload/v1608286591/avatar/vhuciu62iea99t0sad69.png'
    if(token!=undefined) {
        const userAvt = jwt.verify(token, accessTokenSecret).avatar;
         return res.status(200).json(userAvt);
      }
    return res.status(200).json(icon);
}

async function userJoin(id, token, room) {
    var userID = null;
    jwt.verify(token, accessTokenSecret, function (err, verified) {
        if (verified) {
            userID = verified.id;
        }
        else {   
            return 2
        }
    })
    let username = await User.getName(userID);
    let ID_user = await User.getID(userID);
    let image = await User.getImage(userID);
    const user = { id, username, room, ID_user, image };
    if (users.length == 0) {
        users.push(user)
    }
    else {
        const pos = users.map(function (e) { return e.ID_user }).indexOf(ID_user);
        if (pos == -1) {
            users.push(user);
        }
        else {
            return 1
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
async function Save_Mess(room, token, data) {
    var userID = null;
    jwt.verify(token, accessTokenSecret, function (err, verified) {
        if (verified) {
            userID = verified.id;
        }
        else { 
             return 2 
        }
    })
    const message = new chatMessage({
        post_id: room,
        authorUsername: userID,
        message: data,
    })
    const results = await message.save()
    return results;
}
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}
async function Update_UserJoin(req, res, next) {
    const room = req.params.room;
    if(req.userId==undefined) return res.status(401).send('Unauthorized')
  await events.findById(room)
        .then((event) => {
            event.updateOne({ $addToSet: { user_joinEvent: req.userId } })
                .then(async () => {
                   const chats = await chatMessage.getRoom(room)           
                   const joiner = await events.getallJoiner(room)
                    res.render('room', {joiner:joiner, room: room, chats: chats, title: event.purpose });
                 })
                .catch((error) => { return res.status(500).send(error) })
        })
        .catch(() => { res.status(404).json({ message: "Không tìm thấy phòng" }) })
}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    formatMessage,
    Update_UserJoin,
    getImage,
    Save_Mess,
    api_image
};