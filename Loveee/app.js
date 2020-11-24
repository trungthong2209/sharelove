var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socket_io = require("socket.io")
const dataDB = require('./model/db');
const fileUpload = require('express-fileupload') 
const cookie = require ('cookie');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const {userJoin, getCurrentUser,userLeave,getRoomUsers,formatMessage} = require("./controller/Room");

const event = require('./controller/Event');

dataDB.connect();

var app = express();
io = socket_io();
app.io = io;


 var login = require('./routes/login');
var forget = require('./routes/forget_password');
var createEvent = require('./routes/create_Event');
var deletee = require('./routes/delete_Event');
var home = require('./routes/loadNewfeeds');
var search = require('./routes/search');
var register = require('./routes/register');
var room = require('./routes/room');
var setting = require('./routes/setting');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Socket 
const botname = "ShareLove Bot";
io.on("connection", function(socket)
{
    
     console.log( "A user is connected: " + socket.id);
    //news feed
     socket.on('new_post', async function (formData) {
       console.log("formData đã nhận")
          
       console.log(event.event) 
        
            io.sockets.emit('SV_new_post', )
         
        
         });  
        //Create room 
        socket.on("joinRoom", async function (room)  {
          var cookies = cookie.parse(socket.request.headers.cookie); 
          
          const user = await userJoin(socket.id, cookies.token, room);
          if(user==1) {
            var destination ='/home';
                socket.emit("CheckID", destination)
          }
           else{
          socket.join(user.room);
          socket.emit("message", formatMessage(botname, `${user.username} đã vào phòng`));
          socket.broadcast.to(user.room).emit("message", formatMessage(botname,`${user.username} đã vào phòng`));
          io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
          });
          }
         });
        
         socket.on("chatMessage", msg =>{
          const user = getCurrentUser(socket.id);
          io.to(user.room).emit("message", formatMessage(user.username,msg));
      });
      socket.on("disconnect",()=>{
          const user = userLeave(socket.id);
          if(user){
          io.to(user.room).emit("message", formatMessage(botname,`${user.username} đã rời phòng`));
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
  httpOnly: true ,
  expires: new Date(Date.now() + 60 * 1000), 
  maxAge: 60 * 1000,
  key: 'connect.sid'
})
);

app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
  useTempFiles:true,
  limits: { 
    fileSize: 5 * 1024 * 1024 * 1024 
},
}));


app.use(login);
app.use(register);
app.use(forget);
app.use(search);
app.use(createEvent);
app.use(home);
app.use(deletee);
app.use(room);
app.use(setting);



global.loggedIn = null;
app.use("*", (req, res, next) => {
 
    loggedIn = req.cookies.token;
    
    next()
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
