var app = require('express')(); // Defined as function handler to supply to HTTP server
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

const listOfClientIds = [];

io.on('connection', (socket) => {
    console.log(socket, socket.id, socket.client);
    socket.broadcast.emit('user connects');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

// Run "node index.js" to launch