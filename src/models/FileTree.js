const fs = require('node:fs')
const path = require('node:path')

const SUPPORTED_FORMATS = ['.mp3', '.wav', '.ogg']

class FileTree {
    constructor(absolutePath) {
        this.content = fs
            // FIXME: sync to async
            .readdirSync(absolutePath, {
                withFileTypes: true 
            })
            .map(fsDirEntity => ({
                name: fsDirEntity.name,
                isDirectory: fsDirEntity.isDirectory(),
                isAudio: SUPPORTED_FORMATS.includes(path.extname(path.join(absolutePath, fsDirEntity.name))),
                absolutePath: path.join(absolutePath, fsDirEntity.name)
            }))
    }
}

module.exports = FileTree