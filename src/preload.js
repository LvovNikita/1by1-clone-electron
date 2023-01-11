const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', ({
    // get on client
    getSubFoldersOnClient: cb => ipcRenderer.on('sendSubFolders', cb),
    getAudioFilesOnClient: cb => ipcRenderer.on('sendAudioFiles', cb),

    // get from node
    getSubFolders: (parentFolderPath) => ipcRenderer.invoke('getSubFolders', parentFolderPath),
    getAudioFiles: (audioFilesFolderPath) => ipcRenderer.invoke('getAudioFiles', audioFilesFolderPath)
}))
