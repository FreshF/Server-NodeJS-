//port
var websocketPort = 52300;

// start websockets
var io = require('socket.io')(process.env.PORT || websocketPort);
console.log('--- Server is running on port: '+websocketPort+' ---');

function Connected(data) {
    console.log(data + " has connected");
}

//websocket communication
io.on('connection', function(socket){
    //Log who has connected
    var ipAddress = socket.handshake.address;
    console.log(ipAddress + ' has connected');

    //test emitting data
    socket.emit('setAngle', {angle: "12"});

    //react to beep event for testing with example data
    socket.on('beep', function(data){
        console.log("beep");
        socket.emit('boop', {email:"some@email.com",pass:"1234"});
    });

    //react to connect event
    socket.on('connected', function(data){
        Connected(data);
    });


    /* //react to set event
    socket.on('setAngle', function(data){
        setAngle(socket, data);
    }); */

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


function setAngle(socket, data) {
    console.log("set event");

    //replace with actual angle
    data = "12";


    socket.emit('boop', data);
}