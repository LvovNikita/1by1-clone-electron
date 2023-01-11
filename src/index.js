const path = require('node:path')

const { app, ipcMain } = require('electron');

const createWindow = require('./electronUtils/createWindow')

const Bus = require('./features/bus/Bus')
const Folder = require('./features/fileBrowser/Folder')
const NodeFolder = require('./features/fileBrowser/NodeFolder')

app.on('ready', () => {
    const mainWindow = createWindow()
    const bus = new Bus()
    
    // FIXME: linux only
    const { homeDirPath, rootFolderPath, mediaFolderPath } = bus
    bus.rootFolders.push(
        new NodeFolder(homeDirPath), 
        new NodeFolder(rootFolderPath), 
        new NodeFolder(mediaFolderPath)
    )

    // console.log(bus)

    mainWindow.on('ready-to-show', async () => {
        // SEND ROOT FOLDERS FROM APP TO CLIENT
        try {
            for (const rootFolder of bus.rootFolders) {
                await rootFolder.open()
                const clientSideRootFolder = new Folder(rootFolder.path)
                bus.clientSideRootFolders.push(clientSideRootFolder)
            }
            mainWindow.webContents.send('sendRootFolders', bus.clientSideRootFolders)
        } catch (err) {
            console.log(err)
        }
    })

    // Event listeners
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
                mainWindow.webContents.send('sendExpandedFolderSubfolders', subfolders)
            })
    })

});



// ----- OS-specific fixes

require('./electronUtils/osFixes')
