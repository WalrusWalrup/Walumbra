// Tab functionality
document.querySelectorAll('nav a').forEach(tabLink => {
    tabLink.addEventListener('click', (event) => {
        event.preventDefault();

        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Add active class to the clicked tab
        const tabId = tabLink.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Initialize with Home tab active
document.querySelector('nav a[data-tab="home"]').click();

// Populate favicon dropdown
const faviconFolder = 'favicons/';
const favicons = ['blank.ico', 'classroom.png', 'default.png', 'gmail.ico', 'google.ico'];
const faviconSelect = document.getElementById('favicon-select');

favicons.forEach(icon => {
    const option = document.createElement('option');
    option.value = faviconFolder + icon;
    option.textContent = icon.split('.')[0].replace(/_/g, ' '); // Display name (e.g., "google")
    faviconSelect.appendChild(option);
});

// Update favicon
document.getElementById('update-favicon').addEventListener('click', () => {
    const selectedFavicon = faviconSelect.value;
    const file = document.getElementById('favicon-upload').files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('favicon').href = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        document.getElementById('favicon').href = selectedFavicon;
    }
});

// Handle favicon upload
document.getElementById('favicon-upload').addEventListener('change', () => {
    // This will be handled by the update button
});

// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
    const savedFavicon = localStorage.getItem('favicon');
    const savedTheme = localStorage.getItem('theme');
    const savedTabName = localStorage.getItem('tabName');

    if (savedFavicon) {
        document.getElementById('favicon').href = savedFavicon;
        faviconSelect.value = savedFavicon;
    }
    if (savedTheme) {
        document.body.className = savedTheme;
        document.getElementById('theme-select').value = savedTheme;
    }
    if (savedTabName) {
        document.title = savedTabName;  // Update only the browser tab title, not the navigation tabs
    }
});

// Save favicon
document.getElementById('update-favicon').addEventListener('click', () => {
    const selectedFavicon = faviconSelect.value;
    localStorage.setItem('favicon', selectedFavicon);
    document.getElementById('favicon').href = selectedFavicon;
});

// Save tab name (for browser tab, not navigation tab)
document.getElementById('update-tab-name').addEventListener('click', () => {
    const newTabName = document.getElementById('tab-name').value;
    localStorage.setItem('tabName', newTabName);
    document.title = newTabName;  // Only change the browser tab's name
});

// Apply theme
document.getElementById('apply-theme').addEventListener('click', () => {
    const selectedTheme = document.getElementById('theme-select').value;
    localStorage.setItem('theme', selectedTheme);
    document.body.className = selectedTheme;
});

// Add games to the list with click events
const games = [
    {name: 'Slope', img: 'game-icons/slope.png', url: 'https://tvz2304.github.io/g/slope'}, //old one: https://slope3d.net/game/slope/
    {name: 'Stickman Parkour', img: 'game-icons/stickman-parkour.png', url: 'https://dnrweqffuwjtx.cloudfront.net/games/2024/construct/219/stickman-parkour/index.html'},
    {name: 'Deathrun 3D', img: 'game-icons/deathrun3d.png', url: 'https://deathrun3d.github.io/file/'}
];

const gameList = document.getElementById('game-list');
const gameFrame = document.getElementById('game-frame');
const exitButton = document.getElementById('exit-game');

function closeGame() {
    gameFrame.src = ''; // Clear the iframe src to stop the game
    gameFrame.style.display = 'none'; // Hide the iframe
    exitButton.style.display = 'none'; // Hide the exit button
}

// Load games into the list
games.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.className = 'game-item';
    gameItem.innerHTML = `
        <img src="${game.img}" alt="${game.name}">
        <h3>${game.name}</h3>
    `;
    gameItem.addEventListener('click', () => {
        gameFrame.src = game.url; // Load game in iframe

        // Apply specific dimensions for "Deathrun 3D"
        if (game.name === 'Deathrun 3D') {
            gameFrame.style.width = '1000px';
            gameFrame.style.height = '700px';
        } else {
            gameFrame.style.width = '100%'; // Default width
            gameFrame.style.height = '600px'; // Default height
        }

        gameFrame.style.display = 'block'; // Show the iframe
        exitButton.style.display = 'block'; // Show the exit button
        document.getElementById('games').classList.add('active'); // Set "Games" tab active
    });
    gameList.appendChild(gameItem);
});

// Exit game button functionality
exitButton.addEventListener('click', () => {
    closeGame(); // Close the game
    document.getElementById('games').classList.add('active'); // Return to "Games" tab
});

// Handle tab visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        closeGame(); // Close the game if the user switches tabs
    }
});
