var Ship = require('./ship.js');
var Settings = require('./settings.js');

function Player(id){
  console.log("testing player");
  var i;
  this.id = id;
  this.shots = Array(Settings.gridRows * Settings.gridCols);
  this.shipGrid = Array(Settings.gridRows * Settings.shipCols);
  this.ships = [];
  for (var i = 0; i < Settings.gridRows * Settings.shipCols; i++) {
    this.shots[i]
  }
};

module.exports = Player;