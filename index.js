//port
var websocketPort = 52300;

// start websockets
/* var io = require('socket.io').listen(websocketPort);
console.log('Server is running on port ' + websocketPort); */

var io = require('socket.io')(process.env.PORT || websocketPort);
console.log('--- Server has started on port: '+websocketPort+' ---');

function reactToConnectEvent(data) {
    console.log("Connect event");
    console.dir(data);
    console.log(data.key + ' ' + data.value);
    //io.emit('message', {name: data.name, text: data.text});
}

//websocket communication
io.on('connection', function(socket){
    console.log('New connection');

    // tell all clients who has connected
    var ipAddress = socket.handshake.address;
    var data ='{"email":"some@email.com","pass":"1234"}';
    var dataJson = JSON.stringify(data);
    //socket.emit('connect', dataJson);

    socket.emit('boop', {"email":"some@email.com","pass":"1234"});
    //socket.emit('connect', '12');

    setAngle(socket, null);
    
    console.log("Ipaddress: " + ipAddress);
    console.log("DataJSON: " + dataJson);
    console.dir("DataJSON: " + dataJson);

    //react to connect event
    socket.on('beep', function(data){
        console.log("BEEP");
        socket.emit('boop', {email:"some@email.com",pass:"1234"});
    });

    //react to connect event
    socket.on('connect', function(data){
        reactToConnectEvent(data);
    });


    //react to set event
    socket.on('setAngle', function(data){
        setAngle(socket, data);
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


function setAngle(socket, data) {
    console.log("set event");

    //replace with actual angle
    data = "12";


    socket.emit('boop', data);
}