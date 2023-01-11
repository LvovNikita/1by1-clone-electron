const path = require('node:path')

class Folder {
    constructor(absolutePath) {
        this.path = absolutePath
        this.name = getFolderName(absolutePath)
    }
}

function getFolderName(absolutePath) {
    return absolutePath.slice(absolutePath.lastIndexOf(path.sep) + 1) 
}

module.exports = Folder