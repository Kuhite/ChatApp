const socket = io()

const form = document.querySelector("#form");
const message = document.querySelector("#welcomeMessage");
const room = document.querySelector("#room-name");


form.addEventListener('submit',() => {
    const roomNo = room.value;
    socket.emit('joinRoom',roomNo);
    removeEvent(roomNo);
})



const removeEvent  = form.removeEventListener('submit',(r) => {
    const roomNo = r;
    socket.emit('joinRoom',roomNo);
 })



socket.on('roomJoined',(room)=>{
    console.log(room)
    
   
    message.innerText = `Welcome to ${room}`
    console.log(message)
})
