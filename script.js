// Arrays for cards 
var suits = ["S", "H", "C", "D"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "J", "Q", "K", "A"];
// Global variables
var allPlCards = [];
var allPcCards = [];
var randomCard1;
var randomCard2;
var playerScore = 0;
var pcScore = 0;
var img3;
var plCounter = 0;
var pcCounter = 0;
var sevenCounter = 0;
var i = 0;
var isDoubt = 0;
var pass;
var plAce = 0;
var pcAce = 0;

function randomGen() {
    //getting random value from cards arrays
    randomCard1 = numbers[Math.floor(Math.random() * numbers.length)];
    randomCard2 = suits[Math.floor(Math.random() * suits.length)];
    if (randomCard1 == "11") {
        while (randomCard2 == "C" || randomCard2 == "D") {
            randomCard2 = suits[Math.floor(Math.random() * suits.length)];
            randomCard1 = numbers[Math.floor(Math.random() * numbers.length)];
        }
    }
}

function playerScoreCal() {
    //assigning values to the cards and adding into score for player
    if (randomCard1 == "11") {
        playerScore += 0;
    }
    if (randomCard1 == "7") {
        sevenCounter++;
    }
    if (randomCard1 == "J" || randomCard1 == "Q" || randomCard1 == "K") {
        playerScore += 10;
    }
    else if (randomCard1 == "A") {
        plAce++;
        playerScore += 11;
    }
    else {
        playerScore += parseInt(randomCard1);
    }
    if (playerScore > 21 && plAce > 0) {
        playerScore -= 10;
        plAce = 0;
    }
    //showing score on screen for player
    document.getElementById("playerScore").style.display = "inline";
    document.getElementById("playerScore").innerHTML = playerScore;
}

function pcScoreCal() {
    //assigning values to the cards and adding into score for dealer
    if (randomCard1 == "11") {
        pcScore += 0;
    }
    if (randomCard1 == "J" || randomCard1 == "Q" || randomCard1 == "K") {
        pcScore += 10;
    }
    else if (randomCard1 == "A") {
        pcAce++;
        pcScore += 11;
    }
    else {
        pcScore += parseInt(randomCard1);
    }
    if (pcScore > 21 && pcAce > 0) {
        pcScore -= 10;
        pcAce = 0;
    }
    //showing score on screen for dealer
    document.getElementById("pcScore").style.display = "inline";
    document.getElementById("pcScore").innerHTML = pcScore;
}

function addPlCard() {
    randomGen(); //generating random card
    if (isDoubt == 1) {
        randomCard1 = "7";
    }
    //show win if player gets joker
    if ((randomCard1 + randomCard2) == "11S" || (randomCard1 + randomCard2) == "11H") {
        youWin();
    }
    //showing player card
    allPlCards.push(randomCard1 + randomCard2);
    var img = document.createElement("img");
    img.setAttribute("src", "cards/" + randomCard1 + randomCard2 + ".png");
    img.setAttribute("class", "cardsImg");
    document.getElementById("plCards").appendChild(img);
    plCounter++;
}

function addPcCard() {
    randomGen(); //generating random card
    //show win if dealer gets joker
    if ((randomCard1 + randomCard2) == "11S" || (randomCard1 + randomCard2) == "11H") {
        youLose();
    }
    //showing dealer card
    allPcCards.push(randomCard1 + randomCard2);
    var img2 = document.createElement("img");
    img2.setAttribute("src", "cards/" + randomCard1 + randomCard2 + ".png");
    img2.setAttribute("class", "cardsImg");
    document.getElementById("pcCards").appendChild(img2);
    pcCounter++;
}

function startGame() {
    document.getElementById("logo").className = "logoShrink"; //shrinking the logo
    document.getElementById("instructions").style.display = "none"; //hiding instructions
    //showing dealer and player on screen
    document.getElementsByTagName('h2')[0].style.display = 'block';
    document.getElementsByTagName('h2')[1].style.display = 'block';

    document.getElementById("cheatBtn").style.display = "none";
    document.getElementById("playBtn").style.display = "none";
    //showing buttons
    document.getElementById("hitBtn").style.display = "inline";
    document.getElementById("standBtn").style.display = "inline";
    document.getElementById("resetBtn").style.display = "inline";
    //adding cards
    addPlCard();
    playerScoreCal();
    addPlCard();
    playerScoreCal();
    addPcCard();
    pcScoreCal();

    img3 = document.createElement("img");
    img3.setAttribute("src", "cards/cover.png");
    img3.setAttribute("class", "cardsImg");
    document.getElementById("pcCards").appendChild(img3);
}

// reset() function to restart the game
function reset() {
    location.reload();
}
// hit() function to add cards for player
function hit() {
    addPlCard();
    playerScoreCal();
    //Joker functions
    for (i = 0; i < 5; i++) {
        if (allPlCards[i] == "11S" || allPlCards[i] == "11H") {
            youWin();
        }
        else if (allPcCards[i] == "11S" || allPcCards[i] == "11H") {
            youLose();
        }
    }
    //if player draws 5 cards without reaching 21 show win otherwise show lose
    if (plCounter == 5) {
        if (playerScore < 21) {
            youWin();
        }
        else {
            youLose();
        }
    }
    //if score goes over 21 for player show lose 
    if (playerScore > 21) {
        youLose();
    }
}

function stand() {
    document.getElementById("pcCards").removeChild(img3);
    for (i = 0; i < 5; i++) {
        if (allPlCards[i] == "11S" || allPlCards[i] == "11H") {
            youWin();
        }
        else if (allPcCards[i] == "11S" || allPcCards[i] == "11H") {
            youLose();
        }
    }
    //dealer has to draw cards until score reaches 17
    while (pcScore <= 17) {
        addPcCard();
        pcScoreCal();
    }
    result(); //check result 
}

function resetScore() {
    playerScore = 0;
    pcScore = 0;
}

function hideBtns() {
    document.getElementById("hitBtn").style.display = "none";
    document.getElementById("standBtn").style.display = "none";
}

function youWin() {
    document.getElementById("result").innerHTML = "You Win!🥳";
    hideBtns();
}

function youLose() {
    document.getElementById("result").innerHTML = "You Lose/Bust!😞";
    hideBtns();
}

function result() {
    for (i = 0; i < 5; i++) {
        if (allPlCards[i] == "11S" || allPlCards[i] == "11H") {
            youWin();
        }
        else if (allPcCards[i] == "11S" || allPcCards[i] == "11H") {
            youLose();
        }
    }
    if (playerScore > 21) {
        youLose(); //show lose if score is more than 21
    }
    else if (pcScore > 21) {
        youWin(); //show win if score is less than 21
    }
    else if (playerScore > pcScore) {
        youWin(); //show win if player's score is more than dealer's score
    }
    else if (playerScore == pcScore) {
        document.getElementById("result").innerHTML = "It's a tie!"; //if scores are same show tie
        hideBtns();
    }
    else {
        if (playerScore <= 21 && plCounter == 5) {
            youWin();
        }
        else if (pcScore <= 21 && pcCounter == 5) {
            youLose();
        }
        youLose(); //show lose
    }
}