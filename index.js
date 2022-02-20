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
app.use('/',express.static(publicDirectory))

io.on('connection',(socket) => {

    socket.on('joinRoom',(room) => {     
        socket.join(room);
        console.log(room)
        socket.emit('roomJoined',room)
        
    })

    socket.on('messaging',()=>{
        socket.emit('messaged')
    })
  
})




server.listen(port, () => {
    console.log("Listening Successfully!")
})