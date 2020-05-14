console.log('Server has started');

var io = require('socket.io')(process.env.PORT || 52300);

io.on('connection', function(socket) {
    console.log('Game has connected!');

    socket.on('hello', function() {
        console.log('Yo wazuuup!')
    })



    socket.on('disconnect', function() {
        console.log('Game has disconnected!')
    })
});