const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        // Set background color based on theme to avoid white flash during load
        backgroundColor: nativeTheme.shouldUseDarkColors ? '#0d1117' : '#ffffff',
        // Optional: Make window modern and clean looking
        // autoHideMenuBar: true, // Hide menu bar by default
        // Optional: If you want to remove the window frame
        // frame: false, // Uncomment to make frameless
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
};

// Handle dark mode toggle
ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light';
    } else {
        nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
});

// Handle system theme reset
ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcMain.handle('ping', () => 'pong');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});