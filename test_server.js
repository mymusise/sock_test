var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var sys = require("sys"),
    net = require("net");


app.listen(8086);


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
  // socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
//tcp
var server = net.createServer(function(stream) {
  stream.setEncoding("utf8");
  stream.addListener("connect", function() {
    sys.puts("Client connected");
    stream.write("hello\r\n");
  });
  stream.addListener("data", function(data) {
    sys.puts("Received from :"+ data);
    if (data.slice(0,4)=="hehe") {
    sys.puts("hello from tcp\n");
    var D=new Date();
    var date=String(D.getMonth())+"/"+String(D.getDate())+"-"+D.toLocaleTimeString();
    io.emit('news', "Received from ["+stream.remoteAddress+":"+stream.remotePort+"]:"+data+"    "+date);
  };
  console.log(stream.remoteAddress);
  console.log(stream.remotePort);

  });
  // stream.addListener("end", function() {
  //   sys.puts("Client disconnected");
  //   stream.write("goodbye\r\n");
  //   stream.end();
  // });
});
server.listen(8001, "127.0.0.1");

// stop the server after 10 secs