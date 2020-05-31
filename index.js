//port
var websocketPort = 52300;

//start websockets
var io = require('socket.io')(process.env.PORT || websocketPort);
console.log('--- Server is running on port: '+websocketPort+' ---');

//websocket communication
io.on('connection', function(socket){
    //log who has connected
    var ipAddress = socket.handshake.address;
    console.log(ipAddress + ' connected');

    //react to connect event (which gets sent after receiving 'open')
    //TODO: remove at the end
    socket.on('connected', function(data){
        Connected(data);
    });

    //react to beep event for testing with example data
    socket.on('beep', function(data){
        console.log("beep");
        socket.emit('boop', {email:"some@email.com",pass:"1234"});
    });

    //tell all clients who has disconnected
    socket.on('disconnect', function(){
        //io.emit('message', {name: ipAddress, text: 'left'});
        console.log('Client [' + ipAddress + '] disconnected');
        //console.log("Disconnected");
    });

    //----------CUSTOM EVENTS----------//
    //when receiving set from the app check what to set and then set it
    socket.on('set', function(data){
        SetAngle(socket, data);
    });
    //----------CUSTOM EVENTS----------//


    //----------TESTING----------//
    //socket.emit('setAngle', {angle: "12"});
    SetAngle(socket, "12");
    //----------TESTING----------//
});

//Log the received data (who has connected)
function Connected(data) {
    console.log(data + " has connected");
}

function SetAngle(socket, data) {
    //TODO: replace with actual angle
    //data = "12";


    console.log("setAngle: " + data);
    socket.emit('setAngle', {angle: data});
}