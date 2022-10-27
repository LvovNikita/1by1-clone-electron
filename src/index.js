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
    mainWindow.webContents.openDevTools(); // FIXME: for testing only
    
    mainWindow.on('ready-to-show', () => {
        // Send file tree data to render initial tree
        const initalFileTree = new FileTree(os.homedir())
        mainWindow.webContents.send('getInitialFileTree', initalFileTree.content) // obj {name, absolutePath, isDirectory, isAudio}
    })
};


app.on('ready', () => {
    createWindow()

    // event listeners:
    ipcMain.handle('getFolderContent', (event, absolutePath) => {
        const fileTree = new FileTree(absolutePath)
        return fileTree.content // obj {name, absolutePath, isDirectory, isAudio}
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