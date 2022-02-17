const socket = io()

const form = document.querySelector("#form");


form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = document.querySelector("#form-input").value;
   
    socket.emit('formSubmitted',{text:message})
})

socket.on('FORM',(socket)=>{
    const newMessage = document.createElement('p');
    const message = document.createTextNode(socket);
    newMessage.appendChild(message);
    const element = document.getElementById('message-board');
    newMessage.classList.add("message");
    element.appendChild(newMessage);
})


 socket.emit('joiningRoom',{room:'Room1'})
