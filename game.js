// Obtener el canvas y su contexto
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Definir el objeto pelota
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 2,
  speedY: -2,
};

// Definir las porterías
var goal1 = {
  x: 10,
  y: canvas.height / 2 - 40,
  width: 10,
  height: 80,
};

var goal2 = {
  x: canvas.width - 20,
  y: canvas.height / 2 - 40,
  width: 10,
  height: 80,
};

// Definir los jugadores
var player1 ={ 
  x: 20,
  y: canvas.height / 2 - 40,
  width: 10,
  height: 80,
  dy: 5,
  dx: 5, // velocidad de movimiento
  score: 0,
};

var player2 =  {
  x: canvas.width - 30,
  y: canvas.height / 2 - 40,
  width: 10,
  height: 80,
  dy: 5, 
  dx: 5,// velocidad de movimiento
  score: 0,
};

// Función para dibujar el campo de juego
function drawField() {
  // Campo de juego
  context.fillStyle = "#008000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Línea central
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.stroke();

  // Círculo central
  const circleRadius = 50;
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, circleRadius, 0, Math.PI * 2);
  context.closePath();
  context.stroke();
}



// Dibujar el fondo
function drawBackground() {
  context.fillStyle = "#69b54e";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Función para dibujar la pelota
function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "#000";
  context.fill();
  context.closePath();
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = -ball.speedX;
  ball.speedY = -ball.speedY;
}

// Función para actualizar la posición de la pelota y manejar colisiones
function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Colisión con los jugadores
  if (
    ball.y + ball.radius > player1.y &&
    ball.y - ball.radius < player1.y + player1.height &&
    ball.x - ball.radius < player1.x + player1.width &&
    ball.speedX < 0
  ) {
    ball.speedX = -ball.speedX;
  }

  if (
    ball.y + ball.radius > player2.y &&
    ball.y - ball.radius < player2.y + player2.height &&
    ball.x + ball.radius > player2.x &&
    ball.speedX > 0
  ) {
    ball.speedX = -ball.speedX;
  }

  // Colisión con las porterías
  if (
    ball.y + ball.radius > goal1.y &&
    ball.y - ball.radius < goal1.y + goal1.height &&
    ball.x - ball.radius < goal1.x + goal1.width &&
    ball.speedX < 0
  ) {
    player2.score++;
    resetBall();
  }

  if (
    ball.y + ball.radius > goal2.y &&
    ball.y - ball.radius < goal2.y + goal2.height &&
    ball.x + ball.radius > goal2.x &&
    ball.speedX > 0
  ) {
    player1.score++;
    resetBall();
  }

  // Rebotar en los bordes superior e inferior
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }
}


// Función para dibujar los puntajes en el canvas
function drawScores() {
  context.fillStyle = "#000";
  context.font = "24px Arial";
  context.fillText("Player 1: " + player1.score, 20, 40);
  context.fillText("Player 2: " + player2.score, canvas.width - 150, 40);
}

// Dibujar las porterías
function drawGoals() {
  context.fillStyle = "#000";
  context.fillRect(goal1.x, goal1.y, goal1.width, goal1.height);
  context.fillRect(goal2.x, goal2.y, goal2.width, goal2.height);
}



// Función para dibujar los jugadores
function drawPlayer1() {
 context.fillStyle = "red";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
}
function drawPlayer2() {

     context.fillStyle = "blue";
       context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

// Función para manejar las teclas de movimiento
function handleKeyDown(event) {
  // Jugador 1 (teclas W y S)
  if (event.d === "w") {
    player1.y -= player1.dy;
  } 
  else if (event.key === "s") {
    player1.y += player1.dy;
  }
  else if (event.key  === "a") { 

      player1.x -= player1.dx
   }
   else if (event.key ==="d" ) {

         player1.x += player1.dx;
      }

  // Jugador 2 (flechas arriba y abajo)
  if (event.key === "ArrowUp") {
    player2.y -= player2.dy;
  } else if (event.key === "ArrowDown") {
    player2.y += player2.dy;
  }
    else if (event.key ==="ArrowLeft") {
          player2.x -= player2.dx;


      }
      else if (event.key ==="ArrowRight" ) {

         player2.x += player2.dx;
      }
}

// Evento para escuchar las teclas presionadas
document.addEventListener("keydown", handleKeyDown);


var keys = {};

function handleKeyDown(event) {
  keys[event.key] = true;
}

function handleKeyUp(event) {
  keys[event.key] = false;
}

// Eventos para escuchar las teclas presionadas y liberadas
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Función para actualizar la posición de los jugadores
function updatePlayers() {
  // Jugador 1 (teclas W, A, S y D)
  if (keys["w"] && player1.y > 0) {
    player1.y -= player1.dy;
  }
  if (keys["s"] && player1.y + player1.height < canvas.height) {
    player1.y += player1.dy;
  }
  if (keys["a"] && player1.x > 0) {
    player1.x -= player1.dx;
  }
  if (keys["d"] && player1.x + player1.width < canvas.width / 2) {
    player1.x += player1.dx;
  }

  // Jugador 2 (flechas arriba, abajo, izquierda y derecha)
  if (keys["ArrowUp"] && player2.y > 0) {
    player2.y -= player2.dy;
  }
  if (keys["ArrowDown"] && player2.y + player2.height < canvas.height) {
    player2.y += player2.dy;
  }
  if (keys["ArrowLeft"] && player2.x > canvas.width / 2) {
    player2.x -= player2.dx;
  }
  if (keys["ArrowRight"] && player2.x + player2.width < canvas.width) {
    player2.x += player2.dx;
  }
}

function veryfygameover(){

  if (player1.score >= 5){
    alert("¡Juego Terminado Jugador 1 es el ganador!")
  }

    if (player2.score >= 5){
    alert("¡Juego Terminado Jugador 2 es el ganador!")
  }

}


// Función principal del juego
function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawField();
  drawGoals();
  drawPlayer1();
  drawPlayer2();
  drawBall();
  updateBall();
  updatePlayers();
  drawScores();
  
veryfygameover();
  requestAnimationFrame(gameLoop);
}


// Iniciar el juego
gameLoop();