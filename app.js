/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

init();

//Events: Notification that are sent to notify the code that something happened to the webpage
//Event Listener: A function that performs an action based on a certain event. It sits and waits for a specific event to happen.

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    //This is an anonomous function that can only be used here
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //3. Update the round score IF the Rolled number was not a 1
    if (dice !== 1){
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
       
    }
    }
    

});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
              //1. Add the current score to the user global score
    scores[activePlayer] += roundScore;

    //2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    //Undefined, 0, null or '' are coerced to false
    //Anything else is coerced to 2
    var winningScore;
    if(input){
         winningScore = input;
    } else {
        winningScore = 100;
    }
   

    //3. Check if player won the game
    if(scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
         nextPlayer();
    }
   
    }
  
});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer(){
    //next Player
        //use a ternary operator
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
         /*
        Same as this:
        if(activePlayer === 0){
            activePlayer = 1;
        }else {
            activePlayer = 0;
        }
        */
        
        //ensure it's set to zero in the interface as well
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';

}


function init(){
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
//console.log(dice);

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';

//Use this to read content in html and store into a variable
var x = document.querySelector('#score-1').textContent;
console.log(x);

//Use querySelector to change CSS
document.querySelector('.dice').style.display = 'none';

//get document by ID when applicable
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}

