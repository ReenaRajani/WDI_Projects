
/*
Things to work Further 
1. Build an AI version of this 
2. When the player selects best of 3, the game should continue 3 times and then decide who wins 
3. when the player selects the select skin, the images must be displayed and on their click event, the image must be selected to be played 
4. the reset game should also include option to reset the player to default 
5. Display the battle scores on the Message Board . 
6. Effects - on load, an alien ship must enter the screen and then the whole page must be loaded // try creating a different css for that 
7. Add the sound track
*/

var StarWars = ['1','2','3','4','5','6','7','8','9'];
var movestr;
var currentPlayer ="Yoda";
var position='';
var nofMoves = 0;
var YodaWins =false;
var DarthWins =false;
noofGames =0;



$(document).ready(function() {


$('.playgrid').on('click',function() {

  console.log('inside click event');
 
  position = $(this).attr('id').charAt(1);

  if($(this).attr('data-clicked') !== 'false'){

      alert('Dont Cheat!! cell Already Clicked ');

  } else {

    if(currentPlayer === "Yoda") {

      movestr = 'Yoda';
      $(this).addClass('yoda');

    }else {

      movestr ='Darth';
      $(this).addClass('darth');

    } 
    console.log(movestr);
    StarWars[position-1] = movestr;
    nofMoves+=1;
    console.log(StarWars.join(' '));
    console.log(nofMoves);
    $(this).attr('data-clicked','true');

      currentPlayer === "Yoda" ? currentPlayer = "Darth" : currentPlayer = "Yoda";

      var winner = checkWinner();


  }



});




  var checkWinner = function() {

    console.log('inside checkWinner');
     YodaWins =false;
     DarthWins =false; 
    
    if( (StarWars[0]===StarWars[1] && StarWars[1]===StarWars[2] && StarWars[0] === "Yoda" ) ||
        (StarWars[3]===StarWars[4] && StarWars[4]===StarWars[5] && StarWars[3] === "Yoda" ) ||
        (StarWars[6]===StarWars[7] && StarWars[7]===StarWars[8] && StarWars[6] === "Yoda" ) ||
        (StarWars[0]===StarWars[3] && StarWars[3]===StarWars[6] && StarWars[0] === "Yoda" ) ||
        (StarWars[1]===StarWars[4] && StarWars[4]===StarWars[7] && StarWars[1] === "Yoda" ) ||
        (StarWars[2]===StarWars[5] && StarWars[5]===StarWars[8] && StarWars[2] === "Yoda" ) ||
        (StarWars[0]===StarWars[4] && StarWars[4]===StarWars[8] && StarWars[0] === "Yoda" ) ||
        (StarWars[2]===StarWars[4] && StarWars[4]===StarWars[6] && StarWars[2] === "Yoda" ) ) {

        YodaWins = true;
        alert('Yoda Wins');
        $('.Battle_ground').addClass('yodalaugh');
        $(".playgrid").fadeOut();
        resetGame();
        return YodaWins;

    } else if (
      (StarWars[0]===StarWars[1] && StarWars[1]===StarWars[2] && StarWars[0] === "Darth" ) ||
        (StarWars[3]===StarWars[4] && StarWars[4]===StarWars[5] && StarWars[3] === "Darth" ) ||
        (StarWars[6]===StarWars[7] && StarWars[7]===StarWars[8] && StarWars[6] === "Darth" ) ||
        (StarWars[0]===StarWars[3] && StarWars[3]===StarWars[6] && StarWars[0] === "Darth" ) ||
        (StarWars[1]===StarWars[4] && StarWars[4]===StarWars[7] && StarWars[1] === "Darth" ) ||
        (StarWars[2]===StarWars[5] && StarWars[5]===StarWars[8] && StarWars[2] === "Darth" ) ||
        (StarWars[0]===StarWars[4] && StarWars[4]===StarWars[8] && StarWars[0] === "Darth" ) ||
        (StarWars[2]===StarWars[4] && StarWars[4]===StarWars[6] && StarWars[2] === "Darth" )){

            DarthWins = true;
            alert('Darth Wins');
            $('.Battle_ground').addClass('darthlaugh');
            $(".playgrid").fadeOut();
              resetGame();
            return DarthWins;

         } else if( nofMoves === 9) {

        alert(' Its a Cats Game ');
          resetGame();
        
          return -1;

    }



  }


var resetGame = function() {

  StarWars = ['1','2','3','4','5','6','7','8','9'];
  nofMoves = 0;
  currentPlayer ="Yoda";
  YodaWins =false;
  DarthWins =false;
  
  $('.playgrid').attr('data-clicked' ,'false');
  $('.playgrid').removeClass('yoda darth');
  setTimeout( function () {
    $('.Battle_ground').removeClass('yodalaugh');
    $(".playgrid").fadeIn();
  }, 5000);
  setTimeout( function () {
    $('.Battle_ground').removeClass('darthlaugh');
    $(".playgrid").fadeIn();
  }, 5000);


}

});
