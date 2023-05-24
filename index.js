// Need this cause js code is executed before DOM is fully loaded
document.addEventListener('DOMContentLoaded', function()
{
    // Get the canvas element
    const canvas = document.getElementById('myCanvas');

    // Obtain the 2D rendering context
    const ctx = canvas.getContext('2d');

    // Defining birds position and size
    var bird = {
      x: 250,
      y: canvas.height / 2,
      width: 80,
      height: 80,
      image: new Image(),
      jumpStrength: 6,
      jumpDuration: 0,
      velocity: 0,
      gravity: 0.5,
    };
    
    // Defining birds image source
    bird.image.src = './bird.png';
    
    // Drawing bird on canvas
    function drawBird() {
      ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
    }

    // Adding the jumping functionality
    canvas.addEventListener('click', function() {
      bird.velocity = -bird.jumpStrength;
    });

    // Adding gravity to make the bird fall
    function updateBird() {
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;
      // Additional logic for collision detection, game over, etc.
    }

    // Creating empty pipes array for storing all the pipes
    let pipes = [];

    // Loading pipeImages into object
    const pipeImg = {
      pipeTop : new Image(),
      pipeBottom : new Image()
    }

    // Adding pipe images source
    pipeImg.pipeTop.src = './pipe-top.png'
    pipeImg.pipeBottom.src = './pipe-bottom.png'

    // pipe parameters
    const pipeGap = 250; // space between top and bottom pipes
    const minHeight = 50; // minimum height of a pipe

    // Need to add first pipe 

    function createPipe() {
        const pipeHeight = Math.random() * (canvas.height - pipeGap - minHeight) + minHeight;
        const pipe = {
          x: canvas.width,
          y: 0,
          width: 60,
          height: pipeHeight,
          gap: pipeGap,
          speed: 2 // speed at which the pipes move
        };
        pipes.push(pipe)
        // return pipe;
    }

      function movePipes() {

        // If the pipes array is empty then populate it with first pipe
        if (pipes.length == 0) {
          pipes.push({
            x: canvas.width,
            y: 0,
            width: 60,
            height: Math.random() * (canvas.height - pipeGap - minHeight) + minHeight,
            // height : 300,
            gap: pipeGap,
            speed: 2 
        })
        }

        // Loop through all the pipes, change their pos and draw them and 
        for (let i = 0; i < pipes.length; i++) {
          const pipe = pipes[i];

          // Move the pipe to the left
          pipe.x -= pipe.speed;

          // Draw the top pipe
          ctx.drawImage(pipeImg.pipeTop, pipe.x - 25, pipe.y, pipe.width, pipe.height + 30);

          // Draw the bottom pipe
          ctx.drawImage(pipeImg.pipeBottom, pipe.x - 25, pipe.height + pipe.gap - 25, pipe.width, canvas.height - pipe.height - pipe.gap + 25);
      
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
          ctx.fillStyle = '#00FF00';
          ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
          ctx.font = '20px Arial';
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeRect(
            buttonX + borderWidth / 2,
            buttonY + borderWidth / 2,
            buttonWidth - borderWidth,
            buttonHeight - borderWidth
          );
          ctx.fillText('Click Me', buttonX + buttonWidth / 2 - 40, buttonY + buttonHeight / 2 + 10);

          // Adding restart button functionality
          canvas.addEventListener('click', function(event) {

          // Detect mouse click event
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if the click is within the button area
            if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
              restartGame();
            }
          });
      }

      // Restarting the game
      function restartGame() {
        // Clearing Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redefining and drawing bird 
        bird = {
          x: 250,
          y: canvas.height / 2,
          width: 80,
          height: 80,
          image: new Image(),
        };
        bird.image.src = './bird.png';
        drawBird();

        // Emptying pipes array
        pipes=[]

        gameLoop()
      }

      const restartButton = document.getElementById('restart-button');
      restartButton.addEventListener('click', restartGame);

      function checkCollision() {
        for (let i = 0; i < pipes.length; i++) {
          if (pipes[i].x > bird.width + bird.x) break;
          if ((pipes[i].x <= bird.x && bird.x < pipes[i].x + pipes[i].width) || (pipes[i].x <= bird.x + bird.width && bird.x + bird.width < pipes[i].x + pipes[i].width)) {
            if (pipes[i].y + pipes[i].height > bird.y || pipes[i].height + pipes[i].gap < bird.y + bird.height) {
              // Collision happened
              console.log(bird.x,bird.y,pipes[i].x,pipes[i].y + pipes[i].height, pipes[i].height + pipes[i].gap)
              console.log(pipes)
            //   [
            //     {
            //         "x": 82,
            //         "y": 0,
            //         "width": 60,
            //         "height": 148.17415419483817,
            //         "gap": 150,
            //         "speed": 2
            //     },
            //     {
            //         "x": 282,
            //         "y": 0,
            //         "width": 60,
            //         "height": 207.1141035460748,
            //         "gap": 150,
            //         "speed": 2
            //     },
            //     {
            //         "x": 484,
            //         "y": 0,
            //         "width": 60,
            //         "height": 377.86066747345745,
            //         "gap": 150,
            //         "speed": 2
            //     },
            //     {
            //         "x": 686,
            //         "y": 0,
            //         "width": 60,
            //         "height": 226.90705142525508,
            //         "gap": 150,
            //         "speed": 2
            //     }
            // ]
              // 250 300 330 343.47716242290954 493.47716242290954
              animate();
              displayGameOver();
              break;
            }
          }
        }
      }

      function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        

        // Draw other elements such as the background, bird, etc.
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // updateBird()
        ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);

        // Move and draw the pipes
        movePipes();

        // check if bird collides with a pipe
        checkCollision();
      
        // Call the game loop again
        requestAnimationFrame(gameLoop);
      }
      
      // Start the game loop
      gameLoop();
      
      

});
