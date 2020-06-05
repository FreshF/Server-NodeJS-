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

    //react to connect event (which gets sent from unity after receiving default 'open')
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
        //io.emit('disconnected', {name: ipAddress, text: 'text'});
        console.log('Client [' + ipAddress + '] disconnected');
        //console.log("Disconnected");
    });

    //----------CUSTOM EVENTS----------//
    //when receiving set from the app check what to set and then set it
    //TODO: from ionic emit with eventname: 'SetAngle' & data: the angle as a string
    socket.on('SetAngle', function(data){
        console.log("Setting angle: " + data);
        //SetAngle(socket, data);

        //{email:"some@email.com",pass:"1234"}

        //io.sockets.emit('setAngle', {email:"some@email.com",pass:"1234"});

        socket.broadcast.emit('setAngle', {email:"some@email.com",pass:"1234"});



        //io.sockets.emit('setAngle', data);
        //socket.broadcast.emit('setAngle', data);
        //socket.emit('setAngle', data);
    });
    //----------CUSTOM EVENTS----------//


    //----------TESTING----------//
    //TODO: replace with actual angle and dont execute like this but only after event from app
    //SetAngle(socket, "12");
    //----------TESTING----------//
});

//Log the received data (who has connected)
function Connected(data) {
    console.log("Connected event");
    console.log(data + " has connected");
}

function SetAngle(socket, data) {
    console.log("SetAngle: " + data);
    socket.emit('setAngle', data);
}