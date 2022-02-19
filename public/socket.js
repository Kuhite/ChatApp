const socket = io()

const form = document.querySelector("#form");


form.addEventListener('submit',(e) => {
    const roomNo = document.querySelector("#room-name").value;
    console.log(roomNo)
   
    socket.emit('formSubmitted',{text:message});
    socket.emit('joiningRoom',{room:roomNo})

    form.removeEventListener('submit');
})

// socket.on('FORM',(socket)=>{
//     const newMessage = document.createElement('p');
//     const message = document.createTextNode(socket);
//     newMessage.appendChild(message);
//     const element = document.getElementById('message-board');
//     newMessage.classList.add("message");
//     element.appendChild(newMessage);
// })


socket.on('Roomjoined',(socket)=>{
    alert('You have joined', socket.room)
    console.log(socket.rooms)
})
