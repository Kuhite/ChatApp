const socket = io()

const button = document.querySelector("#messageInput");
const template = document.querySelector("#message-template").innerHTML;
const data = document.querySelector("#target");
const message = document.querySelector("#message");
button.addEventListener('click',()=>{
    var m = message.value;
    socket.emit('messaging',m)
})

socket.on('messaged',(m)=>{
    console.log(m);
    const rendered = Mustache.render(template,{message:m});
    data.insertAdjacentHTML('beforeend',rendered);
})