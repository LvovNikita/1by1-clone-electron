const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getInitialDirTree: (callback) => ipcRenderer.on('getInitialDirTree', callback),
    getFolderContent: (absolutePath) => ipcRenderer.invoke('getFolderContent', absolutePath)
})