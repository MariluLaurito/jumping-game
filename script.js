const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


let dino = { x: 50, y: 200, width: 50, height: 50, dy: 0, gravity: 1.5, jumpPower: -25, jumping: false };
let obstacles = [];
let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let gameSpeed = 5;
let gameOver = false;


const dinoImg = new Image();
dinoImg.src = "images/dino.png";

function drawDino() {
    ctx.drawImage(dinoImg, dino.x, dino.y, 80, 80);
}

function drawObstacles() {
    ctx.fillStyle = "green"; 
    obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
}

function updateObstacles() {
    if (Math.random() < 0.009) {
        obstacles.push({ x: canvas.width, y: 200, width: 20, height: 50 });
    }
    obstacles.forEach(obstacle => obstacle.x -= gameSpeed);
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
                gameOver = true;
        }
    });
}

function updateDino() {
    if (dino.jumping) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;
        if (dino.y >= 200) {
            dino.y = 200;
            dino.jumping = false;
        }
    }
}

function updateScore() {
    if (!gameOver) {
        score++;
    }
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);  
    }
}

function drawScore() {
    if (!gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
    }
}

function drawHighScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("High Score: " + highScore, 10, 60);  
}


function welcomeGame() {
    document.getElementById('welcome').style.display = 'block'; 
}

function startGame() {
    document.getElementById('welcome').style.display = 'none'; 
    gameLoop(); 
}



function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    drawDino();
    drawObstacles();
    drawScore();
    drawHighScore();
    
    if (!gameOver) {
        updateDino();
        updateObstacles();
        checkCollision();
        updateScore();
        updateHighScore();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = "#022b09";
        ctx.font = "50px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2);

        ctx.fillStyle = "#022b09";
        ctx.font = "30px Arial";
        ctx.fillText("Final Score: " + score, canvas.width / 2 - 90, canvas.height / 2 + 40);

        setTimeout(showAlert, 1500);
    }
}


function showAlert() {
    document.getElementById('alertBox').style.display = 'block';
}


function restartGame() {
    document.getElementById('alertBox').style.display = 'none';
    score = 0;
    gameOver = false;
    obstacles = []; 
    gameLoop(); 
}


window.onload = function() {
    welcomeGame(); 

    document.getElementById('startButton').addEventListener('click', startGame);
};


document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && dino.y === 200) {
        dino.dy = dino.jumpPower;
        dino.jumping = true;
    }
});
