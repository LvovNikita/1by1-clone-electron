const path = require('node:path')

const { app, ipcMain } = require('electron');

const createWindow = require('./electronUtils/createWindow')

const Bus = require('./features/bus/Bus')
const Folder = require('./features/fileBrowser/Folder')
const NodeFolder = require('./features/fileBrowser/NodeFolder')
const File = require('./features/fileBrowser/File')

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

    // SEND ROOT FOLDERS FROM APP TO CLIENT
    mainWindow.on('ready-to-show', async () => {
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
    // TODO: decompose

    // RESPOND TO SUBFOLDERS REQUEST ON EXPAND BUTTON CLICK
    ipcMain.handle('getSubFolders', async (event, parentFolderPath) => {
        const subFolders = []
        const folder = new NodeFolder(parentFolderPath)
        try {
            await folder.open()
            for (const subfolder of folder.dirListVisibleOnly) {
                const subfolderPath = path.join(parentFolderPath, subfolder.name)
                subFolders.push(new Folder(subfolderPath))
            }
            mainWindow.webContents.send('sendSubFolders', subFolders)
        } catch (err) {
            console.log(err)
        }
    })

    // TODO: идентичные функции!
    // RESPOND TO AUDIOFILES REQUEST ON FOLDER SELECTION
    ipcMain.handle('getAudioFiles', async (event, audioFilesFolderPath) => {
        const audioFiles = []
        const folder = new NodeFolder(audioFilesFolderPath)
        try {
            await folder.open()
            for (const audioFile of folder.audioFileList) {
                const audioFilePath = path.join(audioFilesFolderPath, audioFile.name)
                audioFiles.push(new File(audioFilePath))
            }
            mainWindow.webContents.send('sendAudioFiles', audioFiles)
        } catch (err) {
            console.log(err)
        }
    })
});

require('./electronUtils/osFixes')
