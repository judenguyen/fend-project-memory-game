/*
 * Create a list that holds all of your cards
 */
const icons =['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb','fa fa-bomb'];


const cardsContainer = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];

/*
* Initialize the game
*/
function init() {
   shuffle(icons);
   for(let i = 0; i < icons.length; i++) {
         const card = document.createElement('li');
         card.classList.add('card');
         card.innerHTML = `<i class="${icons[i]}"></i>`
         cardsContainer.appendChild(card);

         // Add Click Event to each card
         click(card);
   }
}


/*
* Click Event
*/

// First Click Indicator
let isFirstClick = true;

function click(card) {
   // Card Click Event
   card.addEventListener('click', function() {

      /*
      * At the first click, the condition will be true,
      * and our code below will get executed!
      *
      * We will call our `startTimer` function,
      * Then, set the `isFirstClick` to `false`, so in the next click,
      * it will be `if(false)` and nothing will happen, as we don't have an `else`!
      *
      * THAT'S EXACTLY what we want!
      */
      if(isFirstClick) {
          // Start our timer
          startTimer();
          // Change our First Click indicator's value
          isFirstClick = false;
      }

      const currentCard = this;
      const previousCard = openedCards[0];

      //We have an existing Opened card
      if (openedCards.length === 1) {

         card.classList.add('open','show', 'disable');
         openedCards.push(this);

         // Compare 2 opened cards
         compare(currentCard, previousCard);
      }
      else {
      // We don't have any opened cards
         currentCard.classList.add('open','show', 'disable');
         openedCards.push(this);
      }

   });
}

/*
* Compare the cards
*/
function compare(currentCard, previousCard) {
   //Matcher
   if (currentCard.innerHTML === previousCard.innerHTML) {

      // Matcher
      currentCard.classList.add('match');
      previousCard.classList.add('match');

      matchedCards.push(currentCard, previousCard);
      openedCards = [];

      // Check if the game is over
      isOver();

   }
   else {
      openedCards = [];
      // Wait 500ms then do this
      setTimeout(function() {
         currentCard.classList.remove('open','show', 'disable');
         previousCard.classList.remove('open','show', 'disable');
      }, 500);
   }
   // Add New Moves
   addMove();
}

/*
* Rating System
*/
const starsContainer = document.querySelector('.stars');
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
         <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
function rating() {
   switch(moves) {
      case 9:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
               <li><i class="fa fa-star"></i></li>`
      break;

      case 15:
         starsContainer.innerHTML = `<li><i class="fa fa-star"></i>`
      break;
   }

}

/*
* If the game is over
*/

function isOver() {
   if(matchedCards.length === icons.length) {

      //stop timer

      stopTimer();
      $('#win').modal('show');
      document.getElementsByClassName('container')[0].style.display='none';
      //document.getElementById('win').style.display='block';

      document.getElementsByClassName('enterNumMoves')[0].innerHTML = moves;
      document.getElementsByClassName('time')[0].innerHTML = totalSeconds + 's';

      const starsContainer2 = document.querySelector('.stars2');
      starsContainer2.innerHTML = `<li><i class="fa fa-star"></i></li>
               <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
      switch(moves) {
         case 9:
         starsContainer2.innerHTML = `<li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>`
         break;

         case 15:
            starsContainer2.innerHTML = `<li><i class="fa fa-star"></i>`
         break;
      }

   }
}

/*
* Add move
*/
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
   moves++;
   movesContainer.innerHTML = moves;

   // set raiting
   rating();
}


/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

/*
 * We call this function to start our function,
 * the totalSeconds will be increased
 * by 1 after 1000ms (1 second!)
 *
 * HINT: We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that our user is start playing now! ;)
 */
 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

/*
 * Our timer won't stop. To stop it, we should clearInterval!
 * We will call it when the game is over.
 * So, we will call it at the end of `isOver` function
 *
 * HINT: That's why I created the `liveTimer` variable,
 * to store the setInterval's function, so that we can stop it by its name!
 */
function stopTimer() {
    clearInterval(liveTimer);
}


/*
* Restart Button
*/
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function() {
   // Delete all cards
   cardsContainer.innerHTML ='';

   // Call 'init' to create new cardsContainer
   init();
   // Reset any related variables
   matchedCards = [];
   moves = 0;
   movesContainer.innerHTML = moves;
   starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`

   stopTimer();
   isFirstClick = true;
   totalSeconds = 0;
   timerContainer.innerHTML = totalSeconds + "s";
});

/*
 * Reset All Game Variables
 */
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    //clear board
   cardsContainer.innerHTML ='';

    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
             <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`

    /*
     * Reset the `timer`
     *
     * - Stop it first
     * - Then, reset the `isFirstClick` to `true` to be able to start the timer again!
     * - Don't forget about `totalSeconds`, it must be `0`
     * - One more thing, is to update the HTML timer's container
     */
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";


    init();

}

//Start a new game (reshuffle, reset time and number of moves)
newBoard = ()=>{

   //don't display winning message
   //document.getElementById('win').style.display='none';
   //display container with game
   document.getElementsByClassName('container')[0].style.display='flex';
   $('#win').modal('hide');
   reset()


}
/// start the game for the first setTimeout
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
