var app = require('http').createServer(handler)
var app2 = require('http').createServer(handler2)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8086);
app2.listen(8087);

function handler2 (argument) {
  // body...
}

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});