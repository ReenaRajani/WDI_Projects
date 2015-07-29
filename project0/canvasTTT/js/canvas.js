$
/*

 ______ ____ ______   ______ ___    ______   ______ ____   ______
 /_  __//  _// ____/  /_  __//   |  / ____/  /_  __// __ \ / ____/
  / /   / / / /        / /  / /| | / /        / /  / / / // __/   
 / /  _/ / / /___     / /  / ___ |/ /___     / /  / /_/ // /___   
/_/  /___/ \____/    /_/  /_/  |_|\____/    /_/   \____//_____/  

context.arc(x,y,r,sAngle,eAngle,counterclockwise);
x-coordinate of the center of the circle
y-coordinate of the center of the circle
radius of the circle
The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
The ending angle, in radians
Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.

wincombinations  = [['00','01','02'],['10','11','12'],['20','21','22'],
                  ['00','10','20'],['01','11','21'],['02','12','22']
                      ['00','11','22'],['02','11','20']];



On document.ready 
1. The canvas area is defined
2.  The drawing area inside the canvas is defined  via gCanvasElem.getContext("2d")
3.  The grids for the game are drawn - drawGameGrid()
4.  The game begins via the click event 
5. on click , based on the mouse click location, the cell contents are filled and then the winner is checked 
6. On a win or a draw the game resets 

*/
var gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var gCanvasElem; // canvas element 
var gDrawContext; /// the drawing object of the canvas
var canvas_width = "400";
var canvas_height ="300";
var cellwidth;
var cellheight;
var gridThickness = 3; // thickness of the grid lines
var currentPlayer;
var i=0;
var j=0;

