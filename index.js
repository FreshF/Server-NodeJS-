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
        
        
        
        
        socket.broadcast.emit('ToggleMirror');
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

    
    //*!----------CUSTOM EVENTS FROM APP----------//

    //*!SET SCENE EVENT
        //on receiving SetScene from the app
        socket.on('SetScene', function(data){
            //log it
            console.log("Setting Scene: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('SetScene', {data:data});
        });

    //*!SET Spawner EVENT
        //on receiving SetSpawner from the app
        socket.on('SetSpawner', function(data){
            //log it
            console.log("Setting Spawner: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('SetSpawner', {data:data});
        });

    //*!SET ANGLE EVENT
        //on receiving SetAngle from the app
        socket.on('SetAngle', function(data){
            //log it
            console.log("Setting Angle: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('SetAngle', {data:data});
        });

    //*!SET Speed EVENT
        //on receiving SetSpeed from the app
        socket.on('SetSpeed', function(data){
            //log it
            console.log("Setting Speed: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('SetSpeed', {data:data});
        });

    //*!Toggle Mirror EVENT
        //on receiving ToggleMirror from the app
        socket.on('ToggleMirror', function(data){
            //log it
            console.log("Toggle Mirror: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('ToggleMirror', {data:data});
        });

    //*!Toggle Slope EVENT
        //on receiving ToggleSlope from the app
        socket.on('ToggleSlope', function(data){
            //log it
            console.log("Toggle Slope: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('ToggleSlope', {data:data});
        });

    //*!Toggle Sticks EVENT
        //on receiving ToggleSticks from the app
        socket.on('ToggleSticks', function(data){
            //log it
            console.log("Toggle Sticks: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('ToggleSticks', {data:data});
        });    


    //*!SET Score EVENT
        //on receiving SetScore from the app
        socket.on('SetScore', function(data){
            //log it
            console.log("Setting Score: " + data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('SetScore', {data:data});
        });
        
        
    //*!----------CUSTOM EVENTS FROM APP----------//



    //*?----------CUSTOM EVENTS FROM UNITY----------//

    //*?ADJUSTED Scene EVENT
        //on receiving AdjustedScene from unity
        socket.on('AdjustedScene', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('AdjustedScene', {data:data});
        });

    //*?ADJUSTED Spawner EVENT
        //on receiving AdjustedSpawner from unity
        socket.on('AdjustedSpawner', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('AdjustedSpawner', {data:data});
        });

    //*?ADJUSTED ANGLE EVENT
        //on receiving AdjustedAngle from unity
        socket.on('AdjustedAngle', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('AdjustedAngle', {data:data});
        });

    //*?ADJUSTED Speed EVENT
        //on receiving AdjustedSpeed from unity
        socket.on('AdjustedSpeed', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('AdjustedSpeed', {data:data});
        });

    //*?Toggled Mirror EVENT
        //on receiving ToggledMirror from unity
        socket.on('ToggledMirror', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('ToggledMirror', {data:data});
        });

     //*?Toggled Slope EVENT
        //on receiving ToggledSlope from unity
        socket.on('ToggledSlope', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('ToggledSlope', {data:data});
        });       

    //*?Toggled Sticks EVENT
        //on receiving ToggledSticks from unity
        socket.on('ToggledSticks', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('ToggledSticks', {data:data});
        });

    //*?ADJUSTED Score EVENT
        //on receiving AdjustedScore from unity
        socket.on('AdjustedScore', function(data){
            //log it
            console.log(data);

            //broadcast it to all other sockets but self
            socket.broadcast.emit('AdjustedScore', {data:data});
        });


    //*?----------CUSTOM EVENTS FROM UNITY----------//
});