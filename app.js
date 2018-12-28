/*
 * Create a list that holds all of your cards
 */


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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Start Of My Code

//A function which simply shows the symbol of the card
function showCard(event){
    console.log(event);
    if (event.target.className === 'card'){
        event.target.className ='card show';
        matchCheck(event);
    }
}

function matchCheck(ev){
    if (isOpen.length === 0) {
        addToOpenList(ev);
        //console.log(isOpen);
    }
    else{
        if (isOpen[0].children[0].className === ev.target.children[0].className){
            //console.log('tha ginei xamos an auto to prama douleuei');
            openPosition(document.getElementById(isOpen[0].id), document.getElementById(ev.target.id));
        }
        else{
            window.setTimeout(function(){hideCards(document.getElementById(isOpen[0].id), document.getElementById(ev.target.id))}, 200);
        }
    }
}

function addToOpenList(ev){
    isOpen.push(ev.target);
}

function openPosition(card1,card2){
    card1.className = "card open show";
    card2.className = "card open show";
    isOpen.pop();
}

function hideCards(card1,card2){
    console.log(card1, card2);
    card1.className = "card";
    card2.className = "card";
    isOpen.pop();

}

function restart(){
    //Get the "preshuffled" deck to delete it
    oldDeck = document.querySelector('.deck');
    //console.log(oldDeck);

    //Delete old deck to create a new one
    oldDeck.parentElement.removeChild(oldDeck);
    //oldDeck.remove;
}


/*******__Main__********/

//Nodelist with all the cards
cardsNodeList = document.querySelectorAll('.card');
//console.log(cardsNodeList);

//Nodelist to Array (since the shuffle function gets array)
let cardsArray = Array.prototype.slice.call(cardsNodeList);

//Call the restart function to delete the old deck
restart();

//Call of the shusle function  
shuffledDeck = shuffle(cardsArray);
//console.log('shuffle',shuffledDeck);

//Assign to all cards the class 
for (card of shuffledDeck){
    card.className = 'card'
    // console.log(card);
}

//Get an instance of the container div in order to create the new grid there
divContain = document.querySelector('.container');
// console.log(divContain);

//Create a new unordered list, assign a class to it and append it as child to the above div
let newDeck = document.createElement('ul');
newDeck.className = 'deck';
divContain.appendChild(newDeck);
// console.log(newDeck);


//Creat Document Fragment
const myFrag = document.createDocumentFragment();

//Append each card of the shuffledDeck to the fragment
counter = 0
for (card of shuffledDeck){
    card.id = counter;//mallon tha prepei na parei mpoulo
    myFrag.appendChild(card);
    counter++
}

//Append the fragment(contains all the cards) to the ul //minimizes the repaint and reflow 
newDeck.appendChild(myFrag);
console.log(newDeck);


// //visualizes the card for experimental issues 
// for (card of shuffledDeck){
//     card.className = 'card match';
// }

// //Create a new unordered list, assign a class to it and append it as child to the above div
// let newDeck = document.createElement('ul');
// newDeck.className = 'deck';

//eventListener put on the deck instead of each card
newDeck.addEventListener('click',showCard);

//Global variable list which checks if a card is already open
isOpen = [];