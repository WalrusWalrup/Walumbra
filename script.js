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

// Update tab name
document.getElementById('update-tab-name').addEventListener('click', () => {
    const newName = document.getElementById('tab-name').value.trim();
    if (newName) {
        document.title = newName; // Update tab name
    }
});

// Apply selected theme
document.getElementById('apply-theme').addEventListener('click', () => {
    const selectedTheme = document.getElementById('theme-select').value;
    document.body.className = selectedTheme; // Update the body class to apply the selected theme
});
