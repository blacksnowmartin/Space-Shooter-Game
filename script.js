// Game Variables
const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isGameOver = false;
let lives = 3;
let asteroidSpeed = 4;
let asteroidSpawnRate = 1500;

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
      asteroid.style.top = `${asteroidY + asteroidSpeed}px`; // Adjust speed dynamically
    }

    // Collision Check
    if (checkCollision(player, asteroid)) {
      asteroid.remove();
      clearInterval(asteroidInterval);
      loseLife();
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

// Lose Life
function loseLife() {
  lives--;
  if (lives <= 0) {
    gameOver();
  } else {
    alert(`You were hit! Lives remaining: ${lives}`);
  }
}

// Game Over
function gameOver() {
  isGameOver = true;
  const gameOverScreen = document.createElement('div');
  gameOverScreen.id = 'game-over';
  gameOverScreen.innerHTML = `<h1>Game Over</h1><p>Score: ${score}</p><button onclick="restartGame()">Restart</button>`;
  gameContainer.appendChild(gameOverScreen);
}

// Restart Game
function restartGame() {
  window.location.reload();
}

// Score Update
function updateScore() {
  if (isGameOver) return;
  score++;
  scoreDisplay.textContent = `Score: ${score}`;

  // Increase difficulty
  if (score % 10 === 0) {
    asteroidSpeed++;
    asteroidSpawnRate = Math.max(500, asteroidSpawnRate - 100); // Cap spawn rate at 500ms
    clearInterval(asteroidInterval);
    asteroidInterval = setInterval(createAsteroid, asteroidSpawnRate);
  }
}

// Pause/Resume Game
let isPaused = false;
document.addEventListener('keydown', (e) => {
  if (e.key === 'p') {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(asteroidInterval);
      clearInterval(scoreInterval);
    } else {
      asteroidInterval = setInterval(createAsteroid, asteroidSpawnRate);
      scoreInterval = setInterval(updateScore, 1000);
    }
  }
});

// Game Loop
let asteroidInterval = setInterval(createAsteroid, asteroidSpawnRate); // Spawns asteroids dynamically
let scoreInterval = setInterval(updateScore, 1000); // Updates score every second