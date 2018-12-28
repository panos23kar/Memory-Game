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
    // console.log(event);
    if (event.target.className === 'card'){
        event.target.className ='card show';
        movesIncrement();
        matchCheck(event);
    }
}

function movesIncrement(){
    movesCounter++;
    movesUpdate(movesCounter);
    starsCheck(movesCounter);
    
}

function movesUpdate(counter){
    numberOfMoves = document.querySelector('.moves');
    numberOfMoves.innerText = counter;
}

function starsCheck(counter){
    console.log('1os',counter);
    starsList = document.querySelector('.stars');
    //console.log(starsList.children.length);
    if (counter > 9 && starsList.children.length===3){
        starsList.removeChild(starsList.children[0]);
        console.log('mpainei');
    }
    else if(counter > 19 && starsList.children.length===2){
        starsList.removeChild(starsList.children[0]);
    }
    console.log('2os',counter)

               
    // Get the last <li> element //https://www.w3schools.com/jsref/met_node_clonenode.asp
    let star = starsList.children[0];

    // Copy the <li> element and its child nodes
    let cln = star.cloneNode(true);

    if (counter === 0 && starsList.children.length===2){
        // Append the cloned <li> element to <ul> 
        starsList.appendChild(cln);    

    }
    else if(counter === 0 && starsList.children.length===1){

        let cln1 = star.cloneNode(true);

        // Append the cloned <li> element to <ul> 
        starsList.appendChild(cln);
        starsList.appendChild(cln1);
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
    matchCounter +=2;
    console.log(matchCounter);
    card1.className = "card open show";
    card2.className = "card open show";
    isOpen.pop();
    if (matchCounter === 16){
        showMessage();
    }
}
function showMessage(){
    deck = document.querySelector('.deck');
    console.log(deck);
    deck.innerHTML = '';
    randomDiv = document.createElement('div');
    congrats = document.createElement('p');
    playAgain = document.createElement('p');
    randomDiv.appendChild(congrats);
    randomDiv.appendChild(playAgain);
    deck.appendChild(randomDiv);
    randomDiv.className = 'conMessage';
    playAgain.id = 'playAgain';
    congrats.innerText ='Congratulations!!';
    playAgain.innerText ='Click on the restart button to play again';
}

function hideMessage(){
    if (document.querySelector('.conMessage')!== null){
        delMes = document.querySelector('.conMessage');
        console.log(delMes);
        delMes.parentElement.removeChild(delMes);
    }
}

function hideCards(card1,card2){
    // console.log(card1, card2);
    card1.className = "card";
    card2.className = "card";
    isOpen.pop();
}

function restart(cardsArray){
    // console.log('mpainei???');
    if (isOpen.length !==0) isOpen.pop();
    deleteDeck();
    createNewDeck(cardsArray);
    movesCounter = 0;
    hideMessage();
    matchCounter = 0;
    movesUpdate(movesCounter);
    starsCheck(movesCounter);
}
function deleteDeck(){

    //Get the "preshuffled" deck to delete it
    oldDeck = document.querySelector('.deck');
    //console.log(oldDeck);

    //Delete old deck to create a new one
    oldDeck.parentElement.removeChild(oldDeck);
    oldDeck.remove;
}

function createNewDeck(cardsArray){

    //Call of the shusle function  
    shuffledDeck = shuffle(cardsArray);
    // console.log('shuffle',shuffledDeck);

    //Get an instance of the container div in order to create the new grid there
    divContain = document.querySelector('.container');
    //  console.log(divContain);

    //append new unordered list to div container
    divContain.appendChild(newDeck);
    //  console.log(newDeck);

    //Creat Document Fragment
    const myFrag = document.createDocumentFragment();

    //Append each card of the shuffledDeck to the fragment and assign class and id to them
    counter = 0
    for (card of shuffledDeck){
        card.className = 'card'
        card.id = counter;//mallon tha prepei na parei mpoulo
        myFrag.appendChild(card);
        counter++
    }

    //Append the fragment(contains all the cards) to the ul //minimizes the repaint and reflow 
    newDeck.appendChild(myFrag);
    // console.log(newDeck);
}


/*******__Main__********/

//Nodelist with all the cards
cardsNodeList = document.querySelectorAll('.card');
//console.log(cardsNodeList);

//Nodelist to Array (since the shuffle function gets array)
let cardsArray = Array.prototype.slice.call(cardsNodeList);

//Create a new unordered list, assign a class to it
//I created a global variable in order the Listener to be able to listen for this event
let newDeck = document.createElement('ul');
newDeck.className = 'deck';

//Global variable to count the moves of the player
let movesCounter = 0;

//Global counter to count how many matched cards there
let matchCounter = 0;

//Global variable list which checks if a card is already open
isOpen = [];

//Call the restart function to delete the old deck
restart(cardsArray);

//showMessage();

//eventListener put on the deck instead of each card
newDeck.addEventListener('click',showCard);



//restart button
restartButton = document.querySelector('.restart');

//restart event
restartButton.addEventListener('click', function(){restart(cardsArray)});