
const express = require('express');
const http = require('http');


const app = express();

//const http = require('http').createServer(app);
const server = http.createServer(app);
const path = require('path');

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');





app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('sendMessage', (message) => {
//     console.log('message received: ', message);
//     io.emit('newMessage', message);
//   });

//   socket.on('sendMedia', (data) => {
//     console.log('media received: ', data.file);
//     // Process and store the media file here
//     io.emit('newMedia', data);
//   });
// });

server.listen(3000, () => {
  console.log('listening on *:3000');
});



const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('join', function(data) {
    socket.join(data.room);
    console.log(`${data.username} joined room ${data.room}`);
  });

  socket.on('leave', function(data) {
    socket.leave(data.room);
    console.log(`${data.username} left room ${data.room}`);
  });

  socket.on('message', function(data) {
    io.to(data.room).emit('message', data);
  });

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), function(req, res) {
  console.log(req.file);
  res.send('File uploaded');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

  
