const socket = io()

const button = document.querySelector("#messageInput");
const template = document.querySelector("#message-template").innerHTML;
const data = document.querySelector("#target");

button.addEventListener('click',()=>{
    const rendered = Mustache.render(template);
    data.insertAdjacentHTML('beforeend',rendered);
})