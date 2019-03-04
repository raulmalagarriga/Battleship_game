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

function drawSquares(gridIndex){
    var i,j,squareX,squareY;

    context[gridIndex].fillStyle = '#222222'
    context[gridIndex].fillRect(0,0,gridWidth,gridHeight);

    for(i = 0; i < gridRows; i++){
        for(j = 0; j < gridCols; j++){
            squareX = j * (squareWidth + gridBorder) + gridBorder;
            squareY = i * (squareHeight + gridBorder) + gridBorder;

            context[gridIndex].fillStyle = '#7799FF'

            //Highlight square if: user s turn and hover
            if(j === squareHover.x && i === squareHover.y &&
                gridIndex === 1 && grid[gridIndex].shots[i * gridCols + j] === 0 && turn) {
            context[gridIndex].fillStyle = '#4477FF';
            }

            context[gridIndex].fillRect(squareX, squareY, squareWidth, squareHeight);              
        }    
    }
};
//draw visible ships on grid
function drawShips(gridIndex) {
    var ship, i, x, y,
        shipWidth, shipLength;

    context[gridIndex].fillStyle = '#444444';
    
    for(i = 0; i < grid[gridIndex].ships.length; i++) {
      ship = grid[gridIndex].ships[i];

      x = ship.x * (squareWidth + gridBorder) + gridBorder + shipPadding;
      y = ship.y * (squareHeight + gridBorder) + gridBorder + shipPadding;
      shipWidth = squareWidth - shipPadding * 2;
      shipLength = squareWidth * ship.size + (gridBorder * (ship.size - 1)) - shipPadding * 2;

      if(ship.horizontal) {
        context[gridIndex].fillRect(x, y, shipLength, shipWidth);
      } else {
        context[gridIndex].fillRect(x, y, shipWidth, shipLength);
      }
    }
  };
//draw shot s marks
function drawMarks(gridIndex) {
    var i, j, squareX, squareY;

    for(i = 0; i < gridRows; i++) {
      for(j = 0; j < gridCols; j++) {
        squareX = j * (squareWidth + gridBorder) + gridBorder;
        squareY = i * (squareHeight + gridBorder) + gridBorder;

        // draw black cross if there is a missed shot on square
        if(grid[gridIndex].shots[i * gridCols + j] === 1) {
          context[gridIndex].beginPath();
          context[gridIndex].moveTo(squareX + markPadding, squareY + markPadding);
          context[gridIndex].lineTo(squareX + squareWidth - markPadding, squareY + squareHeight - markPadding);
          context[gridIndex].moveTo(squareX + squareWidth - markPadding, squareY + markPadding);
          context[gridIndex].lineTo(squareX + markPadding, squareY + squareHeight - markPadding);
          context[gridIndex].strokeStyle = '#000000';
          context[gridIndex].stroke();
        }
        // draw red circle if hit on square
        else if(grid[gridIndex].shots[i * gridCols + j] === 2) {
          context[gridIndex].beginPath();
          context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
                                 squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
          context[gridIndex].fillStyle = '#E62E2E';
          context[gridIndex].fill();
        }
      }
    }
  };
  function drawGrid(gridIndex) {
    drawSquares(gridIndex);
    drawShips(gridIndex);
    drawMarks(gridIndex);
  };
drawGrid();//only testing  
});

