var io = require('socket.io')(process.env.PORT || 52300);
console.log('---Server has started---');

let vr = null;
let app = null;

io.on('connection', function(socket) {
    console.log('Connected');

    //Send data from server to the client
    //socket.emit('register', {id: "1"});
    socket.emit('start');

    socket.on('register', (message) => { // when register event received
        console.log("got register");
        switch (message) { //check if its from the vr of app
            case 'vr': //when its from the vr
                registerVrEvents(socket); //register vr handlers
                break;
            case 'app'://when its from app
                registerAppEvents(socket); //register app handlers
                break;
        }
    });
});

function registerAppEvents(socket) {
    app = socket; //set the socket to the app variable
    app.emit('event', 'app registered'); //send message that its registered
    app.on('event', message => { //when event received from app
        console.log("From app: " + message);
        if(vr) { //if vr connected
            vr.emit('event', message); //pass message from app to the vr
        }
    });

    socket.on('disconnect', function() { //when app disconnects
        console.log("App Disconnected");
        app = null; //set app variable to null again
    });
}

function registerVrEvents(socket) {
    vr = socket; //set the socket to the vr variable
    vr.emit('event', 'vr registered');//send message that its registered
    vr.on('event', message => {//when event received from vr
        console.log("From VR: " + message);
        if(app) { //if app connected
            app.emit('event', message);//pass message from vr to the app
        }
    });

    socket.on('disconnect', function() { //when vr disconnects
        console.log("VR Disconnected");
        vr = null; //sets vr variable to null again
    });
}
