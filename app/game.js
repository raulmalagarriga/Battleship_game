var Player = require('./player.js');
var GameStatus = require('./gameStatus.js');

function BattleshipGame(id, idPlayer1, idPlayer2) {
  console.log("HI HI HI");
  this.id = id;
  this.currentPlayer = Math.floor(Math.random() * 2);
  this.winningPlayer = null;
  this.gameStatus = GameStatus.inProgress;
  console.log("test");
  this.players = [new Player(idPlayer1), new Player(idPlayer2)];
}

module.exports = BattleshipGame;