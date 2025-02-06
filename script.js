// Game Variables
const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isGameOver = false;

// Player Movement (Follows Mouse)
document.addEventListener('mousemove', (e) => {
  if (!isGameOver) {
    const x = e.clientX - player.offsetWidth / 2;
    const y = e.clientY - player.offsetHeight / 2;
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
  }
});

// Asteroid Creation
function createAsteroid() {
  if (isGameOver) return;

  const asteroid = document.createElement('div');
  asteroid.className = 'asteroid';
  asteroid.style.left = `${Math.random() * (window.innerWidth - 64)}px`;
  asteroid.style.top = '-64px';
  gameContainer.appendChild(asteroid);

  // Asteroid Movement
  let asteroidInterval = setInterval(() => {
    const asteroidY = asteroid.offsetTop;
    if (asteroidY > window.innerHeight) {
      clearInterval(asteroidInterval);
      asteroid.remove();
    } else {
      asteroid.style.top = `${asteroidY + 4}px`; // Adjust speed here
    }

    // Collision Check
    if (checkCollision(player, asteroid)) {
      gameOver();
    }
  }, 20);
}

// Collision Detection
function checkCollision(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return (
    aRect.left < bRect.right &&
    aRect.right > bRect.left &&
    aRect.top < bRect.bottom &&
    aRect.bottom > bRect.top
  );
}

// Game Over
function gameOver() {
  isGameOver = true;
  alert(`Game Over! Score: ${score}`);
  window.location.reload();
}

// Score Update
function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Game Loop
setInterval(createAsteroid, 1500); // Spawns asteroids every 1.5 seconds
setInterval(updateScore, 1000); // Updates score every second