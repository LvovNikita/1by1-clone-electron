const os = require('node:os')
const path = require('node:path')

const { app, BrowserWindow, ipcMain } = require('electron');

const FileTree = require('./models/FileTree')


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.webContents.openDevTools();
    
    mainWindow.on('ready-to-show', () => {
        // Send file tree data to render initial tree
        mainWindow.webContents.send('getFileTree', new FileTree(os.homedir()).content)
    })
};


app.on('ready', () => {
    createWindow()

    // event listeners:
    ipcMain.handle('getFolderContent', (event, absolutePath) => {
        const fileTree = new FileTree(absolutePath)
        return fileTree.content
    })
});


// ----- OS-specific fixes

app.on('window-all-closed', () => {
    // Quit when all windows are closed, except on macOS
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('activate', () => {
    // OS X fix
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
    app.quit();
}