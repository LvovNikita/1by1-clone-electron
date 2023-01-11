const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', ({
    // get on client
    getRootFolders: cb => ipcRenderer.on('sendRootFolders', cb),
    getExpandedFolderSubFolders: cb => ipcRenderer.on('sendExpandedFolderSubfolders', cb),

    // get from node
    getSubFolders: (parentFolderPath) => ipcRenderer.invoke('getSubFolders', parentFolderPath)
}))

// ipcRenderer.on(channel: string, listener: Function)
// Listens to channel, when a new message arrives listener would be called with listener(event, args...)
