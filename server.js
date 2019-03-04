var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var port = 8900;
var users = {};
var gameIdCounter = 1;

var BattleshipGame = require('./app/game.js');
var GameStatus = require('./app/gameStatus.js');

app.use(express.static(__dirname + '/public'));

http.listen(port, function(){
  console.log('Lisening... The port is: '  + port);
});

io.on('connection', function(socket) {
  console.log('User Logged..!');

  users[socket.id] = { // create user object for additional data
    inGame: null,
    player: null
  };

  socket.join('waiting room'); // join waiting room until there are enough players to start a new game

  joinWaitingPlayers();
});

function joinWaitingPlayers() {
  var players = getClientsInRoom('waiting room');

  if(players.length >= 2) {
    // 2 player waiting. Create new game!
    var game = new BattleshipGame(gameIdCounter++, players[0].id, players[1].id);

    // create new room for this game
    players[0].leave('waiting room');
    players[1].leave('waiting room');
    players[0].join('game' + game.id);
    players[1].join('game' + game.id);
    users[players[0].id].player = 0;
    users[players[1].id].player = 1;
    users[players[0].id].inGame = game;
    users[players[1].id].inGame = game;
    io.to('game' + game.id).emit('join', game.id);

    // send initial ship placements
    io.to(players[0].id).emit('update', game.getGameState(0, 0));
    io.to(players[1].id).emit('update', game.getGameState(1, 1));

    console.log((new Date().toISOString()) + " " + players[0].id + " and " + players[1].id + " have joined game ID " + game.id);
  }
}


function getClientsInRoom(room){
  var clients = [];
  for(var id in io.sockets.adapter.rooms[room]){
    clients.push(io.sockets.adapter.nsp.connected[id]);
  }
  return clients;
}