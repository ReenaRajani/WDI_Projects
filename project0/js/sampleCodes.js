function drawCross(cellX, cellY) {
    // From top right to bottom left of the cell
    ctx.beginPath();
    ctx.moveTo(cellX * cellWidth, cellY * cellHeight);
    ctx.lineTo(cellX * cellWidth + cellWidth, cellY * cellHeight + cellHeight);
    ctx.stroke();

    // From top left to bottom right of the cell
    ctx.beginPath();
    ctx.moveTo(cellX * cellWidth + cellWidth, cellY * cellHeight);
    ctx.lineTo(cellX * cellWidth, cellY * cellHeight + cellHeight);
    ctx.stroke();
}

function drawCircle(cellX, cellY) {
    /** An arc, centered in the middle of the cell,
      * Radius set to half of the cell,
      * going from 0 to 360 degrees (a full circle).
      */
    ctx.beginPath();
    ctx.arc(cellX * cellWidth + cellWidth / 2, cellY * cellHeight + cellHeight / 2, cellWidth / 2, 0, 360, false);
    ctx.stroke();
}



var gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var canvas;
var width = 400;
var height = 400;
var cellWidth = width / 3;
var cellHeight = height / 3;
var ctx;
var currentPlayer;
 
window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
 
    canvas.width = width;
    canvas.height = height;
 
    canvas.onclick = onCanvasClick;
 
    refreshGame();
     
    currentPlayer = 1;
 
};
 
function refreshGame() {
    ctx.clearRect(0, 0, width, height);
    drawGameBoard();
    drawPlayerMoves();
}
 
function drawGameBoard() {
 
    // Drawing vertical line 1
    ctx.beginPath();
    ctx.moveTo(cellWidth, 0);
    ctx.lineTo(cellWidth, height);
    ctx.stroke();
 
    // Drawing vertical line 0
    ctx.beginPath();
    ctx.moveTo(cellWidth * 2, 0);
    ctx.lineTo(cellWidth * 2, height);
    ctx.stroke();
 
    // Drawing horizontal line 1
    ctx.beginPath();
    ctx.moveTo(0, cellHeight);
    ctx.lineTo(width, cellHeight);
    ctx.stroke();
 
    // Drawing horizontal line 2
    ctx.beginPath();
    ctx.moveTo(0, cellHeight * 2);
    ctx.lineTo(width, cellHeight * 2);
    ctx.stroke();
}
 
function drawPlayerMoves() {
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            var cell = gameStatus[i][j];
            if (cell == 1) {
                drawCross(i, j);
 
            } else if (cell == 2) {
                drawCircle(i, j);
            }
        }
    }
}
 
function onCanvasClick(e) {
    var mCoordinate = getMouseLocation(e);
    var cell = getCellFromLocation(mCoordinate);
    processCellClick(cell);
}
 
// Getting mouse x,y coordinate on a click event relative to the canvas
function getMouseLocation(e) {
 
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
 
    return { x: mouseX, y: mouseY };
}
 
// Get the cell corresponding to a mouse location
function getCellFromLocation(mCoordinate) {
    var cellCoordinate = { x: 0, y: 0 };
 
    if (mCoordinate.x > cellWidth * 2) {
        cellCoordinate.x = 2;
    } else if (mCoordinate.x > cellWidth) {
        cellCoordinate.x = 1;
    }
 
    if (mCoordinate.y > cellHeight * 2) cellCoordinate.y = 2;
    else if (mCoordinate.y > cellHeight) cellCoordinate.y = 1;
 
    return cellCoordinate;
}
 
function processCellClick(cell) {
    if (gameStatus[cell.x][cell.y] != 0) return;
    gameStatus[cell.x][cell.y] = currentPlayer;
 
    refreshGame();
 
    if (currentPlayer == 1) currentPlayer = 2;
    else currentPlayer = 1;
 
    checkSolved();
}
 
function drawCross(cellX, cellY) {
    // From top right to bottom left of the cell
    ctx.beginPath();
    ctx.moveTo(cellX * cellWidth, cellY * cellHeight);
    ctx.lineTo(cellX * cellWidth + cellWidth, cellY * cellHeight + cellHeight);
    ctx.stroke();
 
    // From top left to bottom right of the cell
    ctx.beginPath();
    ctx.moveTo(cellX * cellWidth + cellWidth, cellY * cellHeight);
    ctx.lineTo(cellX * cellWidth, cellY * cellHeight + cellHeight);
    ctx.stroke();
}
 
function drawCircle(cellX, cellY) {
    /** An arc, centered in the middle of the cell,
      * Radius set to half of the cell,
      * going from 0 to 360 degrees (a full circle).
      */
    ctx.beginPath();
    ctx.arc(cellX * cellWidth + cellWidth / 2, cellY * cellHeight + cellHeight / 2, cellWidth / 2, 0, 360, false);
    ctx.stroke();
}
 
// Checks if the game is finished, either by a win or a draw
function checkSolved() {
 
    var full = true;
 
    for (var i = 0; i < 3; i++) {
        var p1Rows = 0, p1Columns = 0;
        var p2Rows = 0, p2Columns = 0;
        for (var j = 0; j < 3; j++) {
            // Checking rows
            if (gameStatus[j][i] == 1)
                p1Rows++;
            else if (gameStatus[j][i] == 2)
                p2Rows++;
            else
                full = false;
 
            // Checking columns
            if (gameStatus[i][j] == 1)
                p1Columns++;
            else if (gameStatus[i][j] == 2)
                p2Columns++;
        }
 
        // Checking diagonals
        var p1Diag = gameStatus[0][0] == 1 && gameStatus[1][1] == 1 && gameStatus[2][2] == 1;
        p1Diag = p1Diag || gameStatus[0][2] == 1 && gameStatus[1][1] == 1 && gameStatus[2][0] == 1;
 
        var p2Diag = gameStatus[0][0] == 2 && gameStatus[1][1] == 2 && gameStatus[2][2] == 2;
        p2Diag = p2Diag || gameStatus[0][2] == 2 && gameStatus[1][1] == 2 && gameStatus[2][0] == 2;
 
        // Processing win scenario when necessary
        if (p1Rows == 3 || p1Columns == 3 || p1Diag) {
            processEndGame("Player 1 win!");
            return;
        } else if (p2Rows == 3 || p2Columns == 3 || p2Diag) {
            processEndGame("Player 2 win!");
            return;
        }
    }
    // Checking draw
    if (full) {
        processEndGame("Draw !");
    }
}
 
// Displays an end-game message then re-initialize the game
function processEndGame(msg) {
    alert(msg);
    gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    currentPlayer = 1;
    refreshGame();
}