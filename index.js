//port
var websocketPort = 52300;

// start websockets
var io = require('socket.io').listen(websocketPort);
console.log('Server is running on port ' + websocketPort);

//websocket communication
io.sockets.on('connection', function(socket){
    // tell all clients who has connected
    var ipAddress = socket.handshake.address;
    io.sockets.emit('message', {name: ipAddress, text: 'joined'});
    console.log('New connection from ' + ipAddress);

    // relay message of client to all other clients
    socket.on('message', function(data){
        console.log('Received message ');
        console.log('New message: ' + data);
        io.sockets.emit('message', {name: data.name, text: data.text});
    });

    // tell all clients who has disconnected
    socket.on('disconnect', function(){
        io.sockets.emit('message', {name: ipAddress, text: 'left'});
        console.log('client [' + ipAddress + '] disconnected');
    });
});