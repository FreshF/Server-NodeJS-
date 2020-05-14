console.log('Server has started');

var io = require('socket.io')(process.env.PORT || 52300);

io.on('connection', function(socket) {
    console.log('Device has connected!');

    socket.emit('registerGame')

    socket.emit('registerApp')

    socket.on('registeredGame', function() {
        console.log('Game is registered')
    })

    socket.on('registeredApp', function() {
        console.log('App is registered')
    })

    socket.on('disconnect', function() {
        console.log('Device has disconnected!')
    })
});