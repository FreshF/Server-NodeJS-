var io = require('socket.io')(process.env.PORT || 5000);

console.log('Server has started');

io.on('connection', function(socket) {
    console.log('Game has connected!');



    socket.on('disconnect', function() {
        console.log('Game has disconnected!')
    })
});