const path = require('node:path')

const { app, ipcMain } = require('electron');

const createWindow = require('./electronUtils/createWindow')

const Bus = require('./features/bus/Bus')
const Folder = require('./features/fileBrowser/Folder')
const NodeFolder = require('./features/fileBrowser/NodeFolder')

app.on('ready', () => {
    const mainWindow = createWindow()
    const bus = new Bus()
    
    const { homeDirPath, rootFolderPath, mediaFolderPath } = bus
    bus.rootFolders.push(new NodeFolder(homeDirPath))

    if (rootFolderPath) {
        bus.rootFolders.push(new NodeFolder(rootFolderPath))
    } 
    if (mediaFolderPath) { 
        bus.rootFolders.push(new NodeFolder(mediaFolderPath))
    }

    mainWindow.on('ready-to-show', async () => {
        // SEND ROOT FOLDERS FROM APP TO CLIENT
        try {
            for (const rootFolder of bus.rootFolders) {
                await rootFolder.open()
                const clientSideRootFolder = new Folder(rootFolder.path)
                bus.clientSideRootFolders.push(clientSideRootFolder)
            }
            mainWindow.webContents.send('sendSubFolders', bus.clientSideRootFolders)
        } catch (err) {
            console.log(err)
        }
    })

    // Event listeners
    // RESPOND TO SUBFOLDERS REQUEST ON EXPAND BUTTON CLICK
    ipcMain.handle('getSubFolders', (event, parentFolderPath) => {
        const subfolders = []
        const folder = new NodeFolder(parentFolderPath)
        folder
            .open()
            .then(folder => {
                for (const subfolder of folder.dirListVisibleOnly) {
                    const subfolderPath = path.join(parentFolderPath, subfolder.name)
                    subfolders.push(new Folder(subfolderPath))
                }
                mainWindow.webContents.send('sendSubFolders', subfolders)
            })
    })
});

require('./electronUtils/osFixes')
