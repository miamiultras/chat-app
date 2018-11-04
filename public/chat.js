// make connection
const socket = io.connect('http://localhost:4000');

// query dom
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.querySelector('.output');
const feedback = document.querySelector('.feedback');

console.log(feedback);

//emit events
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.innerHTML = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
})

//listen for events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
