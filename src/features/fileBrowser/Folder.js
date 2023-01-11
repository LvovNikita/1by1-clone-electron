class Folder {
    constructor(absolutePath) {
        this.path = absolutePath
        this.name = Folder.extractFolderName(absolutePath) || '/'
    }
    static extractFolderName(absolutePath) {
        const hasForwardSlash = absolutePath.lastIndexOf('/') > -1
        const separator = hasForwardSlash ? '/' : '\\'
        return absolutePath.slice(absolutePath.lastIndexOf(separator) + 1) 
    }
}

module.exports = Folder