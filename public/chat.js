const socket = io()


const submitButton = document.querySelector('#formSubmit');
const room = document.querySelector('#room-name');
const username = document.querySelector('#form-input')

submitButton.onclick = ()=> {
    
    const roomNo = room.value;
    console.log(roomNo);
    socket.emit('joinRoom', roomNo)
}

const button = document.querySelector("#messageInput");
const template = document.querySelector("#message-template");
const welcomeMessage = document.querySelector("#welcome-template");
const data = document.querySelector("#target");
const message = document.querySelector("#message");


button.onclick = ()=> {
    // var m = message.value;
    // console.log(message);
    // socket.emit('messaging',m);
    alert('hs')
}

socket.on('messaged',(m)=>{
    const rendered = Mustache.render(template,{message:m});
    data.insertAdjacentHTML('beforeend',rendered);
})

