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

const {userJoin, getCurrentUser,userLeave,getRoomUsers,formatMessage} = require("./controller/Room");

//connect database
dataDB.connect();

var app = express();
io = socket_io();
app.io = io;

 //router
 
var indexRouter = require('./routes/index');
var login = require('./routes/login');
var forget = require('./routes/forget_password');
var createEvent = require('./routes/create_Event');
var deletee = require('./routes/delete_Event');
var home = require('./routes/loadNewfeeds');
var search = require('./routes/search');
var register = require('./routes/register');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Socket 
const botname = "ShareLove Bot";
io.on("connection", function( socket )
{
    
     console.log( "A user is connected: " + socket.id);
    //news feed
     socket.on('new_post',  function (formData) {
       console.log("formData đã nhận")
       var cookies = cookie.parse(socket.request.headers.cookie); 
             const emit_data ={
                  purpose: formData.purpose,
                  name_user: cookies.fullname,
                  address: formData.address,
                  execution_date: formData.execution_date,
                  image: formData.image,
              }
          io.sockets.emit('SV_new_post', emit_data)
          console.log("Emit Data"+ emit_data);

      });  
        //Create room 
        socket.on("joinRoom", async function (room)  {
          var cookies = cookie.parse(socket.request.headers.cookie); 
          
          const user = await userJoin(socket.id, cookies.token, room);
           socket.join(user.room);
          socket.emit("message", formatMessage(botname, "Welcome to room"));
          socket.broadcast.to(user.room).emit("message", formatMessage(botname,`${user.username} has joned the room`));
          io.to(user.room).emit("roomUsers", {
              room: user.room,
              users: getRoomUsers(user.room)
          });
      });
      socket.on("chatMessage", msg =>{
          const user = getCurrentUser(socket.id);
          io.to(user.room).emit("message", formatMessage(user.username,msg));
      });
      socket.on("disconnect",()=>{
          const user = userLeave(socket.id);
          if(user){
          io.to(user.room).emit("message", formatMessage(botname,`${user.username} has left the chat`));
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
 //Upload Image
app.use(fileUpload({
  useTempFiles:true
}));
// use router
app.use(indexRouter);
app.use(login);
app.use(register);
app.use(forget);
app.use(search);
app.use(createEvent);
app.use(home);
app.use(deletee);

//swagger test
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.cookies;
    next()
});

module.exports = app;
