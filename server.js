var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

var port = 8900;

app.use(express.static(__dirname + '/public'));

http.listen(port, function(){
    console.log('listening on *:' + port);
});

io.on('connection', function(socket){
    console.log('socket connected');
});
