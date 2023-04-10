// Initialize Socket.io connection
const socket = io();

// Handle new message received event
socket.on('newMessage', (message) => {
  const { user, text, timestamp } = message;
  const messageElement = $('<div>').addClass('message');
  $('<span>').addClass('user').text(user).appendTo(messageElement);
  $('<span>').addClass('timestamp').text(timestamp).appendTo(messageElement);
  $('<p>').addClass('text').text(text).appendTo(messageElement);
  $('#message-list').append(messageElement);
  $('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);
});

// Handle send message button click event
$('#send-button').click(() => {
  const text = $('#message-text').val();
  const user = 'User1'; // Replace with actual user name
  socket.emit('sendMessage', { user, text });
  $('#message-text').val('');
});

// Handle send media button click event
$('#media-button').click(() => {
  const file = $('#media-file').prop('files')[0];
  const user = 'User1'; // Replace with actual user name
  socket.emit('sendMedia', { user, file: file.name });
  $('#media-file').val('');
});
