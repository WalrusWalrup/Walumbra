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
    {name: 'Deathrun 3D', img: 'game-icons/deathrun3d.png', url: 'https://deathrun3d.github.io/file/'},
    {name: 'Just Fall', img: 'game-icons/just-fall.png', url: 'https://justfallunblocked.github.io/file'},
    {name: '1v1 LOL', img: 'game-icons/1v1lol.png', url: 'https://1v1lol-unblocked-game.github.io/'}, 
    {name: 'Stickman Hook', img: 'game-icons/stickman-hook.jpg', url: 'https://stickmanhookonline.github.io/file/'}, 
    {name: 'Minecraft', img: 'game-icons/minecraft.jpg', url: 'https://eaglercraftonline.github.io/go/minecraft-1.5.2/'}, // fix + blocked
    {name: 'Retarded Geometry Dash', img: 'game-icons/cursed-geometry-dash.png', url: 'https://geometrylite.github.io/'}, 
    {name: 'Happy Wheels', img: 'game-icons/happywheels.jpg', url: ' https://cbgamesdev.github.io/chilibowlflash/hw/index.html'}, 
    {name: 'Suika Game', img: 'game-icons/suika-game.png', url: 'https://suika-game.github.io/file/'}, //blocked
    {name: 'Hole.io', img: 'game-icons/hole-io.png', url: 'https://holeioonline.github.io/file/'}, 
    {name: 'FNAF', img: 'game-icons/fnaf.jpg', url: 'https://fnaf-game.github.io/five-nights-at-freddys/'}, 
    {name: 'FNAF 2', img: 'game-icons/fnaf2.png', url: 'https://cbgamesdev.github.io/chilibowlflash/FNAF/2/index.html'}, //blocked
    {name: 'FNAF 3', img: 'game-icons/fnaf3.png', url: 'https://biologyedu1808.github.io/g7/five-nights-at-freddys-3/'}, 
    {name: 'FNAF 4', img: 'game-icons/fnaf4.png', url: 'https://fnaf-4.github.io/games/FNAF4/index.html'}, 
    {name: 'Retarded Slither.io', img: 'game-icons/slither-io.png', url: 'https://classroom247.pages.dev/slit/'}, // blocked
    {name: 'Cookie Clicker', img: 'game-icons/cookie-clicker.png', url: 'https://cookieclickerunblocked.github.io/games/cookie-clicker/index.html'}, // blocked
    {name: 'Smash Karts', img: 'game-icons/smash-karts.jpg', url: 'https://webgltest-17af1.firebaseapp.com/'}, 
    {name: 'Among Us', img: 'game-icons/amongus.jpg', url: 'https://burgerbounty.github.io/s/among-us/'}, // blocked
    {name: 'Drift Boss', img: 'game-icons/drift-boss.jpg', url: 'https://driftbossonline.github.io/file/'}, // blocked
    {name: 'Drive Mad', img: 'game-icons/drive-mad.png', url: 'https://drivemadonline.github.io/file/ '}, //
    {name: 'Moto X3M', img: 'game-icons/motox3m.png', url: 'https://moto-x3m-online.github.io/file/'}, 
    {name: 'Moto X3M Spooky Land', img: 'game-icons/motox3m-spooky-land.jpg', url: 'https://motox3monline.github.io/g/moto-x3m-spooky-land/'}, // blocked
    {name: 'Moto X3M Pool Party', img: 'game-icons/motox3m-pool-party.jpeg', url: 'https://motox3monline.github.io/g/moto-x3m-pool-party/'}, // blocked
    {name: 'Grim Donut', img: 'game-icons/grimdonut.png', url: 'https://www.pinkbike.com/sandbox/grimdonutgame/ '} //blocked
];

const gameList = document.getElementById('game-list');
const gameFrame = document.getElementById('game-frame');
const exitButton = document.getElementById('exit-game');
const fullscreenButton = document.getElementById('fullscreen-button');

// Toggle button visibility based on game state
function updateButtonVisibility(showGame) {
    if (showGame) {
        exitButton.style.display = 'block'; // Show the exit button
        fullscreenButton.style.display = 'block'; // Show the fullscreen button
    } else {
        exitButton.style.display = 'none'; // Hide the exit button
        fullscreenButton.style.display = 'none'; // Hide the fullscreen button
    }
}

// Fullscreen toggle function
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        gameFrame.requestFullscreen().catch(err => console.error("Failed to enter fullscreen mode:", err));
    } else {
        document.exitFullscreen().catch(err => console.error("Failed to exit fullscreen mode:", err));
    }
}

// Close game function
function closeGame() {
    gameFrame.src = ''; // Clear the iframe src to stop the game
    gameFrame.style.display = 'none'; // Hide the iframe
    updateButtonVisibility(false); // Hide buttons
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
        gameFrame.src = game.url;
        gameFrame.style.display = 'block'; // Show the iframe
        updateButtonVisibility(true); // Show buttons
    });
    gameList.appendChild(gameItem);
});

// Add event listeners to buttons
exitButton.addEventListener('click', closeGame);
fullscreenButton.addEventListener('click', toggleFullScreen);
