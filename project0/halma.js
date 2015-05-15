/*
Halma is a centuries-old board game. Many variations exist. In this example, I’ve created a solitaire version of Halma with 9 pieces on a 9 × 9 board. In the beginning of the game, the pieces form a 3 × 3 square in the bottom-left corner of the board. The object of the game is to move all the pieces so they form a 3 × 3 square in the upper-right corner of the board, in the least number of moves.

There are two types of legal moves in Halma:

Take a piece and move it to any adjacent empty square. An “empty” square is one that does not currently have a piece in it. An “adjacent” square is immediately north, south, east, west, northwest, northeast, southwest, or southeast of the piece’s current position. (The board does not wrap around from one side to the other. If a piece is in the left-most column, it can not move west, northwest, or southwest. If a piece is in the bottom-most row, it can not move south, southeast, or southwest.)
Take a piece and hop over an adjacent piece, and possibly repeat. That is, if you hop over an adjacent piece, then hop over another piece adjacent to your new position, that counts as a single move. In fact, any number of hops still counts as a single move. (Since the goal is to minimize the total number of moves, doing well in Halma involves constructing, and then using, long chains of staggered pieces so that other pieces can hop over them in long sequences.)

*/

/*
gCanvasElement.addEventListener("click", halmaOnClick, false);
target.addEventListener(type, listener[, useCapture]); --> useCapture indicates that the user wishes to initiate capture. After initiating capture, all events of the specified type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
 If its last argument is true the event handler is set for the capturing phase, if it is false the event handler is set for the bubbling phase.

*/


// setting the dimensions for board and the piece and the pixel !! 

var kBoardWidth = 9;
var kBoardHeight= 9;
var kPieceWidth = 50;
var kPieceHeight= 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth); // the selected circle 
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var gCanvasElement;
var gDrawingContext;
var gPattern;

var gPieces;
var gNumPieces;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gMoveCountElem;
var gGameInProgress;


//gets the cell position based on the row and col
function Cell(row, column) {
    this.row = row;
    this.column = column;
}

//
function getCursorPosition(e) {
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    // gettin the top and leff of the element and deducting it with the current x cordinate .. y ??
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;

    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Cell(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
    return cell;
}

function halmaOnClick(e) {
    var cell = getCursorPosition(e); // using the current cursor position gets the cell
    // going for the game pieces and checking if the current cusor position points to that particular row/col
    
    for (var i = 0; i < gNumPieces; i++) {
  if ((gPieces[i].row == cell.row) && 
      (gPieces[i].column == cell.column)) {
      clickOnPiece(i);
      return;
  }
    }
    clickOnEmptyCell(cell);
}

function clickOnEmptyCell(cell) {
    if (gSelectedPieceIndex == -1) { return; }
    var rowDiff = Math.abs(cell.row - gPieces[gSelectedPieceIndex].row);
    var columnDiff = Math.abs(cell.column - gPieces[gSelectedPieceIndex].column);
    if ((rowDiff <= 1) &&
  (columnDiff <= 1)) {
  /* we already know that this click was on an empty square,
     so that must mean this was a valid single-square move */
  gPieces[gSelectedPieceIndex].row = cell.row;
  gPieces[gSelectedPieceIndex].column = cell.column;
  gMoveCount += 1;
  gSelectedPieceIndex = -1;
  gSelectedPieceHasMoved = false;
  drawBoard();
  return;
    }
    if ((((rowDiff == 2) && (columnDiff == 0)) ||
   ((rowDiff == 0) && (columnDiff == 2)) ||
   ((rowDiff == 2) && (columnDiff == 2))) && 
  isThereAPieceBetween(gPieces[gSelectedPieceIndex], cell)) {
  /* this was a valid jump */
  if (!gSelectedPieceHasMoved) {
      gMoveCount += 1;
  }
  gSelectedPieceHasMoved = true;
  gPieces[gSelectedPieceIndex].row = cell.row;
  gPieces[gSelectedPieceIndex].column = cell.column;
  drawBoard();
  return;
    }
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    drawBoard();
}

function clickOnPiece(pieceIndex) {
    if (gSelectedPieceIndex == pieceIndex) { return; }
    gSelectedPieceIndex = pieceIndex;
    gSelectedPieceHasMoved = false;
    drawBoard();
}

function isThereAPieceBetween(cell1, cell2) {
    /* note: assumes cell1 and cell2 are 2 squares away
       either vertically, horizontally, or diagonally */
    var rowBetween = (cell1.row + cell2.row) / 2;
    var columnBetween = (cell1.column + cell2.column) / 2;
    for (var i = 0; i < gNumPieces; i++) {
  if ((gPieces[i].row == rowBetween) &&
      (gPieces[i].column == columnBetween)) {
      return true;
  }
    }
    return false;
}

function isTheGameOver() {
    for (var i = 0; i < gNumPieces; i++) {
  if (gPieces[i].row > 2) {
      return false;
  }
  if (gPieces[i].column < (kBoardWidth - 3)) {
      return false;
  }
    }
    return true;
}

function drawBoard() {
    if (gGameInProgress && isTheGameOver()) {
        endGame();
    }

    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);

    gDrawingContext.beginPath();
    
    /* vertical lines */
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
        gDrawingContext.moveTo(0.5 + x, 0);
        gDrawingContext.lineTo(0.5 + x, kPixelHeight);
    }
    
    /* horizontal lines */
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
        gDrawingContext.moveTo(0, 0.5 + y);
        gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
    }
    
    /* draw it! */
    gDrawingContext.strokeStyle = "#ccc";
    gDrawingContext.stroke();
    
    for (var i = 0; i < 9; i++) {
        drawPiece(gPieces[i], i == gSelectedPieceIndex);
    }

    gMoveCountElem.innerHTML = gMoveCount;

    saveGameState();
}

