

window.onload = function startGame() {

    var wordArray = ["Pooh", "Piglet", "Eeyore", "Tigger", "Aladdin", "Genie", "Mickey", "Minnie", "Marie", "Omalley", "Berlioz", 
    "Toulouse", "Duchess", "Lilo", "Stitch", "Cinderella", "Jasmine"];

    var gamesPlayed = 0;

    var wins = 0, losses = 0;

    var gameOver = false;

    hangMan();

    function hangMan() {

        document.getElementById("charImage").src = "assets/images/guesswho.png";

    //Use if statement so that game can be played multiple times until all words have been used.
        if (wordArray.length > 0) {

            //initialize array of letters already guessed by user
            var previousGuess = [];

            //initialize counter for numer of guesses
            var guessCount = 10;

            //display guess count
            document.getElementById("gsCount").innerHTML = guessCount

            //Select game word
            var gameWordIndex = Math.floor(Math.random() * wordArray.length);
            var gameWord = wordArray[gameWordIndex];

            gameWord = gameWord.toLowerCase();

            var imageName = gameWord;

            var gameWordArray = gameWord.split("");

            //Remove word from array so that it cannot be chosen again for additional games played   
            wordArray.splice(gameWordIndex, 1);

            //Display game word on screen with letters hidden
            for (i=0; i<gameWord.length; i++) {

                var wordBlock = document.getElementById("displayWord");
                
                var hdn = document.createElement("span");

                wordBlock.appendChild(hdn);

                var att = document.createAttribute("id");

                att.value = "ltr" + i.toString();

                hdn.setAttributeNode(att);

                hdn.innerHTML = "__"
                
            }

            //initialize letters guessed string
            var ltrsGuessed = "";
    
            //initialize correctGuess count
            var correctGuess = 0;
                
            // This function is run whenever the user presses a key.
            document.onkeyup = function(event) {

                // Determines which key was pressed.
                //var userGuess = String.fromCharCode(event.which).toLowerCase();
                var userGuess = event.key;

                //assigns the key code to a variable
                var userKeyCode = Number(event.keyCode);

                //Make sure key pressed is a letter of the alphabet
                if (userKeyCode >= 65 && userKeyCode <= 97) {

                    //Make sure key pressed is not one of the previous guesses
                    if (previousGuess.indexOf(userGuess) >= 0) {
                        alert("This letter has already been guessed.  Please choose another letter");
                    } else {

                        //add letter to previousGuess array    
                        previousGuess.push(userGuess); 

                        ltrsGuessed = ltrsGuessed + " " + userGuess;

                        //display letter in letters guessed
                        document.getElementById("ltrG").innerHTML=ltrsGuessed;

                        
                        if (gameWord.indexOf(userGuess) == -1) {
                            alert("Letter guessed is not in the word.");

                            //decrement guessCount
                            guessCount--;

                            //display guessCount
                            document.getElementById("gsCount").innerHTML = guessCount;


                        } else {
                            
                            //account for multiples of the same letter in the game word
                            for (j=0; j<gameWord.length; j++) {
            
                                if (userGuess == gameWordArray[j]) {

                                    var ltrBlock = document.getElementById("ltr" + j.toString());
            
                                    if ( j == 0) {            
                                        ltrBlock.innerHTML = gameWordArray[j].toUpperCase();
                                    } else {
                                        ltrBlock.innerHTML = gameWordArray[j];
                                    }
                                    correctGuess++;
                                }
                            }                        
                        }
                    }   
                            
                } else {
                    alert("Key pressed is not a letter.  Please try again.");
                }

                //check to see if all letters in word have been guessed
                if (correctGuess == gameWord.length) {

                    document.getElementById("charImage").src = "assets/images/" + imageName +".png";
                    
                    //increment wins counter
                    wins = wins + 1;

                    //display new wins count
                    document.getElementById("gmsWon").innerHTML = wins;

                    //increment game counter by 1
                    gamesPlayed++;

                    //display new count of games played
                    document.getElementById("gmsPlayed").innerHTML = gamesPlayed;

                    gameOver = true;

                    //Restart game

                    if(gameOver==true) {

                        //setTimeout(function() { alert("Congratulations on guessing the word correctly!  Why not play again"); }, 1000);

                        setTimeout(function() {
                            var parent = document.getElementById("displayWord");
                            for (i = 0; i < gameWord.length; i++) {
                                var child = document.getElementById("ltr" + i.toString());
                                parent.removeChild(child);
                            }
                            document.getElementById("ltrG").innerHTML = "";
                        }, 5000);

                        restartGame = true;
                    }

                    if(restartGame == true) {
                        setTimeout(hangMan, 5000);
                    }    
                }

                //check to see if the guess count is 0
                if (guessCount == 0) {
                    
                    //increment losses counter
                    losses = losses + 1          

                    //display new losses count
                    document.getElementById("gmsLost").innerHTML = losses;

                    //increment game counter by 1
                    gamesPlayed++;

                    //display new count of games played
                    document.getElementById("gmsPlayed").innerHTML = gamesPlayed;

                    gameOver = true;

                    //Restart game

                    if(gameOver==true) {

                        for (k=0; k<gameWord.length; k++) {
            
                            var ltrBlock = document.getElementById("ltr" + k.toString());
    
                            if ( k == 0) {            
                                ltrBlock.innerHTML = gameWordArray[k].toUpperCase();
                            } else {
                                ltrBlock.innerHTML = gameWordArray[k];
                            }
                        }

                        // setTimeout(function() { alert("Game Over!  Why not try again?"); }, 1000);
                        
                        setTimeout(function() {
                            var parent = document.getElementById("displayWord");
                            for (i = 0; i < gameWord.length; i++) {
                                var child = document.getElementById("ltr" + i.toString());
                                parent.removeChild(child);
                            }
                            document.getElementById("ltrG").innerHTML = "";
                        }, 3000);

                        restartGame = true;
                        console.log(restartGame);
                    }

                    if(restartGame == true) {
                        setTimeout(hangMan, 3000);
                    }                        
                }     
            }             
        }
    }
}