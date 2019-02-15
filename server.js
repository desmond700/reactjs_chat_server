const express = require('express'),
http = require('http'),
socketIO = require('socket.io'),
bodyparser = require('body-parser'),
cors = require('cors'),
app = express();

app.use(bodyparser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("My localhost");
});

// our localhost port
const port = 4001;

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('UserConnected', (message) => {
    console.log(message + ' connected to chat')
    socket.emit("status", "connected");
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`))