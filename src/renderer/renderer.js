// Display version information
const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// Test IPC ping function
const func = async () => {
    const response = await window.versions.ping();
    console.log(response);
}
func();

// Handle theme toggling
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle();
    const themeText = isDarkMode ? 'Dark' : 'Light';
    document.getElementById('theme-source').innerHTML = themeText;
    document.getElementById('status-theme').innerHTML = themeText;
    
    // Add/remove theme classes on body
    if (isDarkMode) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system();
    document.getElementById('theme-source').innerHTML = 'System';
    document.getElementById('status-theme').innerHTML = 'System';
    
    // Remove both theme classes to default to system
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('light-theme');
});

// Check system theme on load
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const updateThemeStatus = () => {
    const systemTheme = mediaQuery.matches ? 'Dark' : 'Light';
    console.log(`System theme is ${systemTheme}`);
};

// Listen for changes to color scheme
mediaQuery.addEventListener('change', updateThemeStatus);
// Check initial value
updateThemeStatus();