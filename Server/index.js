var io = require('socket.io')(process.env.PORT || 52300);

console.log('Server has started');

io.on('connection', function(socket) {
    console.log('Game has connected!');



    socket.on('disconnect', function() {
        console.log('Game has disconnected!')
    })
});