const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getFileTree: (callback) => ipcRenderer.on('getFileTree', callback),
    getFolderContent: () => ipcRenderer.invoke('getFolderContent')
})