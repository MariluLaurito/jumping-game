const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 200, width: 50, height: 50, dy: 0, gravity: 1.5, jumpPower: -25, jumping: false };
let obstacles = [];
let score = 0;
let gameSpeed = 5;
let gameOver = false;

// const dino Image = newImage();
// dinoImg.src = "images/dino.png";

// // const groundImg = newImage();
// // groundImg.src = "suelo.png";



// function drawDino() {
//     ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
//     // ctx.fillStyle = "black"; //DINO
//     // ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
// }


const dinoImg = new Image(); // Create the imagen
dinoImg.src = "images/dino.png";

// Wait for the pic loads
dinoImg.onload = function() {
    gameLoop();
};

function drawDino() {
    ctx.drawImage(dinoImg, dino.x, dino.y, 80, 80);
}



function drawObstacles() {
    ctx.fillStyle = "green"; //OBSTACLES
    obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
}

function updateObstacles() {
    if (Math.random() < 0.02) {
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

function drawScore() {
    if (!gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();
    drawScore();
    if (!gameOver) {
        updateDino();
        updateObstacles();
        checkCollision();
        updateScore();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = "dark green";
        ctx.font = "50px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2);

        ctx.fillStyle = "dark green";
        ctx.font = "30px Arial";
        ctx.fillText("Final Score: " + score, canvas.width / 2 - 90, canvas.height / 2 + 40);
    }
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && dino.y === 200) {
        dino.dy = dino.jumpPower;
        dino.jumping = true;
    }
});

gameLoop();