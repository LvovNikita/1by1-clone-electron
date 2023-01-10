const { app, ipcMain } = require('electron');

const createWindow = require('./electronUtils/createWindow')

const Bus = require('./features/bus/Bus')
const Folder = require('./features/fileBrowser/Folder')
const clientSideFolderAdapter = require('./features/fileBrowser/clientSideFolderAdapter')

app.on('ready', () => {
    const mainWindow = createWindow()
    const bus = new Bus()
    
    const { homeDirPath, rootFolderPath, mediaFolderPath } = bus
    const homeFolder = new Folder(homeDirPath)
    const rootFolder = new Folder(rootFolderPath)
    const mediaFolder = new Folder(mediaFolderPath)
    bus.rootFolders.push(homeFolder, rootFolder, mediaFolder)

    console.log(bus) // FIXME:

    mainWindow.on('ready-to-show', async () => {
        // SEND ROOT FOLDERS FROM APP TO CLIENT
        try {
            for (const rootFolder of bus.rootFolders) {
                await rootFolder.open()
                const clientSideRootFolder = clientSideFolderAdapter(rootFolder)
                bus.clientSideRootFolders.push(clientSideRootFolder)
            }
            mainWindow.webContents.send('sendRootFolders', bus.clientSideRootFolders)
        } catch (err) {
            console.log(err)
        }
    })

    // Event listeners
    ipcMain.handle('getSubFolders', (event, parentFolderPath) => {
        const folder = new Folder(parentFolderPath)
        console.log(folder)
        folder.open().then(folder => console.log(folder.dirListVisibleOnly))
    })

});



// ----- OS-specific fixes

require('./electronUtils/osFixes')
