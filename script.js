// script.js

// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Example: Draw a simple moving square
let x = 50;
let y = 50;
let speedX = 2;
let speedY = 2;

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a green square
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 50, 50);

    // Update position
    x += speedX;
    y += speedY;

    // Bounce off the edges
    if (x + 50 > canvas.width || x < 0) speedX = -speedX;
    if (y + 50 > canvas.height || y < 0) speedY = -speedY;

    // Continue the animation
    requestAnimationFrame(draw);
}

draw();

// Example: Fetch data from an API (limited proxy-like behavior)
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Replace with a valid API URL if you have one
fetchData('https://api.example.com/data');
