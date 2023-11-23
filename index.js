const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")

const gameOverElement = document.createElement("div");
gameOverElement.className = "game-over";
document.body.appendChild(gameOverElement);

let gameOver = false;
let foodX;
let foodY;
let snakeBody = []
let velocityX = 0, velocityY = 0;
//snake
let snakeX = 5;
let snakeY = 10;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

//Posicion de la cominda
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId)

    gameOverElement.innerHTML = '<h1 class="game-over">Game Over <span>☠️</span></h1>';
    gameOverElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    setTimeout(() => {
        location.reload();
    }, 2000); 
}

//Direcciones del teclado
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        //las coordenadas hacia arriva son negativas y hacia abajo negativas en caso de precionar tecla arriva
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    //initGame();
    //console.log(e)
}
const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<img src="manzana.png" class="food" style="grid-area: ${foodY} / ${foodX}">`;
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX,foodY])
        score++;

        highScore = score >= highScore ? score:highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX,snakeY]

    snakeX += velocityX
    snakeY += velocityY //y = 10 - 1 = 9

    //codigo ,para cuando choque en la pare termine el juego
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
    

    //Creando div para el cuerpo del snake
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }
    
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)