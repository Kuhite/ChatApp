const socket = io()

const room1 = location.search;
const sendmessage = document.querySelector("#text");
const template = document.querySelector("#message-template").innerHTML;
const welcomeMessage = document.querySelector("#welcome-template").innerHTML;
const chatbox = document.querySelector("#target");
const message = document.querySelector("#message");
const RoomHeading = document.querySelector("#room-name")


//Obtaining username and room from url
const roomandUser = Qs.parse(room1,{ignoreQueryPrefix :true});
const{username,roomname} = roomandUser;
socket.emit('joinRoom',roomname);

socket.on('roomJoined',() => {
    const displayMessage = Mustache.render(welcomeMessage,{user:username , room:roomname})
    chatbox.insertAdjacentHTML('beforeend', displayMessage);
})

socket.on('roomJoin',()=>{
    RoomHeading.innerText = roomname;
})


//Socket function for messaging

sendmessage.onclick = (e) => {
    e.preventDefault();
    const messageToBeSent = message.value;
    socket.emit('messaging',({m:messageToBeSent,r:roomname}));
}

socket.on('messaged',(m)=>{
    const rendered = Mustache.render(template,{message:m});
    chatbox.insertAdjacentHTML('beforeend',rendered);
})

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    return event.returnValue='Are you sure you want to exit?';
})


