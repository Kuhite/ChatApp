
const socket = io()

const autoScroll = () => {
    var elem = document.querySelector('#target');
    elem.scrollTop = elem.scrollHeight;
  }

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
    autoScroll();
})

//Function for Room Heading
const RoomHeading = document.querySelector("#room-name");

socket.on('roomJoin',()=>{
    RoomHeading.innerText = roomname;
})


//Socket function for messaging
const message = document.querySelector("#message");
const sendmessage = document.querySelector("#textButton");
const template = document.querySelector("#message-template").innerHTML;
const chatbox = document.querySelector("#target");
const templatetoMe = document.querySelector("#message-templateToMe").innerHTML;


const sendingMessage = () => {
    const messageToBeSent = message.value;
    if(messageToBeSent === '')return alert('Input Empty!');
    message.value='';
    socket.emit('messaging',{m:messageToBeSent,r:roomname , u:username});
}

sendmessage.onclick = (e) => {
    e.preventDefault();
    sendingMessage();
}

message.addEventListener('keypress', (e) => {
    if(e.key ==='Enter'){
        sendingMessage();
    }
})

socket.on('messaged',(info)=>{
    const rendered = Mustache.render(template,{sender:info.user,message:info.message});
    chatbox.insertAdjacentHTML('beforeend',rendered);
})

const you = "You";
socket.on('messageToMe',(info)=>{
    const rendered = Mustache.render(templatetoMe,{sender:you,message:info});
    chatbox.insertAdjacentHTML('beforeend',rendered);
    autoScroll();
})

// Leaving Rooms

const leaveButton = document.querySelector('#leaveButton');
const leaving = document.querySelector('#leaving-template').innerText;

leaveButton.onclick = () => {
    socket.emit('leaveRoom', {u:username, r:roomname});
}

socket.on('leftRoom', (user) => {
    const rendered = Mustache.render(leaving,{username:user});
    chatbox.insertAdjacentHTML('beforeend',rendered);
    autoScroll();
})


// JS FOR THE EMOJI PICKER
document.querySelector('emoji-picker').addEventListener('emoji-click', event => {document.querySelector('input').value += event.detail.unicode})

document.querySelector('#emoji').addEventListener('click', ()=> {
    var emoji =  document.querySelector('emoji-picker');
    if(emoji.style.display !== 'block'){
        emoji.style.display='block';
    }else{
        emoji.style.display='none';
    }
})