function drawPiece(p, selected) {
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + (kPieceWidth/2);
    var y = (row * kPieceHeight) + (kPieceHeight/2);
    var radius = (kPieceWidth/2) - (kPieceWidth/10);
    gDrawingContext.beginPath();
    gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
    gDrawingContext.closePath();
    gDrawingContext.strokeStyle = "#000";
    gDrawingContext.stroke();
    if (selected) {
  gDrawingContext.fillStyle = "#000";
  gDrawingContext.fill();
    }
}

if (typeof resumeGame != "function") {
    saveGameState = function() {
  return false;
    }
    resumeGame = function() {
  return false;
    }
}

function newGame() {
    gPieces = [new Cell(kBoardHeight - 3, 0),
               new Cell(kBoardHeight - 2, 0),
               new Cell(kBoardHeight - 1, 0),
               new Cell(kBoardHeight - 3, 1),
               new Cell(kBoardHeight - 2, 1),
               new Cell(kBoardHeight - 1, 1),
               new Cell(kBoardHeight - 3, 2),
               new Cell(kBoardHeight - 2, 2),
               new Cell(kBoardHeight - 1, 2)];
    gNumPieces = gPieces.length;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gMoveCount = 0;
    gGameInProgress = true;
    drawBoard();
}

function endGame() {
    gSelectedPieceIndex = -1;
    gGameInProgress = false;
}

function initGame(canvasElement, moveCountElement) {
   // if the canvas element is not present, create one and set its id and append it to the doc body 
    if (!canvasElement) {
        canvasElement = document.createElement("canvas");
        canvasElement.id = "halma_canvas";
        document.body.appendChild(canvasElement);
    }


   // if the moveCount element is not present, create one append it to the doc body 
    if (!moveCountElement) {
        moveCountElement = document.createElement("p");
        document.body.appendChild(moveCountElement);
    }

    // set the gCanvas to the current canvas and set its dimensions 
    gCanvasElement = canvasElement;
    gCanvasElement.width = kPixelWidth;
    gCanvasElement.height = kPixelHeight;
    gCanvasElement.addEventListener("click", halmaOnClick, false); // call the event listener to a click event check above comments for more details on it 
    gMoveCountElem = moveCountElement;
    gDrawingContext = gCanvasElement.getContext("2d"); // the drawing area for the canvas
    if (!resumeGame()) {
        newGame();
    }
}