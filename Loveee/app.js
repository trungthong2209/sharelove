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
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Socket 
const botname = "ShareLove Bot";
io.on("connection", function( socket )
{
    
     console.log( "A user is connected: " + socket.id);
    //news feed
     socket.on('new_post', async function (formData) {
       console.log("formData đã nhận")
       const buffer = Buffer.from(formData.image);
       await fs.writeFile('/tmp/image', buffer).catch(console.error); 
       var cookies = cookie.parse(socket.request.headers.cookie); 
          const emit_data ={
                  purpose: formData.purpose,
                  name_user: cookies.fullname,
                  address: formData.address,
                  address_1: formData.address_1,
                  address_2:formData.address_2,
                  time: formData.time,
                  date: formData.date,
                  description: formData.description,
                  image: formData.image.toString('base64'),
          }
          io.sockets.emit('SV_new_post', emit_data)
          console.log("Emit Data"+ emit_data);

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
 //Upload Image
app.use(fileUpload({
  useTempFiles:true
}));
// use router

app.use(login);
app.use(register);
app.use(forget);
app.use(search);
app.use(createEvent);
app.use(home);
app.use(deletee);
app.use(room);



global.loggedIn = null;
app.use("*", (req, res, next) => {
 
    loggedIn = req.cookies.token;
    
    next()
});
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




module.exports = app;
