//port
var websocketPort = 52300;

//start websockets
var io = require('socket.io')(process.env.PORT || websocketPort);
console.log('--- Server is running on port: '+websocketPort+' ---');

//websocket communication
io.on('connection', function(socket){
    //log the ip of who has connected
    var ipAddress = socket.handshake.address;
    console.log('Client [' + ipAddress + '] connected');

    //*CONNECTED EVENT
    //react to connect event (which gets sent from unity/app after receiving default 'open')
    //TODO: remove at the end because the ip should be enough?
    socket.on('connected', function(data){
        //log who has connected
        console.log(data + " has connected");
    });

    //*BEEP EVENT
    //react to beep event for testing with example data
    socket.on('beep', function(data){
        console.log("beep");
        socket.emit('boop', {email:"some@email.com",pass:"1234"});
    });

    //*DISCONNECTED EVENT
    //on disconnecting
    socket.on('disconnect', function(){
        //log who has disconnected
        console.log('Client [' + ipAddress + '] disconnected');

        //TODO: tell all clients who has disconnected?
        //io.emit('disconnected', {name: ipAddress, text: 'text'}); //emits to all sockets & itself as well
    });


    //------------------------------------CUSTOM------------------------------------//

    
    //----------CUSTOM EVENTS FROM APP----------//
    //*SET ANGLE EVENT
    //on receiving SetAngle from the app
    socket.on('SetAngle', function(data){
        //log it
        console.log("Setting angle: " + data);

        //broadcast it to all other sockets but self
        socket.broadcast.emit('SetAngle', {data:data});
    });
    //----------CUSTOM EVENTS FROM APP----------//

    //----------CUSTOM EVENTS FROM UNITY----------//
    //*ADJUSTED ANGLE EVENT
    //on receiving AdjustedAngle from unity
    socket.on('AdjustedAngle', function(data){
        //log it
        console.log(data);

        //broadcast it to all other sockets but self
        socket.broadcast.emit('AdjustedAngle', {data:data});
    });
    //----------CUSTOM EVENTS FROM UNITY----------//
});