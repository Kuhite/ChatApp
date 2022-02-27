const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const socketio = require('socket.io');


const server = http.createServer(app);

const io = new socketio.Server(server);

const port = 3000;
app.use(express.json());


const publicDirectory = path.join(__dirname,'public')
app.use('/',express.static(publicDirectory));



io.on('connection',(socket) => {

    socket.on('joinRoom',(room) => {  
        socket.join(room.r);                                    //r to indicate the room parameter from chat.js
        socket.to(room.r).emit('roomJoined',room.u);            //u to indicate the user parameter from chat.js
        socket.emit('roomJoin')     
    })

    socket.on('messaging',(info)=>{
        socket.to(info.r).emit('messaged',{message:info.m, user:info.u})    // m to indicate the message sent from user 
        socket.emit('messageToMe',info.m);
      
    })

    socket.on('leaveRoom', async (user)=>{
        await socket.to(user.r).emit('leftRoom', user.u);              //u to indicate the user parameter from chat.js
        socket.leave(user.r);                                          //r to indicate the room parameter from chat.js
                      
    })
  
})



server.listen(port, () => {
    console.log("Listening Successfully!")
})