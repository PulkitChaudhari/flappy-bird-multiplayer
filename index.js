
// Need this cause js code is executed before DOM is fully loaded
document.addEventListener('DOMContentLoaded', function()
{
    // Get the canvas element
    const canvas = document.getElementById('myCanvas');

    // Obtain the 2D rendering context
    const ctx = canvas.getContext('2d');

    // Drawing the background - Blue sky
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Defining birds position and size
    var bird = {
        x: 250,
        y: canvas.height / 2,
        width: 80,
        height: 80,
        image: new Image(),
    };
    
    // Defining birds image source
    bird.image.src = './bird.png';
    
    // Drawing bird on canvas
    function drawBird() {
        ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
    }

        let gravity = 0.0003;
        let velocity = 0;

    function animate() {
        velocity += gravity;
        bird.y += velocity;
        drawBird();
        requestAnimationFrame(animate);
    }
    

    let pipes = [];

    const pipeImg = {
      pipeTop : new Image(),
      pipeBottom : new Image()
    }

    pipeImg.pipeTop.src = './pipe-top.png'
    pipeImg.pipeBottom.src = './pipe-bottom.png'

    pipes.push({
        x: canvas.width,
        y: 0,
        width: 60,
        height: Math.random() * (canvas.height - 150 - 50) + 50,
        gap: 150,
        speed: 2 // speed at which the pipes move
      })

    function createPipe() {
        const pipeGap = 150; // space between top and bottom pipes
        const minHeight = 50; // minimum height of a pipe
      
        const pipeHeight = Math.random() * (canvas.height - pipeGap - minHeight) + minHeight;
      
        const pipe = {
          x: canvas.width,
          y: 0,
          width: 60,
          height: pipeHeight,
          gap: pipeGap,
          speed: 2 // speed at which the pipes move
        };
        pipes.push(pipe);
      }

      function movePipes() {
        for (let i = 0; i < pipes.length; i++) {
          const pipe = pipes[i];
      
          // Move the pipe to the left
          pipe.x -= pipe.speed;
      
          // Draw the top pipe
          // ctx.fillStyle = '#00FF00'; // green color
          // ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
      
          ctx.drawImage(pipeImg.pipeTop, pipe.x, pipe.y, pipe.width, pipe.height);

          // Draw the bottom pipe
          // ctx.fillStyle = '#00FF00'; // green color
          // ctx.fillRect(pipe.x, pipe.height + pipe.gap, pipe.width, canvas.height - pipe.height - pipe.gap);

          ctx.drawImage(pipeImg.pipeBottom, pipe.x, pipe.height + pipe.gap, pipe.width, canvas.height - pipe.height - pipe.gap);
      
          // You can also use images instead of solid colors to draw the pipes
      
          // Check if the pipe has moved off-screen
          if (pipe.x + pipe.width < 0) {
            pipes.shift(); // Remove the pipe from the array
          }
        }
      
        // Create a new pipe if needed
        if (pipes[pipes.length - 1].x < canvas.width - 200) {
          createPipe();
        }
      }

      function displayGameOver() {
          // Display the game over message and restart button
          ctx.font = "48px 'Press Start 2P', cursive";
          ctx.fillStyle = "#000000";
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#000000";
          ctx.strokeText("Game Over", canvas.width / 2 - 120, canvas.height / 2 - 25);
          ctx.fillStyle = "#FF0000";
          ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2 - 25);

          const buttonX = 300;
          const buttonY = 300;
          const buttonWidth = 200;
          const buttonHeight = 50;
          const borderWidth = 3;
          console.log(canvas.width,canvas.height)

          // // Display the restart button 
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
          // Detect mouse click event
          canvas.addEventListener('click', function(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if the click is within the button area
            if (
              mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
              mouseY >= buttonY && mouseY <= buttonY + buttonHeight
            ) {
              restartGame();
            }
          });
      }

      function restartGame() {
        bird = {
          x: 250,
          y: canvas.height / 2,
          width: 80,
          height: 80,
          image: new Image(),
        };
        pipes=[]
        pipes.push({
          x: canvas.width,
          y: 0,
          width: 60,
          height: Math.random() * (canvas.height - 150 - 50) + 50,
          gap: 150,
          speed: 2 // speed at which the pipes move
        })
        console.log("here")
        gameLoop()
      }

      const restartButton = document.getElementById('restart-button');
      restartButton.addEventListener('click', restartGame);

      function checkCollision() {
        for (let i = 0; i < pipes.length; i++) {
          if (pipes[i].x > bird.width + bird.x) break;
          else if (pipes[i].y + pipes[i].height > bird.y || pipes[i].height + pipes[i].gap < bird.y + bird.height) {
            // Collision happened
            animate();
            displayGameOver();
          }

        }
      }

      function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
      
        // Draw other elements such as the background, bird, etc.
      
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
