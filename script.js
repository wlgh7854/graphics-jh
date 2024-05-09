let video;
let canvas;
let ctx;

function setup() {
    // Create a video element
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide(); // Hide the HTML video element as we will use the canvas to display

    // Setup the canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Update canvas every frame
    draw();
}

function draw() {
    ctx.drawImage(video, 0, 0, video.width, video.height);

    // Apply mosaic effect
    let tileWidth = 20; // Size of each tile
    for (let x = 0; x < video.width; x += tileWidth) {
        for (let y = 0; y < video.height; y += tileWidth) {
            let imgData = ctx.getImageData(x, y, tileWidth, tileWidth);
            let red = imgData.data[0];
            let green = imgData.data[1];
            let blue = imgData.data[2];
            // Fill the tile with the average color
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, y, tileWidth, tileWidth);
        }
    }

    requestAnimationFrame(draw); // Call draw() for the next frame
}

// Initialize the video and canvas setup
window.onload = setup;
