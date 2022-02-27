const socket = io()

//Obtaining username and room from url
const url = location.search;

const roomandUser = Qs.parse(url,{ignoreQueryPrefix :true});

const{username,roomname} = roomandUser;

socket.emit('joinRoom',{u:username,r:roomname});

// Display Welcome message
const welcomeMessage = document.querySelector("#welcome-template").innerText;

socket.on('roomJoined',(name) => {
    const displayMessage = Mustache.render(welcomeMessage,{user:name})
    chatbox.insertAdjacentHTML('beforeend', displayMessage);
})

//Function for Room Heading
const RoomHeading = document.querySelector("#room-name");

socket.on('roomJoin',()=>{
    RoomHeading.innerText = roomname;
})


//Socket function for messaging
const message = document.querySelector("#message");
const sendmessage = document.querySelector("#textButton");
const template = document.querySelector("#message-template").innerText;
const chatbox = document.querySelector("#target");

sendmessage.onclick = (e) => {
    e.preventDefault();
    const messageToBeSent = message.value;

    socket.emit('messaging',({m:messageToBeSent,r:roomname}));
}

socket.on('messaged',(m)=>{
    const rendered = Mustache.render(template,{message:m});
    chatbox.insertAdjacentHTML('beforeend',rendered);
})



// Leaving Rooms

const leaveButton = document.querySelector('#leaveButton');
const leaving = document.querySelector('#leaving-template').innerText;

leaveButton.onclick = () => {
    console.log('clicked!');
    socket.emit('leaveRoom', {u:username, r:roomname});
}

socket.on('leftRoom', (user) => {
    console.log(user);
    const rendered = Mustache.render(leaving,{username:user});
    chatbox.insertAdjacentHTML('beforeend',rendered);
})



