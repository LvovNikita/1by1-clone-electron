const { app } = require('electron');

// macOS
const onWindowAllClosed = () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}

// OS X
const onActivate = () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
}

app.on('window-all-closed', onWindowAllClosed);
app.on('activate', onActivate);

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) { app.quit() }