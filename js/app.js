
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	/*--- Variables ---*/
  	var computerNumber;
    var userNumber;
  	var guessList = [];
    var guessCount = 0;
    var difference;

  	/*--- Create randomNumber function ---*/
  	function randomNumber(){
  		computerNumber = Math.floor((Math.random() * 100) + 1);
      console.log("Computer generated random number is " +computerNumber);
      return computerNumber;
  	};

    randomNumber();

	/*--- Find userNumber on filling of userGuess field ---*/
	$("#guessButton").on("click",function(event){
		event.preventDefault();
    userNumber = +$("#userGuess").val();
    console.log("User guessed " + userNumber);
    /* Checking if user guess is between 1 and 100 */
    if (1 >= userNumber || userNumber >= 100) {
      console.log("Invalid number");
      $("#feedback").html("Oops! Your guess has to be a number between 1 and 100!");
    }
    else{
      /* Push userNumber to List of guesses */
      guessList.push(userNumber);
      /* Empty the ul guessList so that array can refill it*/
      $("#guessList").empty();
      /* Showing list of guesses array in doc */
      for (guessCount = 0; guessCount < guessList.length; guessCount++) {
        console.log("Array " + guessCount + " is " + guessList[guessCount]);
        $("#guessList").append("<li>" + guessList[guessCount] + "</li>");
      };
      /* Showing number of guesses */
      $("#count").html(guessCount);
      /* Calling the compare function */
      differenceCheck(computerNumber, userNumber);
      compare();
    };
	});

  var differenceCheck = function (a, b){ 
    difference = Math.abs(a - b);
    console.log("Difference is " + difference); 
  };

	/*--- Compare random number with user guess ---*/
  var compare = function(){
  	if (computerNumber === userNumber){
    console.log("Yay!");
		$("#feedback").html("Yay!! You guessed it!");
  	}
  	else if (difference <= 5) {
      $("#feedback").html("Your Guess is getting too hot!");
  	}
  	else if (difference <= 10) {
      $("#feedback").html("Your Guess is getting hot!");
  	}
    else if (difference <= 20) {
      $("#feedback").html("Your Guess is getting warm!");
    }
    else if (difference <= 30) {
      $("#feedback").html("Your Guess is getting cold!");
    }
    else if (difference <= 40) {
      $("#feedback").html("Your Guess is getting very cold!");
    }
  	else {
  		$("#feedback").html("Your Guess is freezing cold!");
  	};
  };

  /*--- Reset on clicking new game ---*/
  $(document).on("click", ".new", function(){
    console.log("new game started");
    computerNumber;
    userNumber;
    guessList = [];
    guessCount = 0;
    difference;
    randomNumber();
    $("#feedback").html("New game started. Make your Guess!");
    $("#guessList").empty();
    $("#count").html("0");
    $("#userGuess").val("");
  });

});