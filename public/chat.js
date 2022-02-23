

const socket = io()

const room1 = window.location.href;
const sendmessage = document.querySelector("#text");
const template = document.querySelector("#message-template").innerHTML;
const welcomeMessage = document.querySelector("#welcome-template");
const chatbox = document.querySelector("#target");
const message = document.querySelector("#message");

const roomandUser = Qs.parse(room1,{});
const {username , room} = roomandUser;

sendmessage.onclick = (e) => {
    e.preventDefault();
    const messageToBeSent = message.value;
    socket.emit('messaging',(messageToBeSent));
}


socket.on('messaged',(m)=>{
    const rendered = Mustache.render(template,{message:m});
    chatbox.insertAdjacentHTML('beforeend',rendered);
})


socket.emit('joinRoom',{username,room});