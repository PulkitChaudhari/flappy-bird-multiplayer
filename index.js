// Need this cause js code is executed before DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element
  const canvas = document.getElementById("myCanvas");

  // Obtain the 2D rendering context
  const ctx = canvas.getContext("2d");

  // Defining birds position and size
  var bird1 = {
    x: 250,
    y: canvas.height / 2,
    width: 45,
    height: 35,
    image: new Image(),
    jumpStrength: 6,
    jumpDuration: 0,
    velocity: 0,
    gravity: 0.5,
    text: "player1",
  };

  var bird2 = {
    x: 250,
    y: canvas.height / 2,
    width: 45,
    height: 35,
    image: new Image(),
    jumpStrength: 6,
    jumpDuration: 0,
    velocity: 0,
    gravity: 0.5,
    text: "player2",
  };

  // Defining birds image source
  bird1.image.src = "./bird.png";
  bird2.image.src = "./bird.png";

  function writeText(text, x, y) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
  }

  // Drawing bird1 on canvas
  function drawbird() {
    ctx.drawImage(bird1.image, bird1.x, bird1.y, bird1.width, bird1.height);
    ctx.drawImage(bird2.image, bird2.x, bird2.y, bird2.width, bird2.height);
  }

  // Adding the jumping functionality
  function makebirdJump() {
    canvas.addEventListener("click", function () {
      bird1.velocity = -bird1.jumpStrength;
    });
  }

  // Adding gravity to make the bird1 fall
  function updatebird() {
    bird1.velocity += bird1.gravity;
    bird1.y += bird1.velocity;
  }

  // Creating empty pipes array for storing all the pipes
  let pipes = [];

  // Loading pipeImages into object
  const pipeImg = {
    pipeTop: new Image(),
    pipeBottom: new Image(),
  };

  // Adding pipe images source
  pipeImg.pipeTop.src = "./pipe-top.png";
  pipeImg.pipeBottom.src = "./pipe-bottom.png";

  // pipe parameters
  const pipeGap = 250; // space between top and bottom pipes
  const minHeight = 50; // minimum height of a pipe

  // Need to add first pipe

  function createPipe() {
    const pipeHeight =
      Math.random() * (canvas.height - pipeGap - minHeight) + minHeight;
    const pipe = {
      x: canvas.width,
      y: 0,
      width: 60,
      height: pipeHeight,
      gap: pipeGap,
      speed: 2, // speed at which the pipes move
    };
    pipes.push(pipe);
  }

  function movePipes() {
    // If the pipes array is empty then populate it with first pipe
    if (pipes.length == 0) {
      pipes.push({
        x: canvas.width,
        y: 0,
        width: 60,
        height:
          Math.random() * (canvas.height - pipeGap - minHeight) + minHeight,
        gap: pipeGap,
        speed: 2,
      });
    }

    // Loop through all the pipes, change their pos and draw them and
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i];
      // Move the pipe to the left
      pipe.x -= pipe.speed;
      // Draw the top pipe
      ctx.drawImage(pipeImg.pipeTop, pipe.x, pipe.y, pipe.width, pipe.height);
      // Draw the bottom pipe
      ctx.drawImage(
        pipeImg.pipeBottom,
        pipe.x,
        pipe.height + pipe.gap,
        pipe.width,
        canvas.height - pipe.height - pipe.gap
      );
      // Check if the pipe has moved off-screen
      if (pipe.x + pipe.width <= 0) {
        pipes.shift(); // Remove the pipe from the array
      }
    }

    // Create a new pipe if needed
    if (pipes[pipes.length - 1].x < canvas.width - 400) {
      createPipe();
    }
  }

  // Display game over
  function displayGameOver() {
    // Display the game over message and restart button
    ctx.font = "48px 'Press Start 2P', cursive";
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
    ctx.strokeText("Game Over", canvas.width / 2 - 120, canvas.height / 2 - 25);
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2 - 25);

    // Restart button parameters
    const buttonX = 300;
    const buttonY = 300;
    const buttonWidth = 200;
    const buttonHeight = 50;
    const borderWidth = 3;

    // Display the restart button
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeRect(
      buttonX + borderWidth / 2,
      buttonY + borderWidth / 2,
      buttonWidth - borderWidth,
      buttonHeight - borderWidth
    );
    ctx.fillText(
      "Click Me",
      buttonX + buttonWidth / 2 - 40,
      buttonY + buttonHeight / 2 + 10
    );

    // Adding restart button functionality
    canvas.addEventListener("click", function (event) {
      // Detect mouse click event
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Check if the click is within the button area
      if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
      ) {
        restartGame();
      }
    });
  }

  // Restarting the game
  function restartGame() {
    // Clearing Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Adding sky colour in canvas
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Redefining and drawing bird1
    bird1 = {
      x: 250,
      y: canvas.height / 2,
      width: 80,
      height: 80,
      image: new Image(),
    };
    bird1.image.src = "./bird.png";
    bird2.image.src = "./bird.png";
    drawbird();
    // Emptying pipes array
    pipes = [];
    gameLoop();
  }

  function checkCollision() {
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i];
      if (pipes[i].x > bird1.width + bird1.x) break;
      if (
        (bird1.x + bird1.width > pipes[i].x &&
          pipes[i].x + pipes[i].width > bird1.x + bird1.width) ||
        (bird1.x < pipes[i].x + pipes[i].width && bird1.x > pipes[i].x)
      ) {
        if (
          pipes[i].y + pipes[i].height > bird1.y ||
          pipes[i].height + pipes[i].gap + pipes[i].y < bird1.y + bird1.height
        ) {
          const birdPixels = ctx.getImageData(
            bird1.x,
            bird1.y,
            bird1.width,
            bird1.height
          ).data;
          const pipePixels = ctx.getImageData(
            pipe.x,
            pipe.y,
            pipe.width,
            pipe.height
          ).data;
          for (let i = 0; i < birdPixels.length; i += 4) {
            const birdAlpha = birdPixels[i];
            const pipeAlpha = pipePixels[i];
            if (birdAlpha !== 0 && pipeAlpha !== 0) {
              console.log(birdAlpha);
              console.log(pipeAlpha);
              animate();
              displayGameOver();
              break;
            }
          }
        }
      }
    }
  }

  function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    makebirdJump();
    // Draw other elements such as the background, bird1, etc.
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = '#000000';
    // ctx.fillRect(bird1.x, bird1.y, bird1.width,bird1.height);
    updatebird();
    ctx.drawImage(bird1.image, bird1.x, bird1.y, bird1.width, bird1.height);
    ctx.drawImage(bird2.image, bird2.x, bird2.y, bird2.width, bird2.height);
    writeText(
      bird1.text,
      bird1.x + bird1.width / 2,
      bird1.y + bird1.height + 20
    ); // Write text below the bird
    writeText(
      bird2.text,
      bird2.x + bird2.width / 2,
      bird2.y + bird2.height + 20
    ); // Write text below the bird

    // Move and draw the pipes
    movePipes();

    // check if bird1 collides with a pipe
    checkCollision();

    // Call the game loop again
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
});
