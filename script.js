const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let newScore = 0;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};
// Create new paddle props ****************************************************
const newPaddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 550,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}
// Draw new paddle on canvas ****************************************
function drawNewPaddle() {
  ctx.beginPath();
  ctx.rect(newPaddle.x, newPaddle.y, newPaddle.w, newPaddle.h);
  ctx.fill();
  ctx.closePath();
}

// Draw score oon canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score of upper player: ${score}`, canvas.width - 270, 30);
  ctx.fillText(`Score of bottom player: ${newScore}`, canvas.width -780, 30);
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}
// Move new paddle on canvas ************************************************
function moveNewPaddle() {
  newPaddle.x += newPaddle.dx;

  // Wall detection
  if (newPaddle.x + newPaddle.w > canvas.width) {
    newPaddle.x =  canvas.width - newPaddle.w;
  }

  if (newPaddle.x < 0) {
    newPaddle.x = 0;
  }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // console.log(ball.x, ball.y);

  // Paddle collision 
  if (
    ball.x - ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
    // Paddle collision with UPPER PADDLE
  if (
    ball.x - ball.size <= newPaddle.x + newPaddle.w &&
    ball.x + ball.size >= newPaddle.x - newPaddle.w &&
    ball.y + ball.size === newPaddle.y + 2*newPaddle.h
  ) {
    ball.dy = ball.speed;
  }

  // Score increise bottom wall
  if (ball.y + ball.size > canvas.height) {   // Here you changed code !!!
    
    ++score;
  }

  // Score increise upper wall
  if (ball.y + ball.size < canvas.height -580) {
    ++newScore;
  }
}


// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawNewPaddle();
  drawScore();
}

// Update canvas drawing and animation
function update() {
  movePaddle();
  moveNewPaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
  else if (e.key === 'e' || e.key === 'd') {
    newPaddle.dx = newPaddle.speed;
  } else if (e.key === 'q' || e.key === 'a') {
    newPaddle.dx = -newPaddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
  if (
    e.key === 'q' ||
    e.key === 'a' ||
    e.key === 'e' ||
    e.key === 'd'
  ) {
    newPaddle.dx = 0;
  }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));