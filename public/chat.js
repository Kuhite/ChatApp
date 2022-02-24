const socket = io()

const room1 = location.search;
const sendmessage = document.querySelector("#text");
const template = document.querySelector("#message-template").innerHTML;
const welcomeMessage = document.querySelector("#welcome-template").innerHTML;
const chatbox = document.querySelector("#target");
const message = document.querySelector("#message");

const roomandUser = Qs.parse(room1,{ignoreQueryPrefix :true});
console.log(roomandUser);

const{username,roomname} = roomandUser;
socket.emit('joinRoom',roomname);

socket.on('roomJoined',() => {
    const displayMessage = Mustache.render(welcomeMessage,{user:username , room:roomname})
    chatbox.insertAdjacentHTML('beforeend', displayMessage);
})


//Socket function for messaging

sendmessage.onclick = (e) => {
    e.preventDefault();
    const messageToBeSent = message.value;
    socket.emit('messaging',(messageToBeSent));
}

socket.on('messaged',(m)=>{
    const rendered = Mustache.render(template,{message:m});
    chatbox.insertAdjacentHTML('beforeend',rendered);
})