$(document).ready(function() {

  // function where the canvas element and its drawing area are defined.

  var initCanvas = function(canvasElement) {

    if (!canvasElement) { // if not already present then 
          canvasElement = document.createElement("canvas");
          canvasElement.id = "mainCanvas";
          document.body.appendChild(canvasElement);
      }
      // setting the properties of the canvas element
      gCanvasElem = canvasElement ;
     
      gCanvasElem.width = canvas_width;
      gCanvasElem.height = canvas_height;
         

     gDrawContext = gCanvasElem.getContext("2d"); // the drawing area for the canvas
     
     drawGameGrid(); // function call to draw the grids of tic tac toe

    //Let the game begin !! 
     gCanvasElem.addEventListener("click",onCanvasClick);
     
     currentPlayer = 1; // initializing the current player to 1

  } 

// function that draws the grid lines of the game 
var drawGameGrid =  function() {

  gDrawContext.save();
  gDrawContext.lineWidth = gridThickness; // setting the thickness of the line 

  // setting the width and height for the grid in tic tac toe equally partitioning for the width and height   
  cellheight = Math.floor(gCanvasElem.offsetHeight/3) 
  cellwidth = Math.floor(gCanvasElem.offsetWidth/3);

  //horizontal line1
  gDrawContext.beginPath();
  gDrawContext.moveTo(cellwidth, 0 ); //defines starting point (x,y)of line 1
  gDrawContext.lineTo(cellwidth, canvas_height); //ending point (x,y)of line 1
  gDrawContext.stroke();

  //horizontal line2
  gDrawContext.beginPath();
  gDrawContext.moveTo(cellwidth * 2, 0);
  gDrawContext.lineTo(cellwidth * 2, canvas_height);
  gDrawContext.stroke();

  //vertical line 1
  gDrawContext.beginPath();
  gDrawContext.moveTo(0, cellheight);
  gDrawContext.lineTo(canvas_width, cellheight);
  gDrawContext.stroke();

  //vertical line 2
  gDrawContext.beginPath();
  gDrawContext.moveTo(0, cellheight*2);
  gDrawContext.lineTo(canvas_width, cellheight*2);
  gDrawContext.stroke(); 
 
  }

// click event called 
var onCanvasClick = function(e) {
   
    var mCoordinate = getMouseLocation(e); // gets mouseclick location
    
    var cell = getCellFromLocation(mCoordinate); // get the cell at the mouse location
   
    processCellClick(cell); 

}

// function that gets the mouse click position 
var getMouseLocation = function(e) {

  var mouseX = e.pageX - gCanvasElem.offsetLeft;
  var mouseY = e.pageY - gCanvasElem.offsetTop;

  // console.log('e.pageX :: ' + e.pageX +  'e.pageY :: ' + e.pageY );
  // console.log('mouseX :: ' + mouseX +  'mouseY :: ' + mouseY );
  
  return { x: mouseX, y: mouseY };
}



 /*
 Gets the cell corresponding to a mouse location

 if the Xcoordinate is 2 times greater than cellWidth , then its the 3rd cell 
 if the X coordinate is 1 time > than cell width then its the 2nd cell 
  */

function getCellFromLocation(mCoordinate) {
   
    var cellCoordinate = { x: 0, y: 0 }; // x and y coordinates default is 1st

    if (mCoordinate.x > cellwidth * 2) {
        
        cellCoordinate.x = 2;  // 
     
     } else if (mCoordinate.x > cellwidth) {
        
        cellCoordinate.x = 1;
    }

 // similar case as above for the Y coordinate 
    if (mCoordinate.y > cellheight * 2) {
      
      cellCoordinate.y = 2;
    
    }else if (mCoordinate.y > cellheight) {
      
      cellCoordinate.y = 1;
    }
    
    //console.log('The cell Coordinate is :: ' + cellCoordinate.x , cellCoordinate.x )
    return cellCoordinate;
}


/*
 function that checks if the cell has already been clicked or not 
 and also determines the current player as 1 or 2 
 */
var processCellClick = function(cell){

  // if the cell is already clicked 
   if (gameStatus[cell.x][cell.y] != 0){
      alert('Dont Cheat!! cell Already Clicked ');
      return;
   } 
    
    gameStatus[cell.x][cell.y] = currentPlayer;
 
    refreshGame(); 
 
    if (currentPlayer == 1) {
      currentPlayer = 2;
    } else {
      currentPlayer = 1;
    } 
 
    checkWinner();
}


// function that empties the canvas element and redraws the gird and the player moves if any 
var refreshGame = function() {

    gDrawContext.clearRect(0, 0, canvas_width, canvas_height); // emptying the canvas elements
    drawGameGrid(); // redrawing the grid
   drawPlayerMoves(); // redrawing the moves 

}



/*based on the gamestatus , the moves of player1 and player 2 are drawn on the grid 
player 1 draws X and player 2 draws O */

var drawPlayerMoves = function(){

    for(i = 0;i <=2 ; i++){

        for( j=0; j<=2;j++){

            var cell = gameStatus[i][j];
            if (cell == 1) {
                
                drawCross(i, j);
 
            } else if (cell == 2) {
                
                drawCircle(i, j);
               }
        
        }// end of J loop
   
    }// end of i lop

}



/*

 __      __.___ _______   
/  \    /  \   |\      \  
\   \/\/   /   |/   |   \ 
 \        /|   /    |    \
  \__/\  / |___\____|__  /
       \/              \/ 

central Point !! 
if all the cells in the row or a col or if the diagonal cells are common then there is a win 
gameStatus stores the data column wise i.e gamestatus[0]= col1 , gamestatus[1]= col2 , gamestatus[3]= col3
*/

var checkWinner = function() {

// player 1 values 
  var p1Row=0;
  var p1Col=0;
  var p1Diag=0;

// player 2 values 
  var p2Row=0;
  var p2Col=0;
  var p2Diag=0;

  var allClicked  = true; // default to check for a draw status
   
   for(i=0;i<=2;i++){
      // for every completion of row , reset the values; important here !! 
        p1Row=0; 
        p1Col=0;
        p2Row=0;
        p2Col=0;  

        for(j=0;j<=2;j++) {

          // checking if the cols have values as 1 or 2 
     
          if(gameStatus[j][i]===1) {
              
              p1Col++ ;
       
           } else if(gameStatus[j][i]===2){
              
              p2Col++;
        
              } else {
                  
                  allClicked= false;
                
                }
          // checking for all the row entries 
          
          if(gameStatus[i][j]===1) {
             
              p1Row++ ;
          } else if(gameStatus[i][j]===2){
        
              p2Row++
            
            }
    
      } // end of For j

    // check for diagonals
    var p1diag1 = gameStatus[0][0] ===1  &&  gameStatus[1][1]===1  && gameStatus[2][2] ===1 ;
    var p1diag2  = gameStatus[0][2] ===1 && gameStatus[1][1]===1 && gameStatus[2][0]===1;


    var p2diag1 = gameStatus[0][0] ===2  &&  gameStatus[1][1]===2  && gameStatus[2][2] ===2 ;
    var p2diag2  = gameStatus[0][2] ===2 && gameStatus[1][1]===2 && gameStatus[2][0]===2;


    if(p1Row ===3 || p1Col ===3 || p1diag1 || p1diag2) {

          alert("Player 1 Wins");
          resetGame();
          return;

    } else if(p2Row ===3 || p2Col ===3 || p2diag1 || p2diag2) {

          alert("Player 2 Wins");
          resetGame();
          return;
        }

   } // end of For i  

    if (allClicked) {

      alert("Bimmers !! its a draw ");
      resetGame(); 
      return;
    }


}

// resets the entire game 
var resetGame = function() {

 gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
 currentPlayer = 1;
 refreshGame();

}


/*

self explanatory I think !                   
                     
XXXXXXX       XXXXXXX
X:::::X       X:::::X
X:::::X       X:::::X
X::::::X     X::::::X
XXX:::::X   X:::::XXX
   X:::::X X:::::X   
    X:::::X:::::X    
     X:::::::::X     
     X:::::::::X     
    X:::::X:::::X    
   X:::::X X:::::X   
XXX:::::X   X:::::XXX
X::::::X     X::::::X
X:::::X       X:::::X
X:::::X       X:::::X
XXXXXXX       XXXXXXX
                     
                     
                     
*/
function drawCross(cellX, cellY) {
    
    // From top right to bottom left of the cell
    gDrawContext.save();
    gDrawContext.beginPath();
    gDrawContext.moveTo(cellX * cellwidth, cellY * cellheight);
    gDrawContext.lineTo(cellX * cellwidth + cellwidth, cellY * cellheight + cellheight);
    gDrawContext.stroke();
    gDrawContext.restore(); 
  
 
    // From top left to bottom right of the cell
    gDrawContext.beginPath();
    gDrawContext.moveTo(cellX * cellwidth + cellwidth, cellY * cellheight);
    gDrawContext.lineTo(cellX * cellwidth, cellY * cellheight + cellheight);
    gDrawContext.stroke();
    gDrawContext.restore();
  
}



/* An arc, centered in the middle of the cell,
       Radius set to half of the cell - 30 (makes the circle smaller , 30 is a random no here 
       going from 0 to 360 degrees (a full circle).

                
     OOOOOOOOO     
   OO:::::::::OO   
 OO:::::::::::::OO 
O:::::::OOO:::::::O
O::::::O   O::::::O
O:::::O     O:::::O
O:::::O     O:::::O
O:::::O     O:::::O
O:::::O     O:::::O
O:::::O     O:::::O
O:::::O     O:::::O
O::::::O   O::::::O
O:::::::OOO:::::::O
 OO:::::::::::::OO 
   OO:::::::::OO   
     OOOOOOOOO     
                   
      
*/

function drawCircle(cellX, cellY) {
  
      var centerX = cellwidth/2;
      var centerY = cellheight/2;
      var radius = (cellwidth/ 2) - 30;
    gDrawContext.save();
    
    gDrawContext.shadowOffsetX = 2;
    gDrawContext.shadowOffsetY = 2;
    gDrawContext.shadowBlur=10;
    gDrawContext.shadowColor="#432E2E";
    
    gDrawContext.beginPath();
    gDrawContext.arc(cellX * cellwidth + centerX, cellY * cellheight + centerY, radius, 0, 360, false); // details in the comment section 
    gDrawContext.fillStyle="red";
    gDrawContext.fill();
    gDrawContext.stroke();
    gDrawContext.restore();
}

  initCanvas( document.getElementById("mainCanvas") );
 

});






 