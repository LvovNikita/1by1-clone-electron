const path = require('node:path')

const { BrowserWindow } = require('electron')

module.exports = function() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
    // FIXME: for testing only
    mainWindow.webContents.openDevTools(); 
    
    return mainWindow
}