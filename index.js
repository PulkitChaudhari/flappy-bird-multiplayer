
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

    // Defining pipe object (position and size)
    // const pipe = {
    //     x: 100,
    //     y: 0,
    //     width: 60,
    //     height: Math.random() * canvas.height / 2,
    //     gap: 150, // space between top and bottom pipes
    //     imageTop: new Image(),
    //     imageBottom: new Image(),
    // };
    
    //   pipe.imageTop.src = './pipe-top.png';
    //   pipe.imageBottom.src = './pipe-bottom.png';
    
    //   function drawPipes() {
    //     ctx.drawImage(pipe.imageTop, pipe.x, pipe.y, pipe.width, pipe.height);
    //     ctx.drawImage(pipe.imageBottom, pipe.x, pipe.height + pipe.gap, pipe.width, canvas.height - pipe.height - pipe.gap);
    //   }
    
    //   pipe.imageTop.onload = function() {
    //     pipe.imageBottom.onload = function() {
    //         drawPipes();
    //     };
    //   };
    

    
    let pipes = [];

    function createPipe() {
    pipes.push({
        x: 100,
        y: 0,
        width: 60,
        height: Math.random() * canvas.height / 2,
        gap: 100,
    });
    }

    function movePipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;
        drawPipes();
    }
    
    if (pipes[0].x + pipes[0].width < 0) {
        pipes.shift();
    }
    
    if (pipes[pipes.length - 1].x < canvas.width - 200) {
        createPipe();
    }
    
    requestAnimationFrame(movePipes);
    }

    movePipes();

        let gravity = 1.5;
        let velocity = 0;

    function animate() {
        velocity += gravity;
        bird.y += velocity;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawPipes();
        drawBird();
        requestAnimationFrame(animate);
    }
    
    animate();
    

});
