const socket = io()


const room1 = window.location.href
;const sendmessage = document.querySelector("#text");
const template = document.querySelector("#message-template");
const welcomeMessage = document.querySelector("#welcome-template");
const data = document.querySelector("#target");
const message = document.querySelector("#message");

const roomandUser = Qs.parse(room1,{});
const {username , room} = roomandUser;

sendmessage.onclick = () => {
    console.log(roomandUser.room);
}


socket.on('messaged',(m)=>{
    const rendered = Mustache.render(template,{message:m});
    data.insertAdjacentHTML('beforeend',rendered);
})


socket.emit('joinRoom',{username,room});