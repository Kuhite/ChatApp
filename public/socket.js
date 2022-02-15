const socket = io()

const form = document.querySelector("#form");


form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = document.querySelector("#form-input").value;
   
    socket.emit('formSubmitted',{text:message})
})

socket.on('FORM',(socket)=>{
    console.log(socket);
})