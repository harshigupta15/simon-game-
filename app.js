const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start the game on key press
document.addEventListener("keydown", () => {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Button click handler
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  const button = document.getElementById(randomColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
  playSound(randomColor);
}

// Play button sound
function playSound(name) {
  const audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound" + (buttonColors.indexOf(name) + 1) + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColor) {
  const btn = document.getElementById(currentColor);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 100);
}

// Check user input
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(() => document.body.classList.remove("game-over"), 200);
    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
