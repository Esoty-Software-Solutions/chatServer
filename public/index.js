const socket = io('http://localhost:3000');


socket.emit('join', { username: 'User1', room: 'Room1' });

socket.on('message', function(data) {
  console.log(`${data.username}: ${data.message}`);
});

socket.emit('message', { username: 'User1', room: 'Room1', message: 'Hello, User2!' });





