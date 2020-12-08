var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socket_io = require("socket.io")
const dataDB = require('./model/db');
const fileUpload = require('express-fileupload')
const cookie = require('cookie');
require('dotenv').config();
const { Save_Mess ,userJoin, getCurrentUser, userLeave, getRoomUsers, formatMessage, getImage } = require("./controller/Room");

//connect database
dataDB.connect();

var app = express();
io = socket_io();
app.io = io;
//router
var login = require('./routes/login');
var forget = require('./routes/forget_password');
var createEvent = require('./routes/create_Event');
var deletee = require('./routes/delete_Event');
var home = require('./routes/loadNewfeeds');
var search = require('./routes/search');
var register = require('./routes/register');
var room = require('./routes/room');
var setting = require('./routes/setting');
var donate = require('./routes/donate');
var profile = require('./routes/profile');
var blog = require('./routes/blog');
var topUser = require('./routes/topUser');
var map = require('./routes/map');
var event = require('./routes/event');
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Socket 
const botname = "ShareLove Bot";
io.on("connection", function (socket) {

    console.log("A user is connected: " + socket.id);
    //Create room 
    socket.on("joinRoom", async function (room) {
        var cookies = cookie.parse(socket.request.headers.cookie);

        const user = await userJoin(socket.id, cookies.token, room);
       
        if (user == 1) {
            var destination = '/home';
             socket.emit("CheckID", destination)
        }
        else {
            socket.join(user.room);
            socket.emit("message", formatMessage(botname,  `${user.username} đã vào phòng`, user.image));
            socket.broadcast.to(user.room).emit("message", formatMessage(botname, `${user.username} đã vào phòng`,user.image));
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
//Save_Mess(room, token, data)
    socket.on("chatMessage",  ({msg, room}) => {
        var cookies = cookie.parse(socket.request.headers.cookie);
        const user = getCurrentUser(socket.id);
        Save_Mess(room, cookies.token, msg)
        .then((value)=>{
            console.log(value);
            io.to(user.room).emit("message", formatMessage(user.username,  msg, user.image));
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

});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser({
    secret: 'some secret',
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
    maxAge: 60 * 1000,
    key: 'connect.sid'
})
);
app.use(express.static(path.join(__dirname, 'public')));
//Upload Image
app.use(fileUpload({
    useTempFiles: true,
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024 //5MB max file(s) size
    },
}));
// use router
global.image= null;
app.use("*", async function (req, res, next)  {
    global.loggedIn = req.cookies.token;
      if(loggedIn!==undefined && loggedIn!==null && image===null){
        image = await getImage(loggedIn);
    }
     next()
});
app.use(login);
app.use(register);
app.use(forget);
app.use(search);
app.use(createEvent);
app.use(home);
app.use(deletee);
app.use(room);
app.use(setting);
app.use(donate);
app.use(profile);
app.use(blog);
app.use(topUser);
app.use(map);
app.use(event);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;