const socket = io()

const form = document.querySelector("#form");

const message = document.querySelector("form-input").value;

form.addEventListener('submit',(e) => {
    e.preventDefault();
    socket.emit('formSubmitted',{message})
})

socket.on('FORM',(socket)=>{
    console.log(socket);
})