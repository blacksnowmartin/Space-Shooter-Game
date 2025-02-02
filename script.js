// Game Variables
const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isGameOver = false;

// Player Movement
document.addEventListener('mousemove', (e) => {
  if (!isGameOver) {
    const x = e.clientX - player.offsetWidth / 2;
    const y = e.clientY - player.offsetHeight / 2;
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
  }
});

// Create Asteroids
function createAsteroid() {
  if (isGameOver) return;

  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');
  asteroid.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  asteroid.style.top = `-50px`;
  gameContainer.appendChild(asteroid);

  // Move Asteroid
  const asteroidInterval = setInterval(() => {
    const asteroidTop = asteroid.offsetTop;
    if (asteroidTop > window.innerHeight) {
      clearInterval(asteroidInterval);
      asteroid.remove();
    } else {
      asteroid.style.top = `${asteroidTop + 5}px`;
    }

    // Check Collision
    if (checkCollision(player, asteroid)) {
      gameOver();
    }
  }, 20);
}

// Check Collision
function checkCollision(player, asteroid) {
  const playerRect = player.getBoundingClientRect();
  const asteroidRect = asteroid.getBoundingClientRect();

  return (
    playerRect.left < asteroidRect.right &&
    playerRect.right > asteroidRect.left &&
    playerRect.top < asteroidRect.bottom &&
    playerRect.bottom > asteroidRect.top
  );
}

// Game Over
function gameOver() {
  isGameOver = true;
  alert(`Game Over! Your Score: ${score}`);
  window.location.reload();
}

// Update Score
function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Spawn Asteroids
setInterval(createAsteroid, 1000);

// Update Score Every Second
setInterval(updateScore, 1000);
