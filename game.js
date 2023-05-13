var userClickedPattern = [];
var pattern = [];
var color = ["red", "blue", "green", "yellow"];
var level = 0;
var hn = 0;
$(document).on("keydown", function () {
  if (hn == 0) {
    $("h1").text("Level " + level);
    nextSequence();
    hn = 1;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  pattern.push(color[randomNumber]);

  $("#" + color[randomNumber]).fadeIn(100);
  $("#" + color[randomNumber]).fadeOut(100);
  $("#" + color[randomNumber]).fadeIn(100);

  playSound(color[randomNumber]);
}

function playSound(name) {
  switch (name) {
    case "red":
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;
    default:
      var audio = new Audio("./sounds/wrong.mp3");
      audio.play();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 110);
}

function checkAnswer(currentLevel) {
  if (pattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === pattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);

    
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}



function startOver(){
  level=0;
  pattern=[];
  hn=0;
}