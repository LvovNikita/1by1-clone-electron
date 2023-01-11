const fs = require('node:fs/promises')
const path = require('node:path')

const Folder = require('./Folder.js')

class NodeFolder extends Folder {
    constructor(absolutePath) {
        super(absolutePath)
        this.isOpen = false
        this.dirEntities = []       // Dirent[]
        this.SUPPORTED_AUDIO_FORMATS = ['.mp3', '.wav', '.ogg']
    }

    async open() {
        this.dirEntities = await fs.readdir(this.path, { withFileTypes: true })
        this.isOpen = true
        return this
    }

    get fileList() {
        if (!this.isOpen) throw new Error('Can\'t get file list because folder is not open')
        return this.dirEntities.filter(dirEnt => dirEnt.isFile())
    }
    get dirList() {
        if (!this.isOpen) throw new Error('Can\'t get subdirectories list because folder is not open')
        return this.dirEntities.filter(dirEnt => dirEnt.isDirectory())
    }

    get dirListVisibleOnly() {
        return this.dirList.filter(dirEnt => dirEnt.name[0] !== '.')
    }
    get audioFileList() {
        const isAudioFile = dirEnt => {
            const fileAbsolutePath = path.join(this.path, dirEnt.name)
            const { ext } = path.parse(fileAbsolutePath)
            return this.SUPPORTED_AUDIO_FORMATS.includes(ext.toLowerCase())
        }
        return this.fileList.filter(isAudioFile)
    }

    get fileNamesList() {
        return this.fileList.map(dirEnt => dirEnt.name)
    }
    get dirNamesList() {
        return this.dirList.map(dirEnt => dirEnt.name)
    }
    get dirNamesVisibleOnlyList() {
        return this.dirListVisibleOnly.map(dirEnt => dirEnt.name)
    }
    get audioFileNamesList() {
        return this.audioFileList.map(dirEnt => dirEnt.name)
    }
}

module.exports = NodeFolder

