// script.js
const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipeTop");
const pipeBottom = document.getElementById("pipeBottom");
const scoreDisplay = document.getElementById("score");

let birdY = 200;
let velocity = 0;
let gravity = 0.5;
let isGameOver = false;
let score = 0;

// Pipe properties
let pipeX = 400;
let gap = 150;

function jump() {
  if (!isGameOver) {
    velocity = -10;
  }
}

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function gameLoop() {
  if (isGameOver) return;

  // Gravity
  velocity += gravity;
  birdY += velocity;
  bird.style.top = birdY + "px";

  // Move pipes
  pipeX -= 3;
  if (pipeX < -60) {
    pipeX = 400;
    score++;
    scoreDisplay.textContent = score;
    // Random gap
    const randomHeight = Math.floor(Math.random() * 200) + 50;
    pipeTop.style.height = randomHeight + "px";
    pipeBottom.style.height = 400 - randomHeight - gap + "px";
  }

  pipeTop.style.left = pipeX + "px";
  pipeBottom.style.left = pipeX + "px";

  // Collision detection
  const birdBottom = birdY + 30;
  const topPipeBottom = parseInt(pipeTop.style.height);
  const bottomPipeTop = 500 - parseInt(pipeBottom.style.height);

  if (
    birdY < 0 ||
    birdBottom > 500 ||
    (pipeX < 80 && pipeX + 60 > 50 &&
      (birdY < topPipeBottom || birdBottom > bottomPipeTop))
  ) {
    isGameOver = true;
    alert("zakir says Game Over! Score: "+ score);
    window.location.reload();
  }

  requestAnimationFrame(gameLoop);
}

// Initialize pipe height
pipeTop.style.height = "200px";
pipeBottom.style.height = "150px";

gameLoop();
