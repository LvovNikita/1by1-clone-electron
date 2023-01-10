const Folder = require('./Folder')

function clientSideFolderAdapter (folderClassInstance) {
    return { 
        path: folderClassInstance.path, 
        name: folderClassInstance.name, 
    }
}

module.exports = clientSideFolderAdapter