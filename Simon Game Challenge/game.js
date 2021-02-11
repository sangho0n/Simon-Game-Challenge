var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var isStarted = true;
var level = 0;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function playSound(name){
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  var randomNumber = getRandomIntInclusive(0, 3);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

};

function handler(key){ // when clicked
  var userChosenColour = key;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){
  var state = 0; //0 for default, 1 for wrong, 2 for completed

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    state = 2;
  }
  else{state = 1
  }

  if(state === 2){
    if(gamePattern.length === userClickedPattern.length){
      userClickedPattern = [];
      window.setTimeout(function(){nextSequence()}, 1000);
    }
  }
  else{
    var audio = new Audio("sounds/wromg.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press any key to restart.")
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isStarted = false;
}

$(".btn").click(function(){
  handler($(this).attr("id"));
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
  if(isStarted === false){
  nextSequence();
  isStarted = true;
  }
  else return;

})
