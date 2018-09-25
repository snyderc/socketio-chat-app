const socket = io();
console.log(socket.id);

const createLI = (text) => {
    const newLI = document.createElement('li');
    newLI.appendChild(document.createTextNode(text));
    return newLI;
}

const addMessageToWindow = (text) => {
    document.getElementById('messages').appendChild(createLI(text));
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.querySelector('#msg').value;
    socket.emit('chat message', message);
    document.getElementById('msg').value = '';
});

socket.on('chat message', (msg) => {
    addMessageToWindow(msg);
});

socket.on('user connects', (data) => {
    addMessageToWindow("A new user has connected.");
});