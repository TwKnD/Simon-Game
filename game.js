var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var level = 0
var started = false;

$(document).keypress(function() {
  if (started === false) {
    nextSequence();
    started = true;
  };
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1)
});

function nextSequence() {
  // reset userClickedPattern before level start.
  userClickedPattern = [];
  // iterate level
  level++;
  // change title to level
  $("#level-title").text("level " + level);
  // random number generator
  var randomNumber = Math.floor(Math.random() * 4);
  // use randomNumber to pick button colour
  var randomChosenColour = buttonColours[randomNumber];
  // push the chosen colour to gamePattern
  gamePattern.push(randomChosenColour);
  // flash chosen colour for player & play sound
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

function checkAnswer(currentLevel) {

  // check every clicked button is the same as gamePattern in each position.
  // if userClickedPattern[position in array] === gamePattern[position in array]
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // compare lengths of each array
    // if both are = length call next level, otherwise do NOTHING.
    if (userClickedPattern.length === gamePattern.length) {
      // nextSequence call needs to be rapped in function,
      // otherwise the delay doesn't run.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  // if clicked button didn't match gamePattern, show wrong answer, reset game.
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart")

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
};

function startOver() {
  level = [0];
  gamePattern = [];
  started = false;
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
