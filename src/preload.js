const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getInitialFileTree: (callback) => ipcRenderer.on('getInitialFileTree', callback),
    getFolderContent: (absolutePath) => ipcRenderer.invoke('getFolderContent', absolutePath)
})