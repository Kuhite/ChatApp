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

var roomName = '';

io.on('connection',(socket) => {

    socket.on('joinRoom',(room) => {  
        roomName = room;
        socket.join(room);
        socket.to(roomName).emit('roomJoined');
        
    })
  

    socket.on('messaging',(m)=>{
        socket.to(roomName).emit('messaged',m)
    })
  
})




server.listen(port, () => {
    console.log("Listening Successfully!")
})