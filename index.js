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
    console.log('A user connected!')

    socket.on('formSubmitted',(message)=>{
        socket.broadcast.emit('FORM',message.message)
    })
    
})




server.listen(port, () => {
    console.log("Listening Successfully!")
})