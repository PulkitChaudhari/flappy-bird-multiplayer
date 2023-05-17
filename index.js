
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
    const bird = {
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

    // We need to wait for the image to be loaded and then it can be drawn
    bird.image.onload = function() {
        drawBird();
    };

        let gravity = 1.5;
        let velocity = 0;

    function animate() {
        velocity += gravity;
        bird.y += velocity;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // drawPipes();
        drawBird();
        requestAnimationFrame(animate);
    }
    
    animate();

    let pipes = [];
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
          ctx.fillStyle = '#00FF00'; // green color
          ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
      
          // Draw the bottom pipe
          ctx.fillStyle = '#00FF00'; // green color
          ctx.fillRect(pipe.x, pipe.height + pipe.gap, pipe.width, canvas.height - pipe.height - pipe.gap);
      
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

      function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
      
        // Draw other elements such as the background, bird, etc.
      
        // Move and draw the pipes
        movePipes();
      
        // Call the game loop again
        requestAnimationFrame(gameLoop);
      }
      
      // Start the game loop
      gameLoop();
      
    

});
