const actionUser = require("../controller/Dashboard");
const { Save_Mess, userJoin, getCurrentUser, userLeave, getRoomUsers, formatMessage, getImage } = require("../controller/Room");
const cookie = require('cookie');

function socketio(socket){
    const botname = "SpreadLove Bot";
    var logout = '/logout';
    console.log("A user is connected: " + socket.id);
    socket.on("block", function (data) {
        actionUser.updateActionUserBlock(data)
            .then((status) => {
                socket.emit('blockSuccess', ({ data, status }))
            })
    })
    //Create room 
    socket.on("joinRoom", async function (room) {
        var cookies = cookie.parse(socket.request.headers.cookie);
        const user = await userJoin(socket.id, cookies.token, room);
        if (user == 1) {
            var destination = '/home';
            socket.emit("CheckID", destination)
        }
        if (user == 2) {
            socket.emit("CheckID", logout)
        }
        else {
            socket.join(user.room);
            socket.emit("message", formatMessage(botname, `${user.username} đã vào phòng`, user.image));
            socket.broadcast.to(user.room).emit("message", formatMessage(botname, `${user.username} đã vào phòng`, user.image));
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
    socket.on("chatMessage", ({ msg, room }) => {
        var cookies = cookie.parse(socket.request.headers.cookie);
        const user = getCurrentUser(socket.id);
        Save_Mess(room, cookies.token, msg)
            .then((value) => {
                if (value == 2) {
                    socket.emit("CheckID", logout)
                }
                else {
                    io.to(user.room).emit("message", formatMessage(user.username, msg, user.image));
                }
            })
            .catch(error => { 
                 console.log(error);
            })
    });
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage(botname, `${user.username} đã rời phòng`, user.image));
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });


}
module.exports = socketio;