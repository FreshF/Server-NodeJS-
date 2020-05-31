//port
var websocketPort = 52300;

// start websockets
/* var io = require('socket.io').listen(websocketPort);
console.log('Server is running on port ' + websocketPort); */

var io = require('socket.io')(process.env.PORT || websocketPort);
console.log('--- Server has started on port: '+websocketPort+' ---');

//websocket communication
io.on('connection', function(socket){
    console.log('New connection');

    // tell all clients who has connected
    var ipAddress = socket.handshake.address;
    io.emit('connect', {key: ipAddress});

    //react to connect event
    socket.on('connect', function(data){
        console.log("Connect event");
        console.dir(data);
        console.log(data.key + ' ' + data.value);
        //io.emit('message', {name: data.name, text: data.text});
    });

    /* // relay message of client to all other clients
    socket.on('message', function(data){
        console.log('Received message ');
        console.log('New message: ' + data);
        io.sockets.emit('message', {name: data.name, text: data.text});
    }); */

    // tell all clients who has disconnected
    socket.on('disconnect', function(){
        //io.emit('message', {name: ipAddress, text: 'left'});
        //console.log('client [' + ipAddress + '] disconnected');
        console.log("Disconnected");
    });
});