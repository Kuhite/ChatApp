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
        socket.join(room);
        socket.to(room).emit('roomJoined');
        socket.emit('roomJoin')
        console.log(socket.rooms);
        
    })

    socket.on('messaging',(m)=>{
        
        socket.to(m.r).emit('messaged',m.m)
        socket.emit('messaged',m.m);
        console.log(m.m);
    })
  
})




server.listen(port, () => {
    console.log("Listening Successfully!")
})