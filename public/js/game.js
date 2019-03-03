var GameStatus = {
    inProgress: 1,
    gameOver: 2
}
/**get canvas and draw */
var Game = (function(){
    var canvas = [], context = [], grid = [],
    gridHeight = 361, gridWidth = 361, gridBorder = 1,
    gridRows = 10, gridCols = 10, markPadding = 10, shipPadding = 3,
    squareHeight = (gridHeight - gridBorder * gridRows - gridBorder) / gridRows,
    squareWidth = (gridWidth - gridBorder * gridCols - gridBorder) / gridCols,
    turn = false, gameStatus, squareHover = { x: -1, y: -1 };

canvas[0] = document.getElementById('canvas-grid1');
canvas[1] = document.getElementById('canvas-grid2');
context[0] = canvas[0].getContext('2d');
context[1] = canvas[1].getContext('2d');

});

